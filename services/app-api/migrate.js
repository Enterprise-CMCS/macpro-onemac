import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);
  // scan one table index as only indexed items need migration in this case
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `USER`,
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#date": "date",
    },
    ProjectionExpression: "pk, sk, #date",
  };

  const promiseItems = [];
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      // don't update if date is already in milliseconds
      if (item.date > 10000000000) continue;

      promiseItems.push({
        TableName: process.env.oneMacTableName,
        ReturnValues: "ALL_NEW",
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression: "SET #date = :newDate",
        ExpressionAttributeNames: {
          "#date": "date",
        },
        ExpressionAttributeValues: {
          ":newDate": item.date * 1000,
        },
      });
    }
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  await Promise.all(
    promiseItems.map(async (updateParams) => {
      try {
        console.log(`Update Params are ${JSON.stringify(updateParams)}`);

        const result = await dynamoDb.update(updateParams);
        console.log("Result is: ", result);
      } catch (e) {
        console.log("update error: ", e);
      }
    })
  );

  return "Done";
});
