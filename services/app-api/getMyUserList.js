import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  USER_TYPE,
  getUserRoleObj,
  tableRoles,
} from "cmscommonlib";
import { getAuthorizedStateList, getCurrentStatus } from "./user/user-util";
import getUser from "./utils/getUser";

const transformUserList = (forType, userResult, stateList) => {
  const userRows = [];
  const errorList = [];
  let i = 1;

  //  console.log("results:", JSON.stringify(userResult));

  // if there are no items, return an empty user list
  if (!userResult.Items) return userRows;

  userResult.Items.forEach((oneUser) => {
    // check if this type should be on list
    if (!tableRoles[forType].includes(oneUser.type)) return;

    // All users must have the attribute section
    if (!oneUser.attributes) {
      errorList.push(
        "Attributes data required for this role, but not found ",
        oneUser
      );
      return;
    }
    if (
      oneUser.type === USER_TYPE.STATE_SUBMITTER ||
      oneUser.type === USER_TYPE.STATE_SYSTEM_ADMIN
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

  // console.log("error List is ", errorList);

  // console.log("Response:", userRows);

  return userRows;
};

export const getMyUserList = async (event) => {
  // get the rest of the details about the current user
  const doneBy = await getUser(event.queryStringParameters.email);

  if (!doneBy) {
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  if (
    !getUserRoleObj(doneBy.type, false, doneBy?.attributes)
      .canAccessUserManagement
  ) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  let stateList = [];
  if (doneBy.type === USER_TYPE.STATE_SYSTEM_ADMIN) {
    stateList = getAuthorizedStateList(doneBy);
  }

  const userResult = await dynamoDb.scan({
    TableName: process.env.userTableName,
  });
  const transformedUserList = transformUserList(
    doneBy.type,
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
  const scanParams = {
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
};

export const main = handler(async (event) => {
  try {
    return getMyUserList(event);
  } catch (e) {
    console.log("error: ", e);
    return `Error ${e.message} in getMyUserList`;
  }
});
