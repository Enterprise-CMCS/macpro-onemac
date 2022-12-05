const _ = require("lodash");
import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

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
    console.log("starting putParams: ", putParams);
    let currentPackage;
    let lmTimestamp = 0;
    result?.Items.forEach((anEvent) => {
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
      const [source, timestamp] = anEvent.sk.split("#");

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

      // since we only report on SEATool status at this time, only the STATUS_DATE
      // is relevant to OneMAC package reporting
      if (source === "SEATool") {
        if (
          !anEvent.STATE_PLAN?.STATUS_DATE ||
          !anEvent?.SPW_STATUS?.SPW_STATUS_DESC
        ) {
          console.log(
            "%s SEATool event has bad status details... ",
            anEvent.pk,
            anEvent
          );
        } else {
          if (anEvent.STATE_PLAN.STATUS_DATE > lmTimestamp) {
            anEvent.currentStatus = anEvent.SPW_STATUS.SPW_STATUS_DESC;
            lmTimestamp = anEvent.STATE_PLAN.STATUS_DATE;
          }
        }
        return;
      }

      if (timestamp > lmTimestamp) lmTimestamp = timestamp;

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
    putParams.ConditionExpression = `attribute_not_exists(pk) OR lastEventTimestamp < :newModifiedTimestamp`;
    putParams.ExpressionAttributeValues = {
      ":newModifiedTimestamp": putParams.Item.lastEventTimestamp,
    };
    console.log("just before put: ", putParams);
    const putResult = await dynamoDb.put(putParams).promise();

    console.log("put result: ", putResult);
  } catch (e) {
    console.log("buildAnyPackage error: ", e);
  }
};
