import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(updateData) {
  // get the latest version from current v0 Item
  var v0sk = "v0#" + updateData.packageID;
  var v0pk = updateData.packageID.toString().substring(0, 2);
  var oldVersion;
  var newVersion;
  var nextItem = {};

  var v0params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: v0pk,
      sk: v0sk,
    },
  };

  dynamoDb
    .get(v0params)
    .then((currentPackage) => {
      if (!currentPackage.Item) {
        throw new Error(
          `v0 Item does not exist for params: ${JSON.stringify(v0params)}`
        );
      }
      // copy the v0 into the v(currentVersion+1)
      console.log("Result.Item is : ", currentPackage.Item);

      oldVersion = parseInt(currentPackage.Item.currentVersion);
      newVersion = oldVersion + 1;

      nextItem = { ...currentPackage.Item };

      nextItem.sk = "v" + newVersion + "#" + currentPackage.Item.packageID;
      nextItem.GSI1pk = "PACKAGE#v" + newVersion;
      nextItem.GSI1sk =
        currentPackage.Item.timestamp + "#" + currentPackage.Item.packageID;

      var vnextparams = {
        TableName: process.env.oneMacTableName,
        Item: nextItem,
      };
      console.log("vnextParams is: ", vnextparams);

      return dynamoDb.put(vnextparams);
    })
    .then((vnextresult) => {
      console.log("Put result is: ", vnextresult);

      let updateExp = "SET #currentVersion = :newVersion";
      let expressionAttributeNames = {
        "#currentVersion": "currentVersion",
      };
      let expressionAttributeValues = {
        ":newVersion": newVersion.toString(),
        ":currentVersion": oldVersion.toString(),
      };

      // go through and make our updates... if the attribute already exists, overwrite
      // if it does not, then add
      for (const [key, value] of Object.entries(updateData)) {
        if (key === "packageID") continue;
        updateExp += ",#" + key + " = :" + key;
        expressionAttributeNames["#" + key] = key.toString();
        expressionAttributeValues[":" + key] = value.toString();
      }

      console.log("update Expression: ", updateExp);

      let updateParams = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: v0pk,
          sk: v0sk,
        },
        ConditionExpression: "#currentVersion = :currentVersion",
        UpdateExpression: updateExp,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      };

      return dynamoDb.update(updateParams);
    })
    .then((updateResult) => {
      console.log("updateResult is: ", updateResult);
    })
    .catch((dbError) => {
      console.log(`Error happened while reading from DB:  ${dbError.message}`);
      throw dbError;
    });

  return;
}
