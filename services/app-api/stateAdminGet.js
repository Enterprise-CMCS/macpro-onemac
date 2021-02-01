import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// Gets owns user data from the State Admin DynamoDB table
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if(event.source == "serverless-plugin-warmup" ) {
    console.log("Warmed up!");
    return null;
  }

  const params = {
    TableName: process.env.stateAdminTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
    }
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item for state admin not found.");
  }

  console.log('Sending back result:', JSON.stringify(result));
  // Return the retrieved item
  return result.Item;
});
