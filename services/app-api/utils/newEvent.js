import dynamoDb from "../libs/dynamodb-lib";

export const newEvent = async (eventName, data) => {
  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      pk: data.componentId,
      sk: `OneMAC#${data.submissionTimestamp}`,
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
  return await dynamoDb.put(putParams);
};
