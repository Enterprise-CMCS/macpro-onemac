import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

// rebuild all packages with SEA Tool events and TEs
const skbeginswith = ["SEATool#RAI#", "SEATool#State_Plan#"];

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const main = async (event) => {
  await Promise.all(
    skbeginswith.map(async (onesk) => {
      const processParams = {
        TableName: oneMacTableName,
        Item: {
          pk: "Process",
          sk: onesk,
          action: "delete",
          reason: event.reason,
        },
      };
      await dynamoDb.put(processParams).promise();
    })
  );
};
