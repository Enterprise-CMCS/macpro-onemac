import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(data) {
  // get the latest version from current v0 Item
  var v0sk = "v0#" + data.transmittalNumber;
  var v0params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: data.territory,
      sk: v0sk,
    },
  };

  let currentPackage;
  try {
    currentPackage = await dynamoDb.get(v0params);
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError.message}`);
    throw dbError;
  }

  if (!currentPackage.Item) {
    throw new Error(
      `v0 Item does not exist for params: ${JSON.stringify(v0params)}`
    );
  }

  // copy the v0 into the v(currentVersion+1)
  console.log("Result.Item is : ", currentPackage.Item);

  let nextItem = { ...currentPackage.Item };
  let updateItem = { ...currentPackage.Item };

  nextItem.currentVersion = currentPackage.Item.currentVersion + 1;
  updateItem.currentVersion = currentPackage.Item.currentVersion + 1;
  nextItem.sk =
    "v" + nextItem.currentVersion + "#" + currentPackage.Item.transmittalNumber;
  var transParams = {
    TransactItems: [
      {
        Put: {
          TableName: process.env.oneMacTableName,
          Item: nextItem,
        },
      },
      {
        Update: {
          TableName: process.env.oneMacTableName,
          Key: {
            pk: data.territory,
            sk: v0sk,
          },
          UpdateExpression: "SET currentVersion = :newVersion, #time = :time",
          ExpressionAttributeNames: {
            "#time": "timestamp",
          },
          ExpressionAttributeValues: {
            ":time": Date.now(),
            ":newVersion": updateItem.currentVersion,
          },
        },
      },
    ],
  };

  //     dynamodb.transact_write_items(
  try {
    let transResult = await dynamoDb.transactWriteItems(transParams);
    console.log(`transaction write result:  ${transResult}`);
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError.message}`);
    throw dbError;
  }

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
