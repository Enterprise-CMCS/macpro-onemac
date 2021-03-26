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
  const uFunctions = getUserFunctions(doneBy.type);
  if (!uFunctions) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  let scanFor = uFunctions.getScanFor();
  let stateList = [];
  if (uFunctions.shouldICheckState()) {
    stateList = getAuthorizedStateList(doneBy);
  }
  const scanParams = {
    TableName: process.env.userTableName,
    FilterExpression: "#ty = :userType",
    ExpressionAttributeNames: { "#ty": "type" },
    ExpressionAttributeValues: { ":userType": scanFor },
  };

  const userResult = await dynamoDb.scan(scanParams);
  console.log("results:", JSON.stringify(userResult));

  return uFunctions.transformUserList(userResult, stateList);
});

/*
"body": "[{\"id\":\"stateadmindenied@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"denied\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"denied\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminactive@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"active\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"active\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminpending@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"pending\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"pending\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminrevoked@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"revoked\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"revoked\"}],\"type\":\"stateadmin\"}]",
*/
