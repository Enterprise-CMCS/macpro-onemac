import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(updateData) {
  const updatePk = updateData.packageId;
  const updateSk = "PACKAGE";
  /*  var getPackageParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: updatePk,
      sk: updateSk,
    },
  };
  dynamoDb
    .get(getPackageParams)
    .then((result) => {
      if (!result.Item) {
        throw new Error(`ItemNotFound`);
      }
*/
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

  dynamoDb.update(updatePackageParams).catch((error) => {
    console.log(`Error happened updating DB:  ${error.message}`);
    console.log("update parameters tried: ", updatePackageParams);
    throw error;
  });

  return "Success - updatePackage";
}
