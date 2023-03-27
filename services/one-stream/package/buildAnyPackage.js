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
const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

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
        currentStatus: "-- --", // include for ophans
        submissionTimestamp: 0,
        submitterName: "-- --",
        submitterEmail: "-- --",
      },
    };
    let currentPackage;
    let showPackageOnDashboard = false;
    let lmTimestamp = 0;

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
      }

      if (timestamp > lmTimestamp) {
        lmTimestamp = timestamp;
      }

      // include ALL rai events in package details
      if (
        anEvent.componentType === `${config.componentType}rai` ||
        anEvent.componentType === `waiverrai`
      ) {
        putParams.Item.raiResponses.push({
          submissionTimestamp: anEvent.submissionTimestamp,
          attachments: anEvent.attachments,
          additionalInformation: anEvent.additionalInformation,
        });
        putParams.Item.currentStatus = Workflow.ONEMAC_STATUS.SUBMITTED;
        putParams.Item.latestRaiResponse = Math.max(
          ...putParams.Item.raiResponses.map((o) => o.submissionTimestamp)
        );
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

        if (timestamp < lmTimestamp) return;

        const seaToolStatus = anEvent.SPW_STATUS.map((oneStatus) =>
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
        seaToolStatus &&
          SEATOOL_TO_ONEMAC_STATUS[seaToolStatus] &&
          (putParams.Item.currentStatus =
            SEATOOL_TO_ONEMAC_STATUS[seaToolStatus]);

        return;
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
      // if there was a package, and should not be now, delete the package item
      if (currentPackage) {
        const deleteParams = {
          TableName: oneMacTableName,
          Key: {
            pk: packageId,
            sk: packageSk,
          },
        };
        await dynamoDb.delete(deleteParams).promise();
        console.log(
          "%s had a package, now does not: ",
          packageId,
          deleteParams
        );
      }
      return; // don't bother creating packages not on dashboard
    }

    putParams.Item.raiResponses.sort(
      (a, b) => b.submissionTimestamp - a.submissionTimestamp
    );

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
