import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import { getUserFunctions, getAuthorizedStateList } from "./user/user-util";
import getUser from "./utils/getUser";

// Gets owns user data from User DynamoDB table
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  // get the rest of the details about the current user
  const doneBy = await getUser(event.queryStringParameters.email);

  if (!doneBy) {
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  // map the user functions from the type pulled in from tne current user
  const uFunctions = getUserFunctions(doneBy);
  if (!uFunctions) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  let reasonWhyNot = uFunctions.canIRequestThis(doneBy);
  if (reasonWhyNot) return reasonWhyNot;

  let scanFor = uFunctions.getScanFor();
  let stateList = [];
  if (uFunctions.shouldICheckState()) {
    stateList = getAuthorizedStateList(doneBy);
  }
  const scanParams = {
    TableName: process.env.userTableName,
    FilterExpression: (doneBy.type !== 'helpdesk') ? "#ty = :userType" : "#ty <> :userType",
    ExpressionAttributeNames: { "#ty": "type" },
    ExpressionAttributeValues: (doneBy.type !== 'helpdesk') ? { ":userType": scanFor } : { ":userType": "systemadmin" },
  };
  
  const userResult = await dynamoDb.scan(scanParams);

  return uFunctions.transformUserList(userResult, stateList);
});
