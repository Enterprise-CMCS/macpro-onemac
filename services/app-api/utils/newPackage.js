import dynamoDb from "../libs/dynamodb-lib";

export default async function newPackage(data) {
  data.pk = data.territory;
  data.sk = "v0#" + data.packageID;
  data.currentVersion = "0";
  data.GSI1pk = "PACKAGE#v" + data.currentVersion;
  data.GSI1sk = data.timestamp + "#" + data.packageID;

  var oneparams = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("oneParams is: ", oneparams);
  try {
    await dynamoDb.put(oneparams);
  } catch (error) {
    throw error;
  }
  return;
}
