const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const topicPrefix = "aws.ksqldb.seatool.agg.StatePlan_";

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log("Received event:", JSON.stringify(event, null, 2));
  const topicName = event.topic.replace(topicPrefix, "");
  const value = event.value ? JSON.parse(event.value) : JSON.parse(event);
  console.log(`Type: ${topicName} Topic: ${event.topic}`);

  const pk = event.key.toUpperCase();
  const changedDate = value?.STATE_PLAN?.CHANGED_DATE || value.timestamp;
  if (!pk || !changedDate) return;

  // use the offset as a version number/event tracker... highest id is most recent
  const sk = `SEATool#${changedDate}`;

  const GSI1pk = `SEATool#${topicName}`;
  const GSI1sk = pk;

  // put the SEATool Entry - don't bother if already exists
  const updateSEAToolParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk,
      sk,
    },

    Item: { pk, sk, GSI1pk, GSI1sk, ...value },
    ReturnValues: "ALL_OLD", // ReturnValues for put can only be NONE or ALL_OLD
  };

  console.log("%s Params: ", pk, updateSEAToolParams);

  ddb.put(updateSEAToolParams, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Data: ", data);
    }
  });
}

exports.handler = myHandler;
