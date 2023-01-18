import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

export const main = async (event) => {
  console.log("getPackageItems event: ", event);

  const queryParams = {
    TableName: event.tableName ? event.tableName : process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": event.packageId,
    },
  };
  console.log("%s queryParams: ", event.packageId, queryParams);

  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("%s query result: ", event.packageId, result);
    if (result?.Items.length <= 0) {
      console.log("%s did not have Items?", event.packageId);
      return;
    }

    return result.Items;
  } catch (e) {
    console.log("%s getPackageItems error: ", event.packageId, e);
    throw e;
  }
};
