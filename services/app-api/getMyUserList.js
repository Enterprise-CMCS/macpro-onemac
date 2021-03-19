import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import { USER_TYPES } from "./user/userTypes";

// Gets owns user data from User DynamoDB table
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  // get this user's details so we know what to send back
  const params = {
    TableName: process.env.userTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      id: event.queryStringParameters.email,
    },
  };

  const result = await dynamoDb.get(params);

  // if the calling user is not in database, return error
  if (!result.Item) {
    console.log("The user does not exists in this table.", params);
    // The result is an empty object {} in this case
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  let scanFor;

  // what users they see depends on what role they are
  switch (result.Item.type) {
    case USER_TYPES.STATE_USER:
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    case USER_TYPES.STATE_ADMIN:
      scanFor = USER_TYPES.STATE_USER;
      break;
    case USER_TYPES.CMS_APPROVER:
      scanFor = USER_TYPES.STATE_ADMIN;
      break;
    case USER_TYPES.CMS_SYSTEM_ADMIN:
      scanFor = USER_TYPES.CMS_APPROVER;
      break;
    default:
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  const scanParams = {
    TableName: process.env.userTableName,
    FilterExpression: "#ty = :userType",
    ExpressionAttributeNames: { "#ty": "type" },
    ExpressionAttributeValues: { ":userType": scanFor },
  };

  const userResult = await dynamoDb.scan(scanParams);
  let userResponse = userResult.map((oneUser) => {
    return {
      email: oneUser.id,
    };
  });

  console.log("results:", JSON.stringify(userResult));
  console.log("Response:", userResponse);
  // Return the retrieved item
  return userResponse;
});

/*
"body": "[{\"id\":\"stateadmindenied@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"denied\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"denied\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminactive@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"active\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"active\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminpending@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"pending\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"pending\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminrevoked@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"revoked\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"revoked\"}],\"type\":\"stateadmin\"}]",
*/
