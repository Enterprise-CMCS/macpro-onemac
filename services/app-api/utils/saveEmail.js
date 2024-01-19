import dynamoDb from "../libs/dynamodb-lib";

export const saveEmail = async (eventName, stateOrCMS, data) => {
  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      pk: data.componentId,
      sk: `Email#${stateOrCMS}#${eventName}#${data.eventTimestamp}`,
      ...data,
    },
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

  return putResponse;
};