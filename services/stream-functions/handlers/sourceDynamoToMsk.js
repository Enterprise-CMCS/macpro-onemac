const { Kafka } = require('kafkajs');
const bootstrapBrokerStringTls = process.env.BOOTSTRAP_BROKER_STRING_TLS;
const _ = require('lodash');

const mappings = {
  'type.S': {
    'name': 'type_mapped.S',
    'mapping': {
      'spa': 'Medicaid SPA',
      'sparai': 'Medicaid SPA'
    }
  },
  'state.S': {
    'name': 'status.S',
    'mapping': {
      'created': 'Pending'
    }
  }
};

function mapFields(event, callback) {
  const path = 'dynamodb.NewImage';
  _.each(mappings, function(value, key) {
    const stream_entry = _.get(event, `${path}.${key}`);
    const mapped_item = _.get(value, `mapping.${stream_entry}`);
    _.isEmpty(mapped_item) && callback(new Error(`Field "${key}" ${stream_entry} does not map to a valid field in SEATool`));
    _.set(event, `${path}.${_.get(value, 'name')}`, mapped_item);
  });
  return event;
}

function myHandler(event, context, callback) {
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  //map fields that don't directly correlate
  event = mapFields(event, callback);

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
