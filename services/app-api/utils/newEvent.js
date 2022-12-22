import dynamoDb from "../libs/dynamodb-lib";

export const newEvent = async (eventName, data) => {
  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      pk: data.componentId,
      sk: `OneMAC#${data.eventTimestamp}`,
      GSI1pk: `OneMAC#${eventName}`,
      GSI1sk: data.componentId,
      ...data,
    },
    ConditionExpression: "attribute_not_exists(pk)",
  };

  console.log(
    "params for %s: %s",
    eventName,
    JSON.stringify(putParams, null, 2)
  );
  let putResponse;

  try {
    putResponse = await dynamoDb.put(putParams);
  } catch (e) {
    console.log("%s put error: ", data.componentId, e);
  }

  // ugh.... there's got to be a better way... but for now, block on the package update...
  let packageUpdated = false;
  const checkParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: data.componentId,
      sk: `Package`,
    },
  };
  do {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const chkResponse = await dynamoDb.get(checkParams);
      packageUpdated =
        chkResponse?.Item?.lastEventTimestamp >= data.eventTimestamp;
    } catch (e) {
      console.log("%s check error:", data.componentId, e);
    }
  } while (!packageUpdated);

  return putResponse;
};
