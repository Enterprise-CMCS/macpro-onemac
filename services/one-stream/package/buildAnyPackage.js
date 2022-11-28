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
  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("query result: ", result);

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
        currentStatus: "-- --", // include for ophans
        submissionTimestamp: 0,
        submitterName: "-- --",
        submitterEmail: "-- --",
      },
    };
    console.log("starting putParams: ", putParams);
    const sources = {};
    let currentPackage;
    let lmTimestamp = 0;
    result?.Items.forEach((anEvent) => {
      if (anEvent.submissionTimestamp > lmTimestamp)
        lmTimestamp = anEvent.submissionTimestamp;
      if (anEvent.sk === packageSk) {
        if (!currentPackage) currentPackage = anEvent;
        else console.log("ERROR: There should be ONLY ONE!", anEvent);
        return;
      }
      // we ignore all other v's (for now)
      if (anEvent.sk.substring(0, 1) === "v") {
        console.log("ignoring: ", anEvent.sk);
        return;
      }

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
      const [source, timestamp] = anEvent.sk.split("#");
      if (!sources[source] || timestamp > sources[source]) {
        sources[source] = timestamp;

        config.theAttributes.forEach((attributeName) => {
          if (anEvent[attributeName]) {
            putParams.Item[attributeName] = anEvent[attributeName];
          }
        });
      }
    });

    if (currentPackage && currentPackage?.lastModifiedTimestamp)
      delete currentPackage.lastModifiedTimestamp;
    console.log("currentPackage: ", currentPackage);
    console.log("newItem: ", putParams.Item);
    console.log("evaluates to: ", _.isEqual(currentPackage, putParams.Item));
    if (_.isEqual(currentPackage, putParams.Item)) return;

    putParams.Item.lastModifiedTimestamp = lmTimestamp;
    putParams.ConditionExpression = `attribute_not_exists(pk) OR lastModifiedTimestamp < :newModifiedTimestamp`;
    putParams.ExpressionAttributeValues = {
      ":newModifiedTimestamp": putParams.Item.lastModifiedTimestamp,
    };
    console.log("just before put: ", putParams);
    const putResult = await dynamoDb.put(putParams).promise();

    console.log("put result: ", putResult);
  } catch (e) {
    console.log("buildAnyPackage error: ", e);
  }
};
