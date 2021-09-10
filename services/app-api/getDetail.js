import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  let detailsk = event.queryStringParameters.cType;

  if (
    detailsk != "spa" &&
    detailsk != "waivernew" &&
    event.queryStringParameters.cNum
  )
    detailsk += `#${event.queryStringParameters.cNum}`;
  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: event.pathParameters.id,
      sk: detailsk,
    },
  };
  console.log("getDetail parameters: ", params);
  const result = await dynamoDb.get(params);
  if (!result.Item) {
    return {};
  }
  console.log("Sending back result:", JSON.stringify(result, null, 2));
  return { ...result.Item };
});
