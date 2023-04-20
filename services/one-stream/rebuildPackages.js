import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const gsi1pksToRebuild = [
  "SEATool#Medicaid_SPA",
  "SEATool#CHIP_SPA",
  "SEATool#1915b_waivers",
  "SEATool#1915c_waivers",
];

export const main = async () => {
  // only run this if indicated in the deploy
  if (!process.env.deployTrigger || process.env.deployTrigger === "none")
    return;

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
      // need the parameters inside the scope of the Promise
      const queryGSI1Params = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1pk = :pk",
        ExpressionAttributeValues: {
          ":pk": gsi1pk,
        },
        ProjectionExpression: "pk, sk",
      };

      do {
        console.log(`queryGSI1Params: %s`, queryGSI1Params);
        const results = await dynamoDb.query(queryGSI1Params).promise();
        console.log("results: ", results);
        toRebuild.push(...results.Items);
        queryGSI1Params.ExclusiveStartKey = results.LastEvaluatedKey;
      } while (queryGSI1Params.ExclusiveStartKey);
    })
  );

  console.log("toRebuild: ", toRebuild);
  await Promise.all(
    toRebuild.map(async (item) => {
      baseUpdateParams.Key.pk = item.pk;
      baseUpdateParams.Key.sk = item.sk;

      console.log("update params: ", baseUpdateParams);
      await dynamoDb.update(baseUpdateParams).promise();
    })
  );
};
