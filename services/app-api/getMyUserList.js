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

  let scanParams = uFunctions.getScanParams();
  let stateList = [];
  if (uFunctions.shouldICheckState()) {
    stateList = getAuthorizedStateList(doneBy);
  }

  const userResult = await dynamoDb.scan(scanParams);
  const transformedUserList = uFunctions.transformUserList(
    userResult,
    stateList
  );
  // Collect the unique doneBy user's email ids
  const doneByEmails = [
    ...new Set(transformedUserList.map((user) => user.latest.doneBy)),
  ];
  let filterAttributeNames = "";
  const filterAttribValues = {};
  // Generate filter expression attribute names and values for retreving the doneBy user names
  doneByEmails.map((email, i) => {
    filterAttributeNames += `:email${i}${
      i < doneByEmails.length - 1 ? "," : ""
    }`;
    filterAttribValues[`:email${i}`] = email;
  });
  scanParams = {
    TableName: process.env.userTableName,
    ProjectionExpression: "id, firstName, lastName",
    FilterExpression: `id IN (${filterAttributeNames})`,
    ExpressionAttributeValues: filterAttribValues,
  };
  let userNames;
  try {
    userNames = await dynamoDb.scan(scanParams);
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError}`);
    throw dbError;
  }
  // Populate doneBy Name
  return transformedUserList.map((user) => {
    const doneBy = userNames.Items.find(
      (item) => item.id === user.latest.doneBy
    );
    if (doneBy) {
      user.latest.doneByName = [doneBy.firstName, doneBy.lastName]
        .filter(Boolean)
        .join(" ");
    } else {
      console.log(
        `User id: ${user.email} has the doneBy id as ${user.latest.doneBy}, which does not have a user record of it's own in the DB`
      );
      user.latest.doneByName = "";
    }
    return user;
  });
});
