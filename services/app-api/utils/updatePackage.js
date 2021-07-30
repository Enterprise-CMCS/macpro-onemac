import dynamoDb from "../libs/dynamodb-lib";

export default async function updatePackage(packageID, updates) {
  // get the latest version from current v0 Item
  var v0sk = "v0#" + packageID;
  var v0pk = packageID.toString().substring(0, 2);

  var v0params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: v0pk,
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

  let oldVersion = parseInt(currentPackage.Item.currentVersion);
  let newVersion = oldVersion + 1;

  let nextItem = { ...currentPackage.Item };
  let updateExp = "SET #currentVersion = :newVersion, #time = :time";
  let expressionAttributeNames = {
    "#time": "timestamp",
    "#currentVersion": "currentVersion",
  };
  let expressionAttributeValues = {
    ":time": Date.now(),
    ":newVersion": newVersion.toString(),
    ":currentVersion": oldVersion.toString(),
  };

  nextItem.currentVersion = newVersion;
  nextItem.sk = "v" + newVersion + "#" + currentPackage.Item.transmittalNumber;

  // go through and make our updates... if the attribute already exists, overwrite
  // if it does not, then add
  for (const [key, value] of Object.entries(updates)) {
    nextItem[key] = value;
    updateExp += ",#" + key + " = :" + key;
    expressionAttributeNames["#" + key] = key.toString();
    expressionAttributeValues[":" + key] = value.toString();
  }

  console.log("update Expression: ", updateExp);
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
            pk: v0pk,
            sk: v0sk,
          },
          ConditionExpression: "#currentVersion = :currentVersion",
          UpdateExpression: updateExp,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
        },
      },
    ],
  };

  console.log("trasaction params: ", JSON.stringify(transParams));

  try {
    let transResult = await dynamoDb.transactWriteItems(transParams);
    console.log(`transaction write result: `, transResult);
  } catch (dbError) {
    console.log(
      `Error happened while transact writing to DB:  ${dbError.message}`
    );
    throw dbError;
  }

  return;
}
