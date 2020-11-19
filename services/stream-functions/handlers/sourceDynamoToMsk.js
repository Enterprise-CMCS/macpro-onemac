const { Kafka } = require('kafkajs');
const bootstrapBrokerStringTls = process.env.BOOTSTRAP_BROKER_STRING_TLS;

function myHandler(event, context, callback) {
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));

  const kafka = new Kafka({
    clientId: 'dynamodb',
    brokers: bootstrapBrokerStringTls.split(','),
    ssl: {
      rejectUnauthorized: false
    }
  });

  const producer = kafka.producer();

  const publish = async () => {
    await producer.connect();
    await producer.send({
      topic: 'amendments',
      messages: [
        {
          value: JSON.stringify(event, null, 2)
        }
      ]
    });
    await producer.disconnect();
  };

  publish();
}

exports.handler = myHandler;
