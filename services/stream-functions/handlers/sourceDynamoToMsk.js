const AWS = require('aws-sdk');

import { ChangeRequest } from "cmscommonlib";

let dbOptions = {};
if (process.env.IS_OFFLINE) {
  dbOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "DEFAULT_ACCESS_KEY", //Default key for local testing.
    secretAccessKey: "DEFAULT_SECRET", //Default secret for local testing.
  };
  console.log("Using database in localhost.");
} else {
  dbOptions = {apiVersion: '2012-08-10'};
}

const ddb = new AWS.DynamoDB.DocumentClient(dbOptions);

async function updateComponent({
  packageId: updatePk,
  ...updateData
}) {
  const changeData = {
    componentType: updateData.componentType,
    submitterName: updateData.submitterName,
    componentTimestamp: updateData.submissionTimestamp,
    componentId: updateData.componentId,
  };

  const updateComponentParams = {
    TableName: process.env.oneMACTableName,
    Key: {
      pk: updatePk,
      sk: updateData.parentType,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
    ExpressionAttributeValues: {
      ":pkVal": updatePk,
      ":skVal": updateData.parentType,
      ":newChange": [changeData],
      ":emptyList": [],
    },
    ReturnValues: "ALL_NEW",
  };

  // only update clock if new Clock is sent
  if (updateData.clockEndTimestamp) {
    updateComponentParams.ExpressionAttributeValues[":newClockEnd"] =
      updateData.clockEndTimestamp;
    updateComponentParams.UpdateExpression +=
      ", currentClockEnd = :newClockEnd";
  }

  // only update status if new Status is sent
  if (updateData.currentStatus) {
    updateComponentParams.ExpressionAttributeValues[":newStatus"] =
      updateData.currentStatus;
    updateComponentParams.UpdateExpression += ",currentStatus = :newStatus";
  }

  // up the number in the component count for this component
  if (updateData.componentType) {
    updateComponentParams.ExpressionAttributeNames = {
      "#componentTypeName": updateData.componentType,
    };
    updateComponentParams.ExpressionAttributeValues[":thiscomponent"] = [
      changeData,
    ];
    updateComponentParams.UpdateExpression +=
      ", #componentTypeName = list_append(if_not_exists(#componentTypeName,:emptyList), :thiscomponent)";
  }

  // add the attachments to the list of attachments for the package
  if (updateData.attachments) {
    updateComponentParams.ExpressionAttributeValues[":newAttachments"] =
      updateData.attachments;
    updateComponentParams.UpdateExpression +=
      ", attachments = list_append(if_not_exists(attachments,:emptyList), :newAttachments)";
  }

  console.log("Update params: ", updateComponentParams);
  try {
    const { Attributes } = await ddb.update(updateComponentParams);
    return Attributes;
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      console.log(
        `component is not (yet) a oneMAC component:  ${error.message}`
      );
    } else {
      console.log(`Error happened updating DB:  ${error.message}`);
      console.log("update parameters tried: ", updateComponentParams);
      throw error;
    }
  }
}

//const { Kafka } = require('kafkajs');
//const bootstrapBrokerStringTls = process.env.BOOTSTRAP_BROKER_STRING_TLS;
/* const _ = require('lodash');

const mappings = {
  'type.S': {
    'name': 'type_mapped.S',
    'mapping': {
      'spa': 'Medicaid SPA',
      'chipspa': 'Medicaid CHIP SPA',
      'waiver': '1915(b)',
      'waiverappk': '1915(c)',
      // 'sparai': 'Medicaid SPA'
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
*/
function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));

  event.Records.forEach( (dbAction) => {
    if (dbAction.eventName === "INSERT") {
      if (dbAction.dynamodb.NewImage.sk === "SEATool")
        console.log("that submission came from SEA Tool, don't send back: ", dbAction.dynamodb.NewImage);
      else 
        console.log("New oneMAC Record inserted?? ", JSON.stringify(dbAction.dynamodb.NewImage, null, 2));
      
        const idInfo = ChangeRequest.decodeId(
          dbAction.dynamodb.NewImage.componentId,
          dbAction.dynamodb.NewImage.componentType
        );
      dbAction.dynamodb.NewImage.parentType = idInfo.parentType;
      updateComponent(dbAction.dynamodb.NewImage).then( (result) => {
        console.log("Attributes returned are: ", result);
      });
    }
  });
  
 /* event = mapFields(event, callback);

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
*/
}

exports.handler = myHandler;
