import AWS from "aws-sdk";
import handler from "./libs/handler-lib";
import { APPROVING_USER_ROLE, USER_ROLE, dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

export const getMyApprovers = async (role, territory) => {
  if (!territory) territory = "N/A";
  let adminList;
  const adminRole = APPROVING_USER_ROLE[role];
  if (adminRole === USER_ROLE.CMS_ROLE_APPROVER) territory = "N/A";
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
    adminList = await dynamoDb.query(queryParams).promise();
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
