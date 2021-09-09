import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage({
  packageId: updatePk,
  ...updateData
}) {
  const updateSk = "PACKAGE";
  const updatePackageParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: updatePk,
      sk: updateSk,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
    ExpressionAttributeValues: {
      ":pkVal": updatePk,
      ":skVal": updateSk,
      ":newChange": [updateData],
      ":emptyList": [],
    },
    ReturnValues: "ALL_NEW",
  };

  // only update clock if new Clock is sent
  if (updateData.clockEndTimestamp) {
    updatePackageParams.ExpressionAttributeValues[":newClockEnd"] =
      updateData.clockEndTimestamp;
    updatePackageParams.UpdateExpression += ", currentClockEnd = :newClockEnd";
  }

  // only update status if new Status is sent
  if (updateData.packageStatus) {
    updatePackageParams.ExpressionAttributeValues[":newStatus"] =
      updateData.packageStatus;
    updatePackageParams.UpdateExpression += ",currentStatus = :newStatus";
  }

  // up the number in the component count for this component
  if (updateData.componentType) {
    updatePackageParams.ExpressionAttributeNames = {
      "#componentTypeName": updateData.componentType,
    };
    updatePackageParams.ExpressionAttributeValues[":thiscomponent"] = [
      {
        componentType: updateData.componentType,
        componentTimestamp: updateData.submissionTimestamp,
      },
    ];
    updatePackageParams.UpdateExpression +=
      ", #componentTypeName = list_append(if_not_exists(#componentTypeName,:emptyList), :thiscomponent)";
  }

  try {
    const { Attributes } = await dynamoDb.update(updatePackageParams);
    return Attributes;
  } catch (error) {
    console.log(`Error happened updating DB:  ${error.message}`);
    console.log("update parameters tried: ", updatePackageParams);
    throw error;
  }
}
