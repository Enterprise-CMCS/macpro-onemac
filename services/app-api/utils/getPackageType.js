import dynamoDb from "../libs/dynamodb-lib";

export const getPackageType = async (packageId) => {
  const getParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: packageId,
      sk: "Package",
    },
  };

  const result = dynamoDb.get(getParams);
  if (!result || !result.Item || !result.Item.componentType)
    throw Error("%s did not get result for package!", packageId);
  return result.Item.componentType;
};
