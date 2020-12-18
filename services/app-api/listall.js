import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if(event.source == "serverless-plugin-warmup" ) {
    console.log("Warmed up!");
    return null;
  }

  const params = {
    TableName: process.env.tableName,
    ProjectionExpression:"territory"
  };

  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return result.Items;
});
