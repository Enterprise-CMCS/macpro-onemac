import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const main = async (event, context, callback) => {
  console.log("Received event (stringified):", JSON.stringify(event, null, 4));

  // get emails in certain statuses
  const queryParams = {
    TableName: oneMacTableName,
    IndexName: "GSI2",
    KeyConditionExpression: "GSI2pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "Send",
    },
  };
  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("results are: ", result);
    if (result?.Items.length === 0) {
      console.log("No Emails to Process: ", queryParams);
      return;
    }

    // console.log("message.eventType is: ", message.eventType);
    // const eventItem = [
    //   {
    //     eventType: message.eventType,
    //     eventTimestamp: Date.now(),
    //     ...message[
    //       message.eventType[0].toLowerCase() + message.eventType.slice(1)
    //     ],
    //   },
    // ];
    // const updateParams = {
    //   TableName: oneMacTableName,
    //   Key: {
    //     pk: result.Items[0].pk,
    //     sk: result.Items[0].sk,
    //   },
    //   UpdateExpression:
    //     "SET eventList = list_append(:newEvent,if_not_exists(eventList,:emptyList)), GSI2pk = :eventType",
    //   ExpressionAttributeValues: {
    //     ":newEvent": eventItem,
    //     ":emptyList": [],
    //     ":eventType": message.eventType,
    //   },
    // };
    // console.log("Update Params: ", updateParams);
    // await dynamoDb.update(updateParams).promise();
  } catch (error) {
    console.log("got Error: ", error);
  }
  callback(null, "Success");
};
