import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { ChangeRequest } from "cmscommonlib";

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  // scan one table index as only indexed items need migration in this case
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "OneMAC",
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "pk, sk, componentType, GSI1pk",
  };

  const promiseItems = [];
  do {
    const results = await dynamoDb.query(params);
    console.log("params are: ", params);
    console.log("results are: ", results);
    promiseItems.push(...results.Items);
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  const updateParams = {
    TableName: process.env.oneMacTableName,
    ConditionExpression: "GSI1pk='OneMAC'",
    UpdateExpression: "SET GSI1pk = :newGSIwithGroup",
    ReturnValues: "ALL_NEW",
  };

  // convert GSI1pl from OneMAC to OneMAC#spa or OneMAC#waiver based on component type
  await Promise.all(
    promiseItems.map(async (item, index) => {
      // get the package group of the item
      const newGSI1 =
        "OneMAC#" + ChangeRequest.MY_PACKAGE_GROUP[item.componentType];
      updateParams.Key = {
        pk: item.pk,
        sk: item.sk,
      };

      updateParams.ExpressionAttributeValues = {
        ":newGSIwithGroup": newGSI1,
      };
      try {
        console.log(
          `Update Params for ${JSON.stringify(item)} are ${JSON.stringify(
            updateParams
          )}`
        );
        if (index > 0) return;
        const result = await dynamoDb.update(updateParams);
        console.log("Result is: ", result);
      } catch (e) {
        console.log("update error: ", e);
      }
    })
  );

  return "Done";
});
