import AWS from "aws-sdk";
import handler from "./libs/handler-lib";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

/**
 * Perform data migrations
 */

export const main = handler(async () => {
  // Scan it all... but really only need v0s
  const oneparams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :userpk",
    ExpressionAttributeValues: {
      ":userpk": "USER",
    },
  };
  const onePromiseItems = [];

  do {
    const results = await dynamoDb.query(oneparams).promise();
    for (const item of results.Items) {
      const updateParam = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression: "SET GSI2pk = :gsi2pk, GSI2sk = :gsi2sk",
        ExpressionAttributeValues: {
          ":gsi2pk": `${item.role}#${item.territory}`,
          ":gsi2sk": item.status,
        },
      };
      onePromiseItems.push(updateParam);
    }
    oneparams.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (oneparams.ExclusiveStartKey);

  await Promise.all(
    onePromiseItems.map(async (anUpdate) => {
      console.log("updating: ", anUpdate);
      await dynamoDb.update(anUpdate).promise();
    })
  );

  return "Done";
});
