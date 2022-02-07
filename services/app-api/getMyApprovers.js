import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { APPROVING_USER_TYPE, USER_TYPE } from "cmscommonlib";

export const getMyApprovers = async (role, territory) => {
  if (!territory) territory = "N/A";
  let adminList;
  const adminRole = APPROVING_USER_TYPE[role];
  if (adminRole === USER_TYPE.CMS_ROLE_APPROVER) territory = "N/A";
  try {
    const queryParams = {
      TableName: process.env.oneMacTableName,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1pk = :pk",
      ExpressionAttributeValues: {
        ":pk": `${adminRole}#${territory}`,
      },
      ProjectionExpression: "email,firstName,lastName, fullName",
    };
    adminList = await dynamoDb.query(queryParams);
  } catch (e) {
    console.log("Error is: ", e);
  }

  return adminList.Items;
};

// get the approver list for a rols and possibly a territory
export const main = handler(async (event) => {
  // get the list of states we care about
  const { role, territory } = event.queryStringParameters;

  return await getMyApprovers(role, territory);
});
