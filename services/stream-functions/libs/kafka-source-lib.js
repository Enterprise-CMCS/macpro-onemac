import AWS from "aws-sdk";
const { Kafka } = require("kafkajs");

const STAGE = process.env.STAGE;
let CLIENT_ID_PREFIX = 'seds';
if (process.env.CLIENT_ID_PREFIX)
  CLIENT_ID_PREFIX = process.env.CLIENT_ID_PREFIX;

const kafka = new Kafka({
  clientId: `${CLIENT_ID_PREFIX}-${STAGE}`,
  brokers: process.env.BOOTSTRAP_BROKER_STRING_TLS.split(","),
  retry: {
    initialRetryTime: 300,
    retries: 8,
  },
  ssl: {
    rejectUnauthorized: false,
  },
});

const producer = kafka.producer();
let connected = false;
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2", "beforeExit"];

signalTraps.map((type) => {
  process.removeListener(type, producer.disconnect);
});

signalTraps.map((type) => {
  process.once(type, producer.disconnect);
});

class KafkaSourceLib {
  /*
  Event types:
  cmd – command; restful publish
  cdc – change data capture; record upsert/delete in data store
  sys – system event; send email, archive logs
  fct – fact; user activity, notifications, logs

  topicPrefix = "[data_center].[system_of_record].[business_domain].[event_type]";
  version = "some version";
  tables = [list of tables];
  */

  unmarshallOptions = {
    convertEmptyValues: true,
    wrapNumbers: true,
  };

  stringify(e, prettyPrint) {
    if (prettyPrint === true) return JSON.stringify(e, null, 2);
    return JSON.stringify(e);
  }

  determineTopicName(record) {
    const streamARN = String(record.eventSourceARN.toString());
    for (const table of this.tables) {
      if (streamARN.includes(`/${STAGE}-${table}/`)) return this.topic(table);
    }
  }

  unmarshall(r) {
    return AWS.DynamoDB.Converter.unmarshall(r, this.unmarshallOptions);
  }

  createPayload(record) {
    return this.createDynamoPayload(record);
  }

  createDynamoPayload(record) {
    const dynamodb = record.dynamodb;
    const { eventID, eventName } = record;
    const dynamoRecord = {
      NewImage: this.unmarshall(dynamodb.NewImage),
      OldImage: this.unmarshall(dynamodb.OldImage),
      Keys: this.unmarshall(dynamodb.Keys),
    };
    return {
      key: Object.values(dynamoRecord.Keys).join("#"),
      value: this.stringify(dynamoRecord),
      partition: 0,
      headers: { eventID: eventID, eventName: eventName },
    };
  }

  topic(t) {
    if(this.version) {
      return `${this.topicPrefix}.${t}.${this.version}`;
    } else {
      return `${this.topicPrefix}.${t}`;
    }
  }

  shouldPayloadBeSent(record) {
    if (record) return true;
    else return false;
  }

  createOutboundEvents(records) {
    const outboundEvents = {};
    for (const record of records) {
      const dynamoPayload = this.createPayload(record);
      const topicName = this.determineTopicName(dynamoPayload);

      if (topicName) {
        //initialize configuration object keyed to topic for quick lookup
        if (!(outboundEvents[topicName] instanceof Object))
          outboundEvents[topicName] = {
            topic: topicName,
            messages: [],
          };

        //add messages to messages array for corresponding topic
        outboundEvents[topicName].messages.push(dynamoPayload);
      }
    }
    return outboundEvents;
  }

  async handler(event) {
    if (!connected) {
      await producer.connect();
      connected = true;
    }
    console.log("Raw event", this.stringify(event, true));

    if (event.Records) {
      const outboundEvents = this.createOutboundEvents(event.Records);
      console.log("outboundEvents are: ", outboundEvents);
      const topicMessages = Object.values(outboundEvents);
      if (topicMessages.length > 0 ) {
        console.log(`Batch configuration: ${this.stringify(topicMessages, true)}`);
        await producer.sendBatch({
          topicMessages
        });
        console.log(`Successfully processed ${topicMessages.length} records.`);
      }
    }
  }
}

export default KafkaSourceLib;
