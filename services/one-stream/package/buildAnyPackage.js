const _ = require("lodash");
import AWS from "aws-sdk";
import { dynamoConfig, Workflow } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const SEATOOL_TO_ONEMAC_STATUS = {
  [Workflow.SEATOOL_STATUS.PENDING]: Workflow.ONEMAC_STATUS.IN_REVIEW,
  [Workflow.SEATOOL_STATUS.PENDING_RAI]: Workflow.ONEMAC_STATUS.RAI_ISSUED,
  [Workflow.SEATOOL_STATUS.APPROVED]: Workflow.ONEMAC_STATUS.APPROVED,
  [Workflow.SEATOOL_STATUS.DISAPPROVED]: Workflow.ONEMAC_STATUS.DISAPPROVED,
  [Workflow.SEATOOL_STATUS.WITHDRAWN]: Workflow.ONEMAC_STATUS.WITHDRAWN,
  [Workflow.SEATOOL_STATUS.TERMINATED]: Workflow.ONEMAC_STATUS.TERMINATED,
  [Workflow.SEATOOL_STATUS.PENDING_CONCURRANCE]:
    Workflow.ONEMAC_STATUS.IN_REVIEW,
  [Workflow.SEATOOL_STATUS.UNSUBMITTED]: Workflow.ONEMAC_STATUS.UNSUBMITTED,
  [Workflow.SEATOOL_STATUS.PENDING_APPROVAL]: Workflow.ONEMAC_STATUS.IN_REVIEW,
  [Workflow.SEATOOL_STATUS.UNKNOWN]: Workflow.ONEMAC_STATUS.SUBMITTED,
};

export const buildAnyPackage = async (packageId, config) => {
  console.log("Building package: ", packageId);
  const queryParams = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": packageId,
    },
  };
  const childrenParams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI2",
    KeyConditionExpression: "GSI2pk = :pk",
    ExpressionAttributeValues: {
      ":pk": packageId,
    },
  };

  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("%s query result: ", packageId, result);
    if (result?.Items.length <= 0) {
      console.log("%s did not have Items?", packageId);
      return;
    }
    const packageSk = `Package`;
    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: packageId,
        sk: packageSk,
        GSI1pk: `OneMAC#${config.whichTab}`,
        GSI1sk: packageId,
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
    let lmTimestamp = 0;

    result.Items.forEach((anEvent) => {
      // we ignore all other v's (for now)
      if (anEvent.sk.substring(0, 1) === "v") {
        console.log("ignoring: ", anEvent.sk);
        return;
      }

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

      // since we only report on SEATool status at this time, only the STATUS_DATE
      // is relevant to OneMAC package reporting
      if (source === "SEATool") {
        if (!anEvent.STATE_PLAN?.STATUS_DATE || !anEvent.SPW_STATUS) {
          console.log(
            "%s SEATool event has bad status details... ",
            anEvent.pk,
            anEvent
          );
        } else {
          console.log(
            "%s has lmTimestamp %d and status date %d",
            anEvent.pk,
            lmTimestamp,
            anEvent.STATE_PLAN.STATUS_DATE
          );
          if (anEvent.STATE_PLAN.STATUS_DATE > lmTimestamp) {
            putParams.Item.currentStatus =
              SEATOOL_TO_ONEMAC_STATUS[anEvent.SPW_STATUS[0].SPW_STATUS_DESC];
            lmTimestamp = anEvent.STATE_PLAN.STATUS_DATE;
          }
        }
        return;
      }

      if (timestamp > lmTimestamp) {
        lmTimestamp = timestamp;
      }

      // we include ALL rai events in package details
      if (
        anEvent.componentType === `${config.componentType}rai` ||
        anEvent.componentType === `waiverrai`
      ) {
        putParams.Item.raiResponses.push({
          submissionTimestamp: anEvent.submissionTimestamp,
          attachments: anEvent.attachments,
          additionalInformation: anEvent.additionalInformation,
        });
        return;
      }

      config.theAttributes.forEach((attributeName) => {
        if (anEvent[attributeName]) {
          if (attributeName === "parentId") {
            // having a parent adds the GSI2pk index
            putParams.Item.GSI2pk = anEvent.parentId;
            putParams.Item.GSI2sk = anEvent.componentType;
          }
          putParams.Item[attributeName] = anEvent[attributeName];
        }
      });
    });

    putParams.Item.raiResponses.sort(
      (a, b) => b.submissionTimestamp - a.submissionTimestamp
    );

    const children = await dynamoDb.query(childrenParams).promise();
    console.log("%s children result: ", packageId, children);
    children?.Items.forEach((aChild) => {
      if (aChild.componentType === "waiverextension") {
        if (aChild.lastEventTimestamp > lmTimestamp)
          lmTimestamp = aChild.lastEventTimestamp;

        putParams.Item.waiverExtensions.push({
          lastEventTimestamp: aChild.lastEventTimestamp,
          submissionTimestamp: aChild.submissionTimestamp,
          componentId: aChild.componentId,
          currentStatus: aChild.currentStatus,
        });
      }
    });

    console.log("currentPackage: ", currentPackage);
    console.log("newItem: ", putParams.Item);
    console.log("evaluates to: ", _.isEqual(currentPackage, putParams.Item));
    if (_.isEqual(currentPackage, putParams.Item)) return;

    putParams.Item.lastEventTimestamp = lmTimestamp;
    // putParams.ConditionExpression = `attribute_not_exists(pk) OR lastEventTimestamp < :newModifiedTimestamp`;
    // putParams.ExpressionAttributeValues = {
    //   ":newModifiedTimestamp": putParams.Item.lastEventTimestamp,
    // };
    console.log("just before put: ", putParams);
    const putResult = await dynamoDb.put(putParams).promise();

    console.log("put result: ", putResult);
  } catch (e) {
    console.log("buildAnyPackage error: ", e);
  }
};
