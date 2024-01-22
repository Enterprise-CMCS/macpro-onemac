import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";
import { update } from "lodash";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

console.log("Loading processEmailEvents");

export const main = async (event, context, callback) => {
  console.log("Received email event:", JSON.stringify(event, null, 4));

  const message = { ...event.Records[0].Sns.Message };
  const messageId = event.Records[0].Sns.MessageId;
  console.log("Message received from SNS:", message);
  console.log("MessageId received from SNS is:", messageId);

  // need to get the Key for the email from the message Id
  const queryParams = {
    TableName: oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    ExpressionAttributeValues: {
      ":pk": messageId,
    },
  };
  try {
    console.log("queryParams: ", queryParams);
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
    const updateParams = {
      TableName: oneMacTableName,
      Key: {
        pk: emailItem.pk,
        sk: emailItem.sk,
      },
      UpdateExpression:
        "SET eventList = list_append(:newEvent,if_not_exists(eventList,:emptyList))",
      ExpressionAttributeValues: {
        ":newEvent":
          message[
            message.eventType[0].toLowerCase() + message.eventType.slice(1)
          ],
      },
    };
    console.log("Update Params: ", updateParams);
    await dynamoDb.update(updateParams).promise();
  } catch (error) {
    console.log("got Error: ", error);
  }
  callback(null, "Success");
};
