const { Kafka } = require('kafkajs');

const { ChangeRequest } = require("cmscommonlib");

const bootstrapBrokerStringTls = process.env.BOOTSTRAP_BROKER_STRING_TLS;
const STAGE = process.env.STAGE;
const ONEMAC_TOPIC = 'aws.submission_portal.submissions.cdc.submission';

const ONEMAC_SUBMISSION_TYPE = {
  [ChangeRequest.TYPE.SPA]: 125,
  [ChangeRequest.TYPE.WAIVER]: 122,
  [ChangeRequest.TYPE.CHIP_SPA]: 124,
};

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
  const toSend = {
    topic: ONEMAC_TOPIC,
    messages: onemacActions,
  };
  try {
  console.log("toSend: ", toSend);
  await producer.connect();
  const sendResult = await producer.send(toSend);
  console.log("Send result: ", sendResult);
  await producer.disconnect();
  } catch(error) {
    console.log("Got an error in publish: ", error);
  }
};

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));

// a double-bind on keeping this from writing in Production
  if (STAGE === 'production') {
    console.log(`Branch: ${STAGE} does not have this enabled!`);
    return null;
  } 

  const onemacActions = [];

  event.Records.forEach( (dbAction) => {
    if (dbAction.eventName === "INSERT") {
      const oneMACSubmission = dbAction.dynamodb.NewImage;
      if (oneMACSubmission.sk === "SEATool")
        console.log("that submission came from SEA Tool, don't send back: ", oneMACSubmission);
      else {
        console.log("New oneMAC Record inserted?? ", JSON.stringify(oneMACSubmission, null, 2));
/*        const toPublish = {
          PackageID: oneMACSubmission.pk,
          SubmitterName: oneMACSubmission.submitterName,
          SubmitterEmail: oneMACSubmission.submitterEmail,
          PackageType: ONEMAC_SUBMISSION_TYPE[oneMACSubmission.componentType],
        }  */
        dbAction.dynamodb.NewImage.plan_type = ONEMAC_SUBMISSION_TYPE[oneMACSubmission.componentType];
        onemacActions.push(dbAction);
      }
    }
  });

  publish(onemacActions);
}

exports.handler = myHandler;
