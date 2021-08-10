import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(updateData) {
  let updatePk = updateData.packageId;
  let updateSk = "PACKAGE";
  var getPackageParams = {
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

      var updatePackageParams = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: updatePk,
          sk: updateSk,
        },
        UpdateExpression:
          "SET changeHistory = list_append(:newChange, changeHistory)",
        ExpressionAttributeValues: {
          ":newChange": [updateData],
        },
      };

      // only update clock if new Clock is sent
      if (updateData.clockEndTimestamp) {
        updatePackageParams.ExpressionAttributeValues[":newClockEnd"] =
          updateData.currentClockEnd;
        updatePackageParams.UpdateExpression.concat(
          ", currentClockEnd = :newClockEnd"
        );
      }

      // only update status if new Status is sent
      if (updateData.clockEndTimestamp) {
        updatePackageParams.ExpressionAttributeValues[":newStatus"] =
          updateData.packageStatus;
        updatePackageParams.UpdateExpression.concat(
          ",currentStatus = :newStatus"
        );
      }

      return dynamoDb.update(updatePackageParams); // need to use update for concurrency
    })
    .catch((error) => {
      console.log(`Error happened while reading from DB:  ${error.message}`);
      throw error;
    });

  return "Success - updatePackage";
}
