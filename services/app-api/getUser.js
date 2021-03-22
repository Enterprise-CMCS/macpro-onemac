import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { ROLE_ACL  } from "cmscommonacl";

// Gets owns user data from User DynamoDB table
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const params = {
    TableName: process.env.userTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      id: event.queryStringParameters.email,
    },
  };

  const allowedRoutes = JSON.stringify(ROLE_ACL);
  const result = await dynamoDb.get(params);

  if (!result.Item) {
    console.log("The user does not exists in this table.", params);
    // The result is an empty object {} in this case
    return result;
  }

  console.log("Sending back result:", JSON.stringify(result));
  // Return the retrieved item

  result.Item.validRoutes = allowedRoutes;
  return result.Item;
});
