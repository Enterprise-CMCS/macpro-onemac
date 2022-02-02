import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { APPROVING_USER_TYPE } from "cmscommonlib";

export const queryForUserRole2 = async (role, territory) => {
  if (!territory) territory = "All";
  let adminList;
  const adminRole = APPROVING_USER_TYPE[role];
  try {
    const queryParams = {
      TableName: process.env.oneMacTableName,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1pk = :pk",
      ExpressionAttributeValues: {
        ":pk": `${adminRole}#${territory}`,
      },
      ProjectionExpression: "email,firstName,lastName",
    };
    console.log("Query Params: ", queryParams);
    adminList = await dynamoDb.query(queryParams);
  } catch (e) {
    console.log("Error is: ", e);
  }

  console.log("Returns: ", adminList);

  return adminList.Items;
};

// get the approver list for a rols and possibly a territory
export const main = handler(async (event) => {
  // get the list of states we care about
  console.log("Event in is: ", event);
  const role = event.queryStringParameters.role;
  const territory = event.queryStringParameters.territory;

  return await queryForUserRole2(role, territory);
});
