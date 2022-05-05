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
      ":gsi1pk": `OneMAC#spa`,
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "pk, sk",
  };

  const promiseItems = [];
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      console.log("item is: ", item);
      console.log("item slice is: ", item.sk.slice(0, 2));
      // if a one table entry in the index is NOT versioned, remove any GSI details
      if (item.sk.slice(0, 2) === "v0") continue;

      promiseItems.push({
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression: "REMOVE GSI1pk, GSI1sk",
      });
    }

    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  params.ExpressionAttributeValues = {
    ":gsi1pk": `OneMAC#waiver`,
  };

  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      console.log("item is: ", item);
      console.log("item slice is: ", item.sk.slice(0, 2));
      // if a one table entry in the index is NOT versioned, remove any GSI details
      if (item.sk.slice(0, 2) === "v0") continue;

      promiseItems.push({
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression: "REMOVE GSI1pk, GSI1sk",
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
