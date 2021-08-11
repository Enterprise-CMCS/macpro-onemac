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
  var payload = value.payload.toString();
  var planType = '0';
  if (value.payload.Plan_Type) {
    planType = value.payload.Plan_Type.toString();
  }
  var stateCode = 'MI';
  if (value.payload.State_Code) {
    stateCode = value.payload.State_Code.toString();
  }
  var sk = "SEATOOL";
  console.log(process.env.oneMacTableName);
  if (id != undefined) {
    AWS.config.update({region: 'us-east-1'});
    var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

    var params = {
      TableName: process.env.oneMacTableName,
      Item: {
        'pk': id,
        'sk': sk,
        'changeHistory' : [ {
          'packageStatus': packageStatusID,
          'stateCode': stateCode,
          'planType': planType,
          'packageID': id,
          'payload': payload,
        }],
      }
    };
    ddb.put(params, function(err, data) {
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
