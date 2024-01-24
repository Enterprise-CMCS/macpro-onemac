import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const main = async (event, context, callback) => {
  console.log(
    "Received email event, stringified:",
    JSON.stringify(event, null, 4)
  );

  const message = JSON.parse(event.Records[0].Sns.Message);
  console.log("Message received from SNS:", message);

  // need to get the Key for the email from the message Id
  const queryParams = {
    TableName: oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk AND GSI1sk = :sk",
    ExpressionAttributeValues: {
      ":pk": "Email",
      ":sk": message.mail.messageId,
    },
  };
  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("results are: ", result);
    if (result?.Items.length != 1) {
      console.log(
        "The wrong number of Items came up for these params: ",
        queryParams
      );
      return;
    }
    console.log("message.eventType is: ", message.eventType);
    const eventItem = [
      {
        eventType: message.eventType,
        eventTimestamp: Date.now(),
        ...message[
          message.eventType[0].toLowerCase() + message.eventType.slice(1)
        ],
      },
    ];
    const updateParams = {
      TableName: oneMacTableName,
      Key: {
        pk: result.Items[0].pk,
        sk: result.Items[0].sk,
      },
      UpdateExpression:
        "SET eventList = list_append(:newEvent,if_not_exists(eventList,:emptyList)), GSI2pk = :eventType",
      ExpressionAttributeValues: {
        ":newEvent": eventItem,
        ":emptyList": [],
        ":eventType": message.eventType,
      },
    };
    console.log("Update Params: ", updateParams);
    await dynamoDb.update(updateParams).promise();
  } catch (error) {
    console.log("got Error: ", error);
  }
  callback(null, "Success");
};
