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
    FilterExpression: "currentStatus = :withdrawnStatus",
    ExpressionAttributeValues: {
      ":withdrawnStatus": "Package Withdrawn",
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "pk, sk, currentStatus",
  };

  const promiseItems = [];
  do {
    const results = dynamoDb.scan(params);
    console.log("params are: ", params);
    console.log("results are: ", results);
    promiseItems.push(...results.Items);
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  const updateParams = {
    TableName: process.env.oneMacTableName,
    ConditionExpression: "currentStatus=:currentStatus",
    UpdateExpression: "SET currentStatus = :newStatus",
    ReturnValues: "ALL_NEW",
  };

  // convert GSI1pl from OneMAC to OneMAC#spa or OneMAC#waiver based on component type
  await Promise.all(
    promiseItems.map(async (item, index) => {
      // get the package group of the item
      updateParams.Key = {
        pk: item.pk,
        sk: item.sk,
      };

      updateParams.ExpressionAttributeValues = {
        ":currentStatus": "Package Withdrawn",
        ":newStatus": "Withdrawn",
      };

      try {
        console.log(
          `Update Params for ${JSON.stringify(item)} are ${JSON.stringify(
            updateParams
          )}`
        );
        if (index >= 0) return;
        const result = await dynamoDb.update(updateParams);
        console.log("Result is: ", result);
      } catch (e) {
        console.log("update error: ", e);
      }
    })
  );

  return "Done";
});
