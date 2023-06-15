import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

/**
 * Reset test Data
 */

export const main = async (event) => {
  console.log("deleteZZItems event: ", event);

  const deleteItems = [];
  let results;

  const dParams = {
    TableName: process.env.oneMacTableName,
    ProjectionExpression: "pk,sk",
    FilterExpression: "begins_with(pk, :zzstate)",
    ExclusiveStartKey: null,
    ExpressionAttributeValues: {
      ":zzstate": "ZZ",
    },
  };

  do {
    try {
      results = await dynamoDb.scan(dParams).promise();
      for (const item of results.Items) {
        deleteItems.push({
          TableName: process.env.oneMacTableName,
          Key: {
            pk: item.pk,
            sk: item.sk,
          },
        });
      }
    } catch (e) {
      console.log("query error: ", e.message);
    }
    dParams.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (dParams.ExclusiveStartKey);

  await Promise.all(
    deleteItems.map(async (deleteParams) => {
      try {
        console.log(`Delete Params are ${JSON.stringify(deleteParams)}`);

        await dynamoDb.delete(deleteParams).promise();
      } catch (e) {
        console.log("delete error: ", e.message);
      }
    })
  );
  console.log("lambda thinks " + deleteItems.length + " Items are deleted");
  return "Done";
};
