var AWS = require('aws-sdk');

function myHandler(event, context, callback) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  var value = JSON.parse(event.value);
  console.log(`Event value: ${JSON.stringify(value, null, 2)}`);
  var id = value.payload.ID_Number;
  var packageStatusID = "unknown";
  if (value.payload.SPW_Status_ID) packageStatusID = value.payload.SPW_Status_ID.toString();
  var payload = event.value.payload.toString();
  
  var planType = '0';
  if (value.payload.Plan_Type) {
    planType = value.payload.Plan_Type.toString();
  }
  console.log(process.env.oneTableName);
  if (id != undefined) {
    AWS.config.update({region: 'us-east-1'});
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var params = {
      TableName: process.env.oneTableName,
      Item: {
        'id' : {S: id},
        'cmsStatusID': {N: packageStatusID},
        'planType': {N: planType},
        'originalID': {S: id},
        'payload': {S: payload},
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

    // if this is an id type where we want better searching, do that now
    // 122 is 1915b and 123 is 1915c
    if (planType === 122 || planType === 123) {
      let sliceEnd = id.lastIndexOf('.');
      let smallerID = id.slice(0,sliceEnd); // one layer removed

      while ( smallerID.length > 2 ) {
        params = {
          TableName: process.env.spaIdTableName,
          Item: {
            'id' : {S: smallerID},
            'cmsStatusID': {N: packageStatusID},
            'planType': {N: planType},
            'originalID': {S: id},
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
        sliceEnd = smallerID.lastIndexOf('.');
        smallerID = smallerID.slice(0,sliceEnd); // one layer removed
      }
    }
  }
}

exports.handler = myHandler;
