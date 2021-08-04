import dynamoDb from "../libs/dynamodb-lib";

export default async function newPackage(data) {
  data.pk = data.territory;
  data.sk = "v0#" + data.packageID;
  data.currentVersion = "0";
  data.GSI1pk = "PACKAGE";
  data.GSI1sk = data.timestamp;

  var v0params = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("oneParams is: ", v0params);
  try {
    await dynamoDb.put(v0params);
  } catch (error) {
    throw error;
  }
}
