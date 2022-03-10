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
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "pk, sk, currentStatus, children",
  };

  const promiseItems = [];
  do {
    const results = await dynamoDb.scan(params);

    for (const item of results.Items) {
      const updateParams = {
        TableName: process.env.oneMacTableName,
        ReturnValues: "ALL_NEW",
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        ExpressionAttributeValues: {},
      };

      const updateExpressions = [];

      //check if item status needs to be modified
      if (item.currentStatus === "Package Withdrawn") {
        updateExpressions.push("currentStatus = :newStatus");
        updateParams.ExpressionAttributeValues[":newStatus"] = "Withdrawn";
      }

      //check if children statuses need to be modified
      if (item.children) {
        let childUpdated = false;
        for (const child of item.children) {
          if (child.currentStatus === "Package Withdrawn") {
            child.currentStatus = "Withdrawn";
            childUpdated = true;
          }
        }
        if (childUpdated) {
          updateExpressions.push("children = :newChildren");
          updateParams.ExpressionAttributeValues[":newChildren"] =
            item.children;
        }
      }

      if (updateExpressions.length > 0) {
        updateParams.UpdateExpression = "SET " + updateExpressions.join(",");
        promiseItems.push(updateParams);
      }
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
