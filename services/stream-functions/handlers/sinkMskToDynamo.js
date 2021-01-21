var AWS = require('aws-sdk');

function myHandler(event, context, callback) {
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  var value = JSON.parse(event.value);
  console.log(`Event value: ${JSON.stringify(value, null, 2)}`);
  var id = value.payload.ID_Number;
  var packageStatusID = value.payload.SPW_Status_ID;
  console.log(`State Plan ID Number: ${id}`);
  console.log(process.env.spaIdTableName);
  if (id != undefined) {
    AWS.config.update({region: 'us-east-1'});
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var params = {
      TableName: process.env.spaIdTableName,
      Item: {
        'id' : {S: id},
        'cmsStatusID': {N: packageStatusID}
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

exports.handler = myHandler;
