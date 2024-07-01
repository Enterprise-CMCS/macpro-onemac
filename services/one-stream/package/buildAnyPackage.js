const _ = require("lodash");
import AWS from "aws-sdk";
import { DateTime } from "luxon";
import { dynamoConfig, Workflow } from "cmscommonlib";
import { ONEMAC_STATUS } from "cmscommonlib/workflow";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const SEATOOL_TO_ONEMAC_STATUS = {
  [Workflow.SEATOOL_STATUS.PENDING]: Workflow.ONEMAC_STATUS.PENDING,
  [Workflow.SEATOOL_STATUS.PENDING_RAI]: Workflow.ONEMAC_STATUS.RAI_ISSUED,
  [Workflow.SEATOOL_STATUS.APPROVED]: Workflow.ONEMAC_STATUS.APPROVED,
  [Workflow.SEATOOL_STATUS.DISAPPROVED]: Workflow.ONEMAC_STATUS.DISAPPROVED,
  [Workflow.SEATOOL_STATUS.WITHDRAWN]: Workflow.ONEMAC_STATUS.WITHDRAWN,
  [Workflow.SEATOOL_STATUS.TERMINATED]: Workflow.ONEMAC_STATUS.TERMINATED,
  [Workflow.SEATOOL_STATUS.PENDING_CONCURRENCE]:
    Workflow.ONEMAC_STATUS.PENDING_CONCURRENCE,
  [Workflow.SEATOOL_STATUS.PENDING_APPROVAL]:
    Workflow.ONEMAC_STATUS.PENDING_APPROVAL,
  [Workflow.SEATOOL_STATUS.UNKNOWN]: Workflow.ONEMAC_STATUS.SUBMITTED,
};
const finalDispositionStatuses = [
  Workflow.ONEMAC_STATUS.APPROVED,
  Workflow.ONEMAC_STATUS.DISAPPROVED,
  Workflow.ONEMAC_STATUS.WITHDRAWN,
];
const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

let logPackageId = "no id";

export const emptyField = "-- --";

export const logIt = (logMessage) => {
  if (process.env.IS_OFFLINE || process.env.debugOn) {
    console.log(logPackageId + ": " + logMessage);
  }
};

