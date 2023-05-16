import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const main = async () => {
  // get the process status information from dynamodb
  const processParams = {
    TableName: oneMacTableName,
    Key: {
      pk: "Process",
    },
  };

  const pResults = await dynamoDb.query(processParams).promise();

  const toRebuild = [];

  await Promise.all(
    pResults.Items.map(async (pItem) => {
      // need the parameters inside the scope of the Promise
      const queryGSI1Params = {
        TableName: oneMacTableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1pk = :pk",
        ExpressionAttributeValues: {
          ":pk": pItem.sk,
        },
        ExclusiveStartKey: pItem.processStartKey,
        ProjectionExpression: "pk, sk",
      };

      console.log(`queryGSI1Params: %s`, queryGSI1Params);
      const results = await dynamoDb.query(queryGSI1Params).promise();
      console.log("results: ", results);
      toRebuild.push(...results.Items);

      if (results.LastEvaluatedKey) {
        const nextProcessParams = {
          TableName: oneMacTableName,
          Key: {
            pk: pItem.pk,
            sk: pItem.sk,
          },
          processStartKey: results.LastEvaluatedKey,
        };
        await dynamoDb.put(nextProcessParams).promise();
      } else {
        const deleteProcessParams = {
          TableName: oneMacTableName,
          Key: {
            pk: pItem.pk,
            sk: pItem.sk,
          },
        };

        await dynamoDb.delete(deleteProcessParams).promise();
      }
    })
  );

  console.log("toRebuild: ", toRebuild);
  await Promise.all(
    toRebuild.map(async (item) => {
      await dynamoDb
        .update({
          TableName: oneMacTableName,
          Key: {
            pk: item.pk,
            sk: item.sk,
          },
          UpdateExpression: "SET streamUpdateDate = :dt",
          ExpressionAttributeValues: {
            ":dt": Date.now(),
          },
        })
        .promise();
    })
  );
};
