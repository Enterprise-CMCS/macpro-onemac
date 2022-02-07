import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  USER_STATUS,
  USER_TYPE,
  getUserRoleObj,
} from "cmscommonlib";
import getUser from "./utils/getUser";

export const buildParams = (role, territory) => {
  // default for CSA and HD
  let KeyConditionExpression = "GSI1pk=:user";
  const ExpressionAttributeValues = { ":user": "USER" };

  if (territory !== "N/A") {
    // get statesystemadmin#<territory>
    KeyConditionExpression += ` AND GSI1sk=:sk`;
    ExpressionAttributeValues[
      ":sk"
    ] = `${USER_TYPE.STATE_SYSTEM_ADMIN}#${territory}`;
  } else if (role === USER_TYPE.CMS_ROLE_APPROVER) {
    // get cmsroleapprover
    KeyConditionExpression += ` AND GSI1sk=:sk`;
    ExpressionAttributeValues[":sk"] = USER_TYPE.CMS_ROLE_APPROVER;
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

    console.debug(buildParams(doneBy.roleList[0].role, territory));

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