export const buildAnyPackage = async (packageId, config) => {
  logPackageId = packageId;
  logIt(`being built`);
  const queryParams = {
    TableName: oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": packageId,
    },
  };

  try {
    const result = await dynamoDb.query(queryParams).promise();
    if (result?.Items.length <= 0) {
      console.log("%s did not have Items.", packageId);
      return;
    }
    const packageSk = `Package`;
    const putParams = {
      TableName: oneMacTableName,
      Item: {
        pk: packageId,
        sk: packageSk,
        componentId: packageId,
        componentType: config.componentType,
        reverseChrono: [],
        currentStatus: emptyField,
        submissionTimestamp: 0,
        submitterName: emptyField,
        submitterEmail: emptyField,
        subject: emptyField,
        description: emptyField,
        cpocName: emptyField,
        reviewTeam: [],
        reviewTeamEmailList: [],
        adminChanges: [],
        lastActivityTimestamp: 0,
      },
    };
    let currentPackage;
    let showPackageOnDashboard = false;
    let lmTimestamp = 0;
    let adminChanges = [];

    result.Items.forEach((anEvent) => {
      // we ignore all other v's and Email records
      if (anEvent.sk.substring(0, 1) === "v" || anEvent.sk === "Email") {
        console.log("ignoring: ", anEvent.sk);
        return;
      }
      console.log("this event: ", anEvent.GSI1pk);
      console.log(
        "status of event: %s currentstatus of package: %s eventTimestamp: %s",
        anEvent.currentStatus,
        putParams.Item.currentStatus,
        anEvent.eventTimestamp
      );

      // save the old package record for comparison
      if (anEvent.sk === packageSk) {
        if (!currentPackage) {
          if (anEvent?.lastEventTimestamp) delete anEvent.lastEventTimestamp;
          currentPackage = anEvent;
        } else
          console.log(
            "%s ERROR: There should be ONLY ONE!",
            anEvent.pk,
            anEvent
          );
        return;
      }

      // all updates after this influence lmtimestamp
      const [source, timestring] = anEvent.sk.split("#");
      const timestamp = anEvent?.eventTimestamp
        ? anEvent.eventTimestamp
        : Number(timestring);
      let eventConfig = {};

      if (source === "OneMAC") {
        if (anEvent?.currentStatus === Workflow.ONEMAC_STATUS.INACTIVATED)
          return;
        showPackageOnDashboard = true;

        // the normalized eventLabel is the GSI1pk without the source and componentType
        // but waiver rai should only remove waiver part
        const eventLabel = anEvent.GSI1pk.replace("OneMAC#", "")
          .replace(config.componentType, "")
          .replace("waiver", "");
        eventConfig = config.eventMap[eventLabel];
        console.log("EventConfig: ", eventConfig);

        // because if we change what status the withdrawal request event stores
        // we'd have to do a migration... but might want to later
        if (
          eventLabel === "submitwithdraw" &&
          anEvent.currentStatus === ONEMAC_STATUS.SUBMITTED
        )
          anEvent.currentStatus = ONEMAC_STATUS.WITHDRAWAL_REQUESTED;

        eventConfig &&
          eventConfig.type &&
          putParams.Item.reverseChrono.push({
            type: eventConfig.type,
            action: eventConfig?.action || "Submitted",
            currentStatus: anEvent.currentStatus,
            timestamp: anEvent.submissionTimestamp,
            eventTimestamp: anEvent.eventTimestamp,
            attachments: anEvent.attachments ? [...anEvent.attachments] : [],
            additionalInformation: anEvent.additionalInformation,
          });

        // if the RAI response is the newest so far, add the latest RAI response timestamp
        // if the status is "Submitted" and delete the attribute if not
        if (
          eventLabel === "submitrai" &&
          (!putParams.Item?.latestRaiResponseTimestamp ||
            putParams.Item.latestRaiResponseTimestamp <
              anEvent.submissionTimestamp)
        ) {
          putParams.Item.latestRaiResponseTimestamp =
            anEvent.submissionTimestamp;
        }

        if (eventLabel === "submitrairesponsewithdraw")
          delete putParams.Item.latestRaiResponseTimestamp;

        if (anEvent?.componentType)
          if (anEvent?.adminChanges && _.isArray(anEvent.adminChanges))
            // admin changes are consolidated across all OneMAC events
            adminChanges = [...anEvent.adminChanges, ...adminChanges];
      }

      if (timestamp > lmTimestamp) {
        lmTimestamp = timestamp;
      }

      // SEATool "events" are actually a complete representation of the package state,
      // so if the SEATool record's CHANGED_DATE is newest, it doesn't matter if the
      // status date is older...
      if (source === "SEATool") {
        if (!anEvent.SPW_STATUS) {
          console.log(
            "%s SEATool event has bad status details... ",
            anEvent.pk,
            anEvent
          );
          return;
        }

        //always use seatool data to overwrite -- this will have to change if edit in onemac is allowed
        if (
          anEvent.STATE_PLAN.PROPOSED_DATE &&
          typeof anEvent.STATE_PLAN.PROPOSED_DATE === "number"
        )
          putParams.Item.proposedEffectiveDate = DateTime.fromMillis(
            anEvent.STATE_PLAN.PROPOSED_DATE
          ).toFormat("yyyy-LL-dd");
        else putParams.Item.proposedEffectiveDate = emptyField;

        putParams.Item.subject = anEvent.STATE_PLAN.TITLE_NAME;
        putParams.Item.description = anEvent.STATE_PLAN.SUMMARY_MEMO;

        if (anEvent.LEAD_ANALYST && _.isArray(anEvent.LEAD_ANALYST)) {
          const leadAnalyst = anEvent.LEAD_ANALYST.map((oneAnalyst) =>
            anEvent.STATE_PLAN.LEAD_ANALYST_ID === oneAnalyst.OFFICER_ID
              ? oneAnalyst
              : null
          ).filter(Boolean)[0];

          if (leadAnalyst) {
            putParams.Item.cpocName = `${leadAnalyst.FIRST_NAME} ${leadAnalyst.LAST_NAME}`;
            putParams.Item.cpocEmail = `"${leadAnalyst.LAST_NAME}, ${leadAnalyst.FIRST_NAME} (CPOC)" <${leadAnalyst.EMAIL}>`;
          }
        }

        if (anEvent.ACTION_OFFICERS && _.isArray(anEvent.ACTION_OFFICERS)) {
          putParams.Item.reviewTeam = [];
          putParams.Item.reviewTeamEmailList = [];
          anEvent.ACTION_OFFICERS.forEach((oneReviewer) => {
            putParams.Item.reviewTeam.push(
              `${oneReviewer.FIRST_NAME} ${oneReviewer.LAST_NAME}`
            );
            if (oneReviewer.EMAIL)
              putParams.Item.reviewTeamEmailList.push(
                `"${oneReviewer.LAST_NAME}, ${oneReviewer.FIRST_NAME} (SRT)" <${oneReviewer.EMAIL}>`
              );
          });
        }

        let approvedEffectiveDate = emptyField;
        if (
          anEvent.STATE_PLAN.APPROVED_EFFECTIVE_DATE &&
          typeof anEvent.STATE_PLAN.APPROVED_EFFECTIVE_DATE === "number"
        ) {
          approvedEffectiveDate = anEvent.STATE_PLAN.APPROVED_EFFECTIVE_DATE;
        } else if (
          anEvent.STATE_PLAN.ACTUAL_EFFECTIVE_DATE &&
          typeof anEvent.STATE_PLAN.ACTUAL_EFFECTIVE_DATE === "number"
        ) {
          approvedEffectiveDate = anEvent.STATE_PLAN.ACTUAL_EFFECTIVE_DATE;
        }

        putParams.Item.approvedEffectiveDate =
          typeof approvedEffectiveDate === "number"
            ? DateTime.fromMillis(approvedEffectiveDate).toFormat("yyyy-LL-dd")
            : emptyField;

        if (timestamp < lmTimestamp) return;

        const seaToolStatus = anEvent?.SPW_STATUS.map((oneStatus) =>
          anEvent.STATE_PLAN.SPW_STATUS_ID === oneStatus.SPW_STATUS_ID
            ? oneStatus.SPW_STATUS_DESC
            : null
        ).filter(Boolean)[0];

        if (seaToolStatus && SEATOOL_TO_ONEMAC_STATUS[seaToolStatus]) {
          const oneMacStatus = SEATOOL_TO_ONEMAC_STATUS[seaToolStatus];
          putParams.Item.currentStatus = oneMacStatus;
          putParams.Item.finalDispositionDate =
            finalDispositionStatuses.includes(oneMacStatus)
              ? DateTime.fromMillis(anEvent.STATE_PLAN.STATUS_DATE).toFormat(
                  "yyyy-LL-dd"
                )
              : emptyField;
        }
      }

      eventConfig &&
        eventConfig.packageAttributes &&
        eventConfig.packageAttributes.forEach((attributeName) => {
          if (anEvent[attributeName]) {
            if (attributeName === "parentId") {
              // having a parent adds the GSI2pk index
              putParams.Item.GSI2pk = anEvent.parentId;
              putParams.Item.GSI2sk = anEvent.componentType;
            }

            // for rai withdraw enabled, use status from package
            if (
              anEvent[attributeName] === "currentStatus" &&
              anEvent.currentStatus === ONEMAC_STATUS.WITHDRAW_RAI_ENABLED
            ) {
              anEvent.currentStatus = currentPackage["currentStatus"];
            }

            // update the attribute if this is the latest event
            // if the latest event does not have a value but the currentPackage does
            // use the currentPackage value
            if (timestamp === lmTimestamp)
              if (anEvent[attributeName]) {
                putParams.Item[attributeName] = anEvent[attributeName];
              } else if (currentPackage[attributeName]) {
                putParams.Item[attributeName] = currentPackage[attributeName];
              }
          }
        });
    });

    // use GSI1 to show package on OneMAC dashboard
    if (showPackageOnDashboard) {
      putParams.Item.GSI1pk = `OneMAC#${config.whichTab}`;
      putParams.Item.GSI1sk = packageId;
    }

    if (putParams.Item.currentStatus === ONEMAC_STATUS.RAI_ISSUED)
      delete putParams.Item.latestRaiResponseTimestamp;

    putParams.Item?.reverseChrono.sort((a, b) => b.timestamp - a.timestamp);

    // If the most recent OneMAC event is an enable withdraw RAI Response,
    // then set sub status to "Withdraw RAI Enabled"
    // and freeze status to pending
    if (
      Array.isArray(putParams.Item?.reverseChrono) &&
      putParams.Item.reverseChrono.length > 0
    ) {
      // Find the first event that is not "Subsequent Documentation Uploaded"
      const qualifyingEvent = putParams.Item.reverseChrono.find(
        (event) => event.type !== "Subsequent Documentation Uploaded"
      );

      // Check if the found event qualifies for WITHDRAW_RAI_ENABLED
      if (
        qualifyingEvent &&
        qualifyingEvent.currentStatus === ONEMAC_STATUS.WITHDRAW_RAI_ENABLED
      ) {
        putParams.Item.currentStatus = ONEMAC_STATUS.PENDING;
        putParams.Item.subStatus = ONEMAC_STATUS.WITHDRAW_RAI_ENABLED;
      } else {
        console.log("setting sub status to null");
        putParams.Item.subStatus = null;
        delete putParams.Item.subStatus;
      }
    }

    adminChanges.sort((a, b) => b.changeTimestamp - a.changeTimestamp);
    // remove duplicate messages for adminChanges that affect more than one event
    let lastTime = 0;
    adminChanges.forEach((oneChange) => {
      if (oneChange.changeTimestamp != lastTime) {
        lastTime = oneChange.changeTimestamp;
        putParams.Item.adminChanges.push(oneChange);
      }
    });

    putParams.Item.lastEventTimestamp = lmTimestamp;
    logIt(JSON.stringify(putParams));
    await dynamoDb.put(putParams).promise();
  } catch (e) {
    console.log("%s buildAnyPackage error: ", packageId, e);
  }
};
