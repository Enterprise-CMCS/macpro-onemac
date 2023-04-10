import dynamoDb from "../libs/dynamodb-lib";

export const getPackageType = async (packageId) => {
  const getParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: packageId,
      sk: "Package",
    },
  };

  const result = await dynamoDb.get(getParams);
  if (!result || !result.Item || !result.Item.componentType)
    throw Error(`${packageId} did not get result for package!`);
  return result.Item.componentType;
};
