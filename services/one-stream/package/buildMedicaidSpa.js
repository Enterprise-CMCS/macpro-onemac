const _ = require("lodash");
import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const topLevelAttributes = [
  "GSI1pk",
  "GSI1sk",
  "componentId",
  "componentType",
  "submissionTimestamp",
  "proposedEffectiveDate",
  "clockEndTimestamp",
  "currentStatus",
  "currentStatusTimestamp",
  "lastModifiedTimestamp",
  "attachments",
  "additionalInformation",
  "submitterName",
  "submitterEmail",
];
export const buildMedicaidSpa = async (packageId) => {
  console.log("in buildMedicaidSp, packageId: ", packageId);
  const queryParams = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": packageId,
    },
  };
  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("buildMedicaidSpa result: ", result);

    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: packageId,
        sk: "v0#medicaidspa",
        GSI1pk: `OneMAC#spa`,
        GSI1sk: packageId,
        raiResponses: [],
      },
    };
    const sources = {};
    let currentPackage;
    let lmTimestamp = 0;
    result?.Items.forEach((anEvent) => {
      if (anEvent.submissionTimestamp > lmTimestamp)
        lmTimestamp = anEvent.submissionTimestamp;
      if (anEvent.sk === "v0#medicaidspa") {
        if (!currentPackage) currentPackage = anEvent;
        else console.log("ERROR: There should be ONLY ONE!", anEvent);
        return;
      }
      if (anEvent.sk.substring(0, 1) === "v") {
        console.log("ignoring: ", anEvent.sk);
        return;
      }

      if (anEvent.componentType === "medicaidsparai") {
        putParams.Item.raiResponses.push({
          submissionTimestamp: anEvent.submissionTimestamp,
          attachments: anEvent.attachments,
          additionalInformation: anEvent.additionalInformation,
          componentType: "medicaidsparai",
        });
        return;
      }
      const [source, timestamp] = anEvent.sk.split("#");
      if (!sources[source] || timestamp > sources[source].submissionTimestamp) {
        sources[source] = anEvent;

        topLevelAttributes.forEach((attributeName) => {
          if (anEvent[attributeName]) {
            putParams.Item[attributeName] = anEvent[attributeName];
          }
        });
      }
    });
    putParams.Item.lastModifiedTimestamp = lmTimestamp;
    console.log("currentPackage: ", currentPackage);
    console.log("newItem: ", putParams.Item);
    console.log("evaluates to: ", _.isEqual(currentPackage, putParams.Item));
    if (_.isEqual(currentPackage, putParams.Item)) return;
    putParams.ConditionExpression = `attribute_not_exists(pk) OR lastModifiedTimestamp < :newModifiedTimestamp`;
    putParams.ExpressionAttributeValues = {
      ":newModifiedTimestamp": putParams.Item.lastModifiedTimestamp,
    };
    console.log("and putParams: ", putParams);
    await dynamoDb.put(putParams).promise();

    console.log("buildMedicaidSpa result: ", result);
  } catch (e) {
    console.log("buildMedicaidSpa error: ", e);
  }
};
