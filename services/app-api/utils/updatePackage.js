import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(data) {
  // get the latest version from current v0 Item
  var v0Item = "v0#" + data.transmittalNumber;
  var v0params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: data.territory,
      sk: v0Item,
    },
  };

  let result;
  try {
    result = await dynamoDb.get(v0params);
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError.message}`);
    throw dbError;
  }

  if (!result.Item) {
    throw new Error(
      `v0 Item does not exist for params: ${JSON.stringify(v0params)}`
    );
  }

  // copy the v0 into the v(currentVersion+1)
  console.log("Result.Item is : ", result.Item);

  let latestVersion = result.Item.currentVersion;
  let higherVersion = latestVersion + 1;
  let newSK = "v" + higherVersion + "#" + result.Item.transmittalNumber;

  //     dynamodb.transact_write_items(

  /*
  var onedata = {
    pk: data.territory,
  };
  onedata.sk = "v0#" + data.transmittalNumber;
  onedata.currentVersion = "0";
  onedata.packageID = data.transmittalNumber;
  onedata.type = data.type;
  onedata.oneMacPackageStatus = "Pending";
  onedata.territory = data.territory;
  onedata.submitterName = data.user.firstName + " " + data.user.family_name;
  onedata.submitterEmail = data.user.email;
  onedata.timestamp = data.submittedAt;
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
  } */
  return;
}
