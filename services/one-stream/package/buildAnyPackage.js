const _ = require("lodash");
import AWS from "aws-sdk";
import { DateTime } from "luxon";

import { dynamoConfig, Workflow } from "cmscommonlib";

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

const emptyField = "-- --";

export const buildAnyPackage = async (packageId, config) => {
  console.log("Building package: ", packageId);
  const queryParams = {
    TableName: oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": packageId,
    },
  };
  console.log("%s the new query params are: ", packageId, queryParams);

  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("%s query result: ", packageId, result);
    if (result?.Items.length <= 0) {
      console.log("%s did not have Items?", packageId);
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
        raiResponses: [],
        waiverExtensions: [],
        withdrawalRequests: [],
        currentStatus: emptyField,
        submissionTimestamp: 0,
        submitterName: emptyField,
        submitterEmail: emptyField,
        subject: emptyField,
        description: emptyField,
        cpocName: emptyField,
        reviewTeam: [],
        adminChanges: [],
      },
    };
    let currentPackage;
    let showPackageOnDashboard = false;
    let lmTimestamp = 0;
    let adminChanges = [];

    result.Items.forEach((anEvent) => {
      // we ignore all other v's (for now)
      if (anEvent.sk.substring(0, 1) === "v") {
        console.log("ignoring: ", anEvent.sk);
        return;
      }

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
      const timestamp = Number(timestring);

      if (source === "OneMAC") {
        if (anEvent?.currentStatus === Workflow.ONEMAC_STATUS.INACTIVATED)
          return;
        showPackageOnDashboard = true;

        // admin changes are consolidated across all OneMAC events
        if (anEvent?.adminChanges && _.isArray(anEvent.adminChanges))
          adminChanges = [...anEvent.adminChanges, ...adminChanges];
      }

      if (timestamp > lmTimestamp) {
        lmTimestamp = timestamp;
      }

      // collect ALL rai events in one array (parsed later)
      if (
        anEvent.componentType === `${config.componentType}rai` ||
        anEvent.componentType === `waiverrai` ||
        anEvent.componentType === `rairesponsewithdraw`
      ) {
        putParams.Item.raiResponses.push({
          submissionTimestamp: anEvent.submissionTimestamp,
          attachments: anEvent.attachments,
          additionalInformation: anEvent.additionalInformation,
          currentStatus: anEvent.currentStatus,
        });
        if (anEvent.componentType === `rairesponsewithdraw`)
          putParams.Item.currentStatus =
            Workflow.ONEMAC_STATUS.WITHDRAW_RAI_REQUESTED;
        else putParams.Item.currentStatus = Workflow.ONEMAC_STATUS.SUBMITTED;

        return;
      }

      // include ALL package withdraw request events in package details
      if (anEvent.componentType === `${config.componentType}withdraw`) {
        putParams.Item.withdrawalRequests.push({
          submissionTimestamp: anEvent.submissionTimestamp,
          attachments: anEvent.attachments,
          additionalInformation: anEvent.additionalInformation,
          currentStatus: anEvent.currentStatus,
        });
        putParams.Item.currentStatus =
          Workflow.ONEMAC_STATUS.WITHDRAWAL_REQUESTED;

        return;
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
        console.log(
          "%s SEATool event has timestamp %d and status %s, lmTimestamp is: %d",
          anEvent.pk,
          timestamp,
          JSON.stringify(anEvent.SPW_STATUS, null, 2),
          lmTimestamp
        );

        //always use seatool data to overwrite -- this will have to change if edit in onemac is allowed
        if (
          anEvent.STATE_PLAN.PROPOSED_DATE &&
          typeof anEvent.STATE_PLAN.PROPOSED_DATE === "number"
        )
          putParams.Item.proposedEffectiveDate = DateTime.fromMillis(
            anEvent.STATE_PLAN.PROPOSED_DATE
          ).toFormat("yyyy-LL-dd");
        else putParams.Item.proposedEffectiveDate = "none";

        putParams.Item.subject = anEvent.STATE_PLAN.TITLE_NAME;
        putParams.Item.description = anEvent.STATE_PLAN.SUMMARY_MEMO;

        if (anEvent.LEAD_ANALYST && _.isArray(anEvent.LEAD_ANALYST)) {
          const leadAnalyst = anEvent.LEAD_ANALYST.map((oneAnalyst) =>
            anEvent.STATE_PLAN.LEAD_ANALYST_ID === oneAnalyst.OFFICER_ID
              ? oneAnalyst
              : null
          ).filter(Boolean)[0];
          console.log("the lead analsyt is: ", leadAnalyst);

          if (leadAnalyst)
            putParams.Item.cpocName = `${leadAnalyst.FIRST_NAME} ${leadAnalyst.LAST_NAME}`;
        }

        if (anEvent.ACTION_OFFICERS && _.isArray(anEvent.ACTION_OFFICERS)) {
          putParams.Item.reviewTeam = anEvent.ACTION_OFFICERS.map(
            (oneReviewer) =>
              `${oneReviewer.FIRST_NAME} ${oneReviewer.LAST_NAME}`
          );
          console.log("the review team is: ", putParams.Item.reviewTeam);
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
        if (typeof approvedEffectiveDate === "number") {
          putParams.Item.approvedEffectiveDate = DateTime.fromMillis(
            approvedEffectiveDate
          ).toFormat("yyyy-LL-dd");
        }

        if (timestamp < lmTimestamp) return;

        const seaToolStatus = anEvent?.SPW_STATUS.map((oneStatus) =>
          anEvent.STATE_PLAN.SPW_STATUS_ID === oneStatus.SPW_STATUS_ID
            ? oneStatus.SPW_STATUS_DESC
            : null
        ).filter(Boolean)[0];
        console.log(
          "%s seaToolStatus %d resolves to: ",
          anEvent.pk,
          anEvent.STATE_PLAN.SPW_STATUS_ID,
          seaToolStatus
        );
        if (seaToolStatus && SEATOOL_TO_ONEMAC_STATUS[seaToolStatus]) {
          const oneMacStatus = SEATOOL_TO_ONEMAC_STATUS[seaToolStatus];
          putParams.Item.currentStatus = oneMacStatus;
          console.log("onemac status is: ", oneMacStatus);
          console.log(
            "onemac status date is: ",
            anEvent.STATE_PLAN.STATUS_DATE
          );
          console.log(
            "onemac status is final:",
            finalDispositionStatuses.includes(oneMacStatus)
          );
          if (finalDispositionStatuses.includes(oneMacStatus)) {
            putParams.Item.finalDispositionDate = DateTime.fromMillis(
              anEvent.STATE_PLAN.STATUS_DATE
            ).toFormat("yyyy-LL-dd");
          }
        }
      }

      // assume OneMAC event if got here
      config.theAttributes.forEach((attributeName) => {
        if (anEvent[attributeName]) {
          if (attributeName === "parentId") {
            // having a parent adds the GSI2pk index
            putParams.Item.GSI2pk = anEvent.parentId;
            putParams.Item.GSI2sk = anEvent.componentType;
          }

          // update the attribute if this is the latest event
          if (timestamp === lmTimestamp)
            putParams.Item[attributeName] = anEvent[attributeName];
        }
      });
    });

    //if any attribute was not yet populated from current event; then populate from currentPackage
    if (currentPackage) {
      config.theAttributes.forEach((attributeName) => {
        if (!putParams.Item[attributeName] && currentPackage[attributeName]) {
          putParams.Item[attributeName] = currentPackage[attributeName];
        }
      });
    }

    // use GSI1 to show package on dashboard
    if (showPackageOnDashboard) {
      putParams.Item.GSI1pk = `OneMAC#${config.whichTab}`;
      putParams.Item.GSI1sk = packageId;
    } else {
      console.log("%s is not a OneMAC package: ", packageId, putParams.Item);
    }

    putParams.Item.raiResponses.sort(
      (a, b) => b.submissionTimestamp - a.submissionTimestamp
    );

    if (putParams.Item.raiResponses[0]?.currentStatus === "Submitted") {
      putParams.Item.latestRaiResponseTimestamp =
        putParams.Item.raiResponses[0]?.submissionTimestamp;
    }

    adminChanges.sort((a, b) => b.changeTimestamp - a.changeTimestamp);
    let lastTime = 0;
    adminChanges.forEach((oneChange) => {
      if (oneChange.changeTimestamp != lastTime) {
        lastTime = oneChange.changeTimestamp;
        putParams.Item.adminChanges.push(oneChange);
      }
    });

    console.log("%s currentPackage: ", packageId, currentPackage);
    console.log("%s newItem: ", packageId, putParams.Item);
    console.log(
      "%s evaluates to: ",
      packageId,
      _.isEqual(currentPackage, putParams.Item)
    );
    if (_.isEqual(currentPackage, putParams.Item)) return;

    putParams.Item.lastEventTimestamp = lmTimestamp;
    console.log("%s just before put: ", packageId, putParams);
    await dynamoDb.put(putParams).promise();
  } catch (e) {
    console.log("%s buildAnyPackage error: ", packageId, e);
  }
  console.log("%s the end of things", packageId);
};
