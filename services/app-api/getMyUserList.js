import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  USER_ROLE,
  getUserRoleObj,
  effectiveRoleForUser,
  getActiveTerritories,
} from "cmscommonlib";
import { getUser } from "./getUser";
import { logAttempt } from "./utils/logAttempt";

export const buildParams = (role, territory) => {
  const startParams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user",
    ExpressionAttributeValues: { ":user": "USER" },
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
  };

  switch (role) {
    // CSA gets everyone, which is the base params
    case USER_ROLE.SYSTEM_ADMIN:
      break;
    // HD gets everyone but CSA - have to use FilterExpression to get more than one role
    case USER_ROLE.HELPDESK:
      startParams.FilterExpression = "#role <> :role";
      startParams.ExpressionAttributeValues[":role"] = USER_ROLE.SYSTEM_ADMIN;
      break;
    // CMS Role Approvers can see anyone that their role can approve
    case USER_ROLE.CMS_ROLE_APPROVER:
      startParams.KeyConditionExpression += ` AND GSI1sk=:sk`;
      startParams.ExpressionAttributeValues[":sk"] =
        USER_ROLE.CMS_ROLE_APPROVER;
      break;
    // State System Admins can see anyone their role can approver for their territory
    case USER_ROLE.STATE_SYSTEM_ADMIN:
      startParams.KeyConditionExpression += ` AND GSI1sk=:sk`;
      startParams.ExpressionAttributeValues[
        ":sk"
      ] = `${USER_ROLE.STATE_SYSTEM_ADMIN}#${territory}`;
      break;
  }

  return startParams;
};

export const getMyUserList = async (event) => {
  const ipAddress = event.requestContext.identity.sourceIp;
  try {
    // get the rest of the details about the current user
    const doneBy = await getUser(event.queryStringParameters.email);

    if (!doneBy) {
      logAttempt("getMyUserList", false, ipAddress);
      return RESPONSE_CODE.USER_NOT_FOUND;
    }

    if (!getUserRoleObj(doneBy?.roleList).canAccessUserManagement) {
      logAttempt("getMyUserList", false, ipAddress, doneBy);
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }

    const umAccess = effectiveRoleForUser(doneBy.roleList);
    if (!umAccess) return RESPONSE_CODE.USER_NOT_AUTHORIZED;

    const umRole = umAccess.shift();

    const territories = getActiveTerritories(doneBy.roleList);
    if (territories.length > 1) return RESPONSE_CODE.USER_NOT_AUTHORIZED;

    const listResult = await dynamoDb.query(
      buildParams(umRole, territories.shift())
    );

    logAttempt("getMyUserList", true, ipAddress, doneBy);
    return listResult.Items;
  } catch (e) {
    console.log("getMyUserList exception? ", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }
};

export const main = handler(getMyUserList);
