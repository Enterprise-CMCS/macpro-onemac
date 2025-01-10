import dynamoDb from "../libs/dynamodb-lib";

export const getCPOCandSRTEmailAddresses = async (packageId) => {
  let returnObj = {};
  const qParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: `${packageId}`,
      sk: "Package",
    },
    ProjectionExpression: "cpocEmail, reviewTeamEmailList",
  };
  try {
    const packageItem = await dynamoDb.get(qParams);

    returnObj = packageItem.Item;
  } catch (e) {
    console.log("query error: ", e.message);
  }
  return returnObj;
};
