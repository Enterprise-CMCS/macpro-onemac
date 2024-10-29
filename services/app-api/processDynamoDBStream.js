import AWS from "aws-sdk";

const eventBridge = new AWS.EventBridge();

export const main = async (event) => {
  const entries = event.Records.map((record) => {
    return {
      Source: "aws.dynamodb",
      DetailType: "DynamoDB Stream Record",
      Detail: JSON.stringify(record),
      EventBusName: process.env.EVENT_BUS_NAME,
    };
  });

  try {
    await eventBridge.putEvents({ Entries: entries }).promise();
    console.log(`Successfully sent ${entries.length} events to EventBridge.`);
  } catch (error) {
    console.error("Failed to send events:", error);
    throw error;
  }
};
