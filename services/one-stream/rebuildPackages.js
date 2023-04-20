import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const gsi1pksToRebuild = ["SEATool#Medicaid_SPA", "SEATool#Medicaid_SPA"];

export const main = async () => {
  // only run this if indicated in the deploy
  if (!process.env.deployTrigger || process.env.deployTrigger === "none")
    return;

  const queryGSI2Params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    ProjectionExpression: "pk, sk",
  };

  const baseUpdateParams = {
    TableName: process.env.oneMacTableName,
    UpdateExpression: "SET deployTrigger = :dt",
    ExpressionAttributeValues: {
      ":dt": process.env.deployTrigger,
    },
  };

  const toRebuild = [];

  await Promise.all(
    gsi1pksToRebuild.map(async (gsi1pk) => {
      console.log(`Processing GSI1pk: %s`, gsi1pk);
      queryGSI2Params.ExpressionAttributeValues = {
        ":pk": gsi1pk,
      };

      do {
        const results = await dynamoDb.query(queryGSI2Params).promise();
        toRebuild.append(results.Items);
        queryGSI2Params.ExclusiveStartKey = results.LastEvaluatedKey;
      } while (queryGSI2Params.ExclusiveStartKey);
    })
  );

  await Promise.all(
    toRebuild.map(async (item) => {
      baseUpdateParams.Key.pk = item.pk;
      baseUpdateParams.Key.sk = item.sk;

      await dynamoDb.update(baseUpdateParams).promise();
    })
  );
};
