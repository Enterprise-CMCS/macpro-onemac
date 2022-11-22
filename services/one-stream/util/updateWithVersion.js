import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

export default async function updateWithVersion(updateParams) {
  updateParams.ReturnValues = "ALL_NEW";
  updateParams.Key.sk = `v0#${updateParams.Key.sk}`;
  console.log("updateComponent: updateParams: ", updateParams);
  try {
    const result = await dynamoDb.update(updateParams).promise();

    const putsk = result["Attributes"]["sk"].replace(
      "v0#",
      "v" + result["Attributes"]["Latest"] + "#"
    );
    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        ...result.Attributes,
        sk: putsk,
      },
    };
    console.log("now the put params: ", putParams);
    await dynamoDb.put(putParams).promise();

    // remove GSI
    const gsiParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: result["Attributes"]["pk"],
        sk: putsk,
      },
    };
    gsiParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk, GSI2pk, GSI2sk";

    console.log("and the gsiParams: ", gsiParams);
    await dynamoDb.update(gsiParams).promise();

    return result.Attributes;
  } catch (error) {
    console.log(`Error:  ${error.message}`);
    throw error;
  }
}