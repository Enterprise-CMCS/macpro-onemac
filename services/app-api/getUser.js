import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// Gets owns user data from User DynamoDB table
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const data = event.queryStringParameters;
  console.log(data);
  const params = {
    TableName: process.env.userTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
  };

  try {
    const result = await dynamoDb.scan(params);

    if (!result.Items) {
      console.log("The user does not exists in this table.");
      // The result is an empty object {} in this case
      return result;
    }

    // Return the retrieved item
    return result;

  } catch (err) {
    console.log("ERROR: " +  JSON.stringify(err));
    return "{ error: " +  JSON.stringify(err) + "}";
  }
});
