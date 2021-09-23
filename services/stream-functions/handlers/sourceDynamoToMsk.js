const { Kafka } = require('kafkajs');
const bootstrapBrokerStringTls = process.env.BOOTSTRAP_BROKER_STRING_TLS;
const STAGE = process.env.STAGE;
const ONEMAC_TOPIC = 'aws.submission_portal.submissions.cdc.submission';

const kafka = new Kafka({
  clientId: `onemac-${STAGE}`,
  brokers: bootstrapBrokerStringTls.split(","),
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

const publish = async (onemacActions) => {
  await producer.connect();
  await producer.send({
    topic: ONEMAC_TOPIC,
    messages: onemacActions,
  });
  await producer.disconnect();
};

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  
  console.log('Received event:', JSON.stringify(event, null, 2));

  const onemacActions = [];

  event.Records.forEach( (dbAction) => {
    if (dbAction.eventName === "INSERT") {
      if (dbAction.dynamodb.NewImage.sk === "SEATool")
        console.log("that submission came from SEA Tool, don't send back: ", dbAction.dynamodb.NewImage);
      else {
        console.log("New oneMAC Record inserted?? ", JSON.stringify(dbAction.dynamodb.NewImage, null, 2));
        onemacActions.push({value: JSON.stringify(dbAction.dynamodb.NewImage, null, 2)});
      }
    }
  });

  publish(onemacActions);
}

exports.handler = myHandler;
