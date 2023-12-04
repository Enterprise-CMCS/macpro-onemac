import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

// rebuild all packages with SEA Tool events and TEs
const gsipksToRebuild = [
  "SEATool#Medicaid_SPA",
  "SEATool#CHIP_SPA",
  "SEATool#1915b_waivers",
  "SEATool#1915c_waivers",
  "OneMac#submitwaiverextensionb",
  "OneMac#submitwaiverextensionc",
];

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const main = async (event) => {
  await Promise.all(
    gsipksToRebuild.map(async (oneTopic) => {
      const processParams = {
        TableName: oneMacTableName,
        Item: {
          pk: "Process",
          sk: oneTopic,
          reason: event.reason,
        },
      };
      await dynamoDb.put(processParams).promise();
    })
  );
};
