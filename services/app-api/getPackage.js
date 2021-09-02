import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": event.pathParameters.id,
    },
  };

  const result = await dynamoDb.query(params);
  if (!result.Items) {
    throw new Error("Item not found.");
  }
  console.log("Sending back result:", JSON.stringify(result, null, 2));
  const returnData = { ...result.Items };
  //  returnData.submissionDate =
  //    result.Item?.changeHistory[result.Item.length - 1]?.submissionDate;
  //  returnData.packageType = result.Item?.changeHistory.find(
  //  (element) => element.packageType
  // );

  return returnData;
});
