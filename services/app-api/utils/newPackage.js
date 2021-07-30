import dynamoDb from "../libs/dynamodb-lib";

export default async function newPackage(data) {
  var onedata = {
    pk: data.territory,
  };
  onedata.timestamp = data.submittedAt;
  onedata.packageID = data.transmittalNumber;
  onedata.type = data.type;
  onedata.oneMacPackageStatus = "Pending";
  onedata.territory = data.territory;
  onedata.submitterName = data.user.firstName + " " + data.user.family_name;
  onedata.submitterEmail = data.user.email;
  onedata.sk = "v0#" + data.transmittalNumber;
  onedata.currentVersion = "0";
  onedata.GSI1pk = "PACKAGE#v" + onedata.currentVersion;
  onedata.GSI1sk = onedata.timestamp + "#" + onedata.packageID;
  onedata.clockEnd = data.ninetyDayClockEnd;
  onedata.additionalInformation = data.summary;
  onedata.uploads = data.uploads;
  var oneparams = {
    TableName: process.env.oneMacTableName,
    Item: onedata,
  };
  console.log("TableName is: ", process.env.oneMacTableName);
  console.log("oneParams is: ", oneparams);
  try {
    await dynamoDb.put(oneparams);
  } catch (error) {
    throw error;
  }
  return;
}
