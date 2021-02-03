const { Kafka } = require('kafkajs');
const bootstrapBrokerStringTls = process.env.BOOTSTRAP_BROKER_STRING_TLS;
// const shouldWriteSourceToMsk = process.env.SHOULD_WRITE_SOURCE_TO_MSK;
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
      'submitted': 'Pending',
      'created': 'Pending'
    }
  }
};

function mapFields(event, callback) {
  const path = 'dynamodb.NewImage';
  _.each(_.get(event, 'Records'), function(v, index) {
    _.each(mappings, function(value, key) {
      const stream_entry = _.get(event, `Records[${index}].${path}.${key}`);
      const mapped_item = _.get(value, `mapping.${stream_entry}`);
      _.isEmpty(mapped_item) && callback(new Error(`Field "${key}" ${stream_entry} does not map to a valid field in SEATool`));
      _.set(event, `Records[${index}].${path}.${_.get(value, 'name')}`, mapped_item);
    });
  });
  return event;
}

function myHandler(event, context, callback) {
  /* if (Boolean(shouldWriteSourceToMsk) === false) {
    console.log("This message should appear if writing to BigMAC is disabled.");
    return null;
  }

  console.log("This message should NOT appear if BigMAC writing is disabled.");
 */
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
      topic: 'aws.submission_portal.submissions.cdc.submission',
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
