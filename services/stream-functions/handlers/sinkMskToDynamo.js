var AWS = require('aws-sdk');

function myHandler(event, context, callback) {
  console.log('Received event:', JSON.stringify(event, null, 2));
  if (event.topic == "amendments") {
    console.log("Event from amendments... this is probably for dev and debug... doing nothing");
  } else {
    var value = JSON.parse(event.value);
    console.log(`Event value: ${JSON.stringify(value, null, 2)}`);
    var id = value.payload.ID_Number;
    console.log(`State Plan ID Number: ${id}`);
    console.log(process.env.spaIdTableName);
    if (id != undefined) {
      AWS.config.update({region: 'us-east-1'});
      var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
      var params = {
        TableName: process.env.spaIdTableName,
        Item: {
          'id' : {S: id}
        }
      };
      ddb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
          console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);
        }
      });
    }
  }
}

exports.handler = myHandler;
