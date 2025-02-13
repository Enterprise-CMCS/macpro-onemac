import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

import { getUserRoleObj } from "cmscommonlib";
import { logAttempt } from "./utils/logAttempt";

/**
 * returns the User Table entry who's id is this email
 * @param {String} userEmail User to return
 * @param {String} ipAddress users ip address
 * @returns {Object} the User json object
 */
export const getUser = async (userEmail, ipAddress) => {
  const cParams = {
    TableName: process.env.oneMacTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      pk: userEmail.toLowerCase(),
      sk: "ContactInfo",
    },
    ProjectionExpression: "email, fullName, phoneNumber",
  };

  console.log("cParams", cParams);
  const params = {
    TableName: process.env.oneMacTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    KeyConditionExpression: "pk = :pk AND begins_with(sk,:version)",
    ExpressionAttributeValues: {
      ":pk": userEmail.toLowerCase(),
      ":version": "v0",
    },
    ExpressionAttributeNames: {
      "#role": "role",
      "#status": "status",
    },
    ProjectionExpression: "#role, territory, #status",
  };
  let result;
  let cResult;

  try {
    cResult = await dynamoDb.get(cParams);

    result = await dynamoDb.query(params);

    if (!result.Items) {
      result = setTimeout(await dynamoDb.query(params), 1500);
    }
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError}`);
    logAttempt("getUser", false, ipAddress);
    throw dbError;
  }

  if (!cResult.Item) {
    console.log(
      `The user does not exist with the id: %s in the User table`,
      userEmail,
      cResult
    );
    return null;
  }

  const returnUser = cResult.Item;
  returnUser.roleList = result.Items;
  console.log(`Selected User ${userEmail}: ${JSON.stringify(returnUser)}`);
  logAttempt("getUser", true, ipAddress);
  return returnUser;
};

// Gets owns user data from User DynamoDB table
export const main = handler(async (event) => {
  const userItem =
    (await getUser(
      event.queryStringParameters.email,
      event.requestContext.identity.sourceIp
    )) ?? {};
  userItem.validRoutes = getUserRoleObj(userItem.roleList).getAccesses();
  return userItem;
});