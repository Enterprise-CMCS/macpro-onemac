import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(updateData) {
  var getPackageParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: updateData.packageID,
      sk: "PACKAGE",
    },
  };

  dynamoDb
    .get(getPackageParams)
    .then((result) => {
      if (!result.Item) {
        throw new Error(`ItemNotFound`);
      }
      console.log("item is: ", result.Item);
      result.Item.changeHistory.unshift(updateData);
      console.log("item with new changeHistory is: ", result.Item);

      var putPackageParams = {
        TableName: process.env.oneMacTableName,
        Item: { ...result.Item },
      };

      return dynamoDb.put(putPackageParams);
    })
    .catch((error) => {
      console.log(`Error happened while reading from DB:  ${error.message}`);
      throw error;
    });

  return "Success - updatePackage";
}
