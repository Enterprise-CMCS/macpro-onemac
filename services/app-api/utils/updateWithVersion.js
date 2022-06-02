import dynamoDb from "../libs/dynamodb-lib";

export default async function updateWithVersion(updateParams) {
  updateParams.ReturnValues = "ALL_NEW";
  updateParams.Key.sk = `v0#${updateParams.Key.sk}`;

  try {
    const result = await dynamoDb.update(updateParams);

    const putsk = result["Attributes"]["sk"].replace(
      "v0#",
      "v" + result["Attributes"]["Latest"] + "#"
    );
    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: result["Attributes"]["pk"],
        sk: putsk,
        ...result.Attributes,
      },
    };
    await dynamoDb.put(putParams);

    // remove GSI
    const gsiParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: result["Attributes"]["pk"],
        sk: putsk,
      },
    };
    gsiParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk";

    await dynamoDb.update(gsiParams);

    return result.Attributes;
  } catch (error) {
    console.log(`Error:  ${error.message}`);
    throw error;
  }
}
