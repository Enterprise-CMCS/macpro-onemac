var AWS = require('aws-sdk');

function myHandler(event, context, callback) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  var value = JSON.parse(event.value);
  console.log(`Event value: ${JSON.stringify(value, null, 2)}`);

  var SEAToolId = value.payload.ID_Number;

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
  var SEAToolData = {
    'packageStatus': packageStatusID,
    'stateCode': stateCode,
    'planType': planType,
    'packageID': SEAToolId,
    'clockEndTimestamp': value.payload.Alert_90_Days_Date,
    'payload': payload,
  };
  if (SEAToolId != undefined) {
    AWS.config.update({region: 'us-east-1'});
    var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

    // update the SEATool Entry
    var updateSEAToolParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: SEAToolId,
        sk: "SEATool",
      },
      UpdateExpression:
        "SET changeHistory = list_append(:newChange, changeHistory)",
      ExpressionAttributeValues: {
        ":newChange": [SEAToolData],
      },
      ReturnValues: "UPDATED_NEW",
    };

    ddb.update(updateSEAToolParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);

        // if the SEATool entry is new, do we need to add Paper IDs??

      }
    });
/*
    // check if the SEATool updates should be reflected in OneMAC
    const SEATOOL_TO_ONEMAC_STATUS = {
      [SEATOOL.PENDING]: "Package In Review",
      [SEATOOL.PENDING_RAI]: "RAI Issued",
      [SEATOOL.PENDING_OFF_THE_CLOCK]: "Response to RAI In Review",
      [SEATOOL.APPROVED]: "Package Approved",
      [SEATOOL.DISAPPROVED]: "Package Disapproved",
      [SEATOOL.WITHDRAWN]: "Package Withdrawn",
      [SEATOOL.TERMINATED]: "Amendmend Terminated",
      [SEATOOL.PENDING_CONCURRANCE]: "Package In Review",
      [SEATOOL.UNSUBMITTED]: "Draft",
      [SEATOOL.PENDING_FINANCE]: "Package In Review",
      [SEATOOL.PENDING_APPROVAL]: "Package In Review",
    }
    // if so, update OneMAC Package Item
*/
  }
}

exports.handler = myHandler;
