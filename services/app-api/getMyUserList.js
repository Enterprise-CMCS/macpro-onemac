import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE, USER_TYPE, getUserRoleObj } from "cmscommonlib";
import {
  getUserFunctions,
  getAuthorizedStateList,
  getCurrentStatus,
} from "./user/user-util";
import getUser from "./utils/getUser";

const transformUserList = (userResult, stateList) => {
  const userRows = [];
  const errorList = [];
  let i = 1;

  console.log("results:", JSON.stringify(userResult));

  // if there are no items, return an empty user list
  if (!userResult.Items) return userRows;

  userResult.Items.forEach((oneUser) => {
    // All users must have the attribute section
    if (!oneUser.attributes) {
      errorList.push(
        "Attributes data required for this role, but not found ",
        oneUser
      );
      return;
    }
    if (
      oneUser.type === "statesubmitter" ||
      oneUser.type === "statesystemadmin"
    ) {
      oneUser.attributes.forEach((oneAttribute) => {
        // skip states not on the Admin's list, not an error
        if (
          stateList.length > 0 &&
          stateList.indexOf(oneAttribute.stateCode) == -1
        )
          return;

        // State System Admins and State Submitters must have the history section
        if (!oneAttribute.history) {
          errorList.push(
            "History data required for this role, but not found ",
            oneUser
          );
          return;
        }

        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: oneAttribute.stateCode,
          role: oneUser.type,
          latest: getCurrentStatus(oneAttribute.history),
        });
        i++;
      });
    }
    // Helpdesk users and CMS Role Approvers must not have the history section
    else {
      userRows.push({
        id: i,
        email: oneUser.id,
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
        stateCode: "N/A",
        role: oneUser.type,
        latest: getCurrentStatus(oneUser.attributes),
      });
      i++;
    }
  });

  console.log("error List is ", errorList);

  console.log("Response:", userRows);

  return userRows;
};

// Gets owns user data from User DynamoDB table
export const main = handler(async (event) => {
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
  if (!uFunctions || !getUserRoleObj(doneBy.type).canAccessUserManagement) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  let scanParams = uFunctions.getScanParams();
  let stateList = [];
  if (doneBy.type === USER_TYPE.STATE_SYSTEM_ADMIN) {
    stateList = getAuthorizedStateList(doneBy);
  }

  const userResult = await dynamoDb.scan(scanParams);
  const transformedUserList = transformUserList(userResult, stateList);
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
  if (filterAttributeNames) {
    try {
      userNames = await dynamoDb.scan(scanParams);
    } catch (dbError) {
      console.log(`Error happened while reading from DB:  ${dbError}`);
      throw dbError;
    }
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
