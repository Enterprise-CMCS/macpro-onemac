import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  USER_STATUS,
  USER_ROLE,
  getUserRoleObj,
} from "cmscommonlib";
import { getUser } from "./getUser";

export const buildParams = (role, territory) => {
  let KeyConditionExpression = "GSI1pk=:user";
  const ExpressionAttributeValues = { ":user": "USER" };
  //let FilterExpression = null;

  switch (role) {
    // CSA gets everyone, which is the base params
    case USER_ROLE.SYSTEM_ADMIN:
    case USER_ROLE.HELPDESK:
      break;
    // HD gets everyone but CSA - have to use FilterExpression to get more than one role
    //    case USER_ROLE.HELPDESK:
    //     FilterExpression = "#role <> :role";
    //     ExpressionAttributeValues[":role"] = USER_ROLE.SYSTEM_ADMIN;
    //   break;
    // CMS Role Approvers can see anyone that their role can approve
    case USER_ROLE.CMS_ROLE_APPROVER:
      KeyConditionExpression += ` AND GSI1sk=:sk`;
      ExpressionAttributeValues[":sk"] = USER_ROLE.CMS_ROLE_APPROVER;
      break;
    // State System Admins can see anyone their role can approver for their territory
    case USER_ROLE.STATE_SYSTEM_ADMIN:
      KeyConditionExpression += ` AND GSI1sk=:sk`;
      ExpressionAttributeValues[
        ":sk"
      ] = `${USER_ROLE.STATE_SYSTEM_ADMIN}#${territory}`;
      break;
  }

  return {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression,
    ExpressionAttributeValues,
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
  };
};

export const getMyUserList = async (event) => {
  try {
    // get the rest of the details about the current user
    const doneBy = await getUser(event.queryStringParameters.email);

    if (!doneBy) {
      return RESPONSE_CODE.USER_NOT_FOUND;
    }

    if (!getUserRoleObj(doneBy?.roleList).canAccessUserManagement) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }

    const [territory] = Array.from(
      new Set(
        doneBy.roleList
          .filter(({ status }) => status === USER_STATUS.ACTIVE)
          .map(({ territory }) => territory)
      )
    );

    const listResult = await dynamoDb.query(
      buildParams(doneBy.roleList[0].role, territory)
    );

    return listResult.Items;
  } catch (e) {
    console.log("getMyUserList exception? ", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }
};

export const main = handler(getMyUserList);
