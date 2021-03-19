import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import getUserFunctions from "./user/user-util";

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

  // map the user functions from the type pulled in from tne current user
  const uFunctions = getUserFunctions(result.Item.type);
  if (!uFunctions) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  let scanFor = uFunctions.getScanFor();

  const scanParams = {
    TableName: process.env.userTableName,
    FilterExpression: "#ty = :userType",
    ExpressionAttributeNames: { "#ty": "type" },
    ExpressionAttributeValues: { ":userType": scanFor },
  };

  let userRows = [];
  let i=1;
  const userResult = await dynamoDb.scan(scanParams);
  console.log("results:", JSON.stringify(userResult));

  userResult.Items.forEach((oneUser) => {
    if (oneUser.attributes) {
      oneUser.attributes.forEach((oneAttribute) => {
        if (oneAttribute.history) {
          let currentStatus;
          let mostRecentTime = 0;

          oneAttribute.history.forEach((attributeHistory) => {
            if (attributeHistory.date > mostRecentTime) {
              currentStatus = attributeHistory.status;
              mostRecentTime = attributeHistory.date;
            }
          });
          userRows.push({
            id: i,
            email: oneUser.id,
            firstName: oneUser.firstName,
            lastName: oneUser.lastName,
            state: oneAttribute.stateCode,
            status: currentStatus,
          });
          i++;
        } else {
          userRows.push({
            id: i,
            email: oneUser.id,
            firstName: oneUser.firstName,
            lastName: oneUser.lastName,
            state: oneAttribute.stateCode,
            status: oneAttribute.status,
          });
          i++;
        }
      });
    } else {
      userRows.push({
        id: i,
        email: oneUser.id,
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
      });
      i++;
    }
  });

  console.log("results:", JSON.stringify(userResult));
  console.log("Response:", userRows);
  // Return the retrieved item
  return userRows;
});

/*
"body": "[{\"id\":\"stateadmindenied@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"denied\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"denied\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminactive@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"active\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"active\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminpending@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"pending\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"pending\"}],\"type\":\"stateadmin\"},{\"id\":\"stateadminrevoked@cms.hhs.local\",\"attributes\":[{\"date\":1616075077,\"stateCode\":\"MI\",\"status\":\"revoked\"},{\"date\":1616075077,\"stateCode\":\"VA\",\"status\":\"revoked\"}],\"type\":\"stateadmin\"}]",
*/
