import AWS from "aws-sdk";
const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: `${process.env.topic}-producer`,
  brokers: process.env.brokerString.split(","),
  retry: {
    initialRetryTime: 300,
    retries: 8,
  },
  ssl: {
    rejectUnauthorized: false,
  },
});
const producer = kafka.producer();
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2", "beforeExit"];
signalTraps.map((type) => {
  process.removeListener(type, producer.disconnect);
});
signalTraps.map((type) => {
  process.once(type, producer.disconnect);
});
let connected = false;

function unmarshall(r) {
  return AWS.DynamoDB.Converter.unmarshall(r, {
    convertEmptyValues: true,
    wrapNumbers: true,
  });
}

function isValid(r) {
  if (r.sk && r.sk.includes("SEATool")) {
    console.log("Junk record detected.");
    return false;
  } else {
    console.log("Valid record detected.");
    return true;
  }
}

exports.handler = async function (event) {
  const messages = [];
  for (const record of event.Records) {
    if (record.eventName != "REMOVE") {
      const r = unmarshall(record.dynamodb.NewImage);
      if (isValid(r)) {
        messages.push({
          key: r.pk,
          value: JSON.stringify(r),
          partition: 0,
          headers: { source: "onemac" },
        });
      }
    } else {
      const r = unmarshall(record.dynamodb.OldImage);
      if (isValid(r)) {
        messages.push({
          key: r.pk,
          value: null,
          partition: 0,
          headers: { source: "onemac" },
        });
      }
    }
  }
  if (messages.length > 0) {
    console.log(`Sending ${messages.length} messages to Kafka`);
    if (!connected) {
      await producer.connect();
      connected = true;
    }
    await producer.send({
      topic: process.env.topic,
      messages,
    });
  }
};
