import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const topicsToRebuild = [
  "SEATool#Medicaid_SPA",
  "SEATool#CHIP_SPA",
  "SEATool#1915b_waivers",
  "SEATool#1915c_waivers",
];

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const main = async (event) => {
  await Promise.all(
    topicsToRebuild.map(async (oneTopic) => {
      const processParams = {
        TableName: oneMacTableName,
        Key: {
          pk: "Process",
          sk: oneTopic,
        },
        reason: event.reason,
        processStartKey: null,
      };
      await dynamoDb.put(processParams).promise();
    })
  );
};
