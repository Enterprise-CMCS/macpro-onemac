import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";
import { update } from "lodash";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

console.log("Loading processEmailEvents");

const createEmailEvent = (inEvent) => {};

export const main = async (event, context, callback) => {
  console.log("Received email event:", JSON.stringify(event, null, 4));

  var message = event.Records[0].Sns.Message;
  console.log("Message received from SNS:", message);

  // need to get the Key for the email from the message Id
  const queryParams = {
    TableName: oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    ExpressionAttributeValues: {
      ":pk": message.mail.messageId,
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
          event[event.eventType[0].toLowerCase() + event.eventType.slice(1)],
      },
    };
    console.log("Update Params: ", updateParams);
    await dynamoDb.update(updateParams).promise();
  } catch (error) {
    console.log("got Error: ", error);
  }
  callback(null, "Success");
};
