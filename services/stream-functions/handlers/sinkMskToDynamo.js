const AWS = require('aws-sdk');

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  const value = JSON.parse(event.value);
  console.log(`Event value: ${JSON.stringify(value, null, 2)}`);

  var SEAToolId = value.payload.ID_Number;

  var packageStatusID = "unknown";
  if (value.payload.SPW_Status_ID) packageStatusID = value.payload.SPW_Status_ID.toString();

  if (!value?.payload?.Plan_Type)  return;
  const planTypeList = ["122", "123", "124", "125"];
  var planType = planTypeList.find( (pt) => (pt === value.payload.Plan_Type.toString()));
  if (!planType) return;

  var stateCode = 'MI';
  if (value.payload.State_Code) {
    stateCode = value.payload.State_Code.toString();
  }
  var SEAToolData = {
    'packageStatus': packageStatusID,
    'stateCode': stateCode,
    'planType': planType,
    'packageId': SEAToolId,
    'clockEndTimestamp': value.payload.Alert_90_Days_Date,
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
      UpdateExpression: "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
      ExpressionAttributeValues: {
        ":newChange": [SEAToolData],
        ":emptyList": [],
      },
      ReturnValues: "UPDATED_NEW",
    };

    ddb.update(updateSEAToolParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", JSON.parse(data));
        console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);

        // if the SEATool entry is new, do we need to add Paper IDs??
        if (data.Attributes.changeHistory.length === 1) {
          console.log("that was a new package from SEATool");
        } else {
          console.log("We have seen that package before!");
        }
      }
    });

    const SEATOOL = {
      PENDING: "1",
      PENDING_RAI: "2",
      PENDING_OFF_THE_CLOCK: "3",
      APPROVED: "4",
      DISAPPROVED: "5",
      WITHDRAWN: "6",
      TERMINATED: "7",
      PENDING_CONCURRANCE: "8",
      UNSUBMITTED: "9",
      PENDING_FINANCE: "10",
      PENDING_APPROVAL: "11",
    };

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
    };
    // update OneMAC Package Item
    let updatePk = SEAToolData.packageId;
    let updateSk = "PACKAGE";
    var updatePackageParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: updatePk,
        sk: updateSk,
      },
      ConditionExpression: "pk = :pkVal AND sk = :skVal",
      UpdateExpression:
        "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
      ExpressionAttributeValues: {
        ":pkVal": updatePk,
        ":skVal": updateSk,
        ":newChange": [SEAToolData],
        ":emptyList": [],
      },
    };

    // only update clock if new Clock is sent
    if (SEAToolData.clockEndTimestamp) {
      updatePackageParams.ExpressionAttributeValues[":newClockEnd"] =
      SEAToolData.currentClockEnd;
      updatePackageParams.UpdateExpression.concat(
        ", currentClockEnd = :newClockEnd"
      );
    }

    // only update status if new Status is sent
    if (SEAToolData.packageStatus) {
      updatePackageParams.ExpressionAttributeValues[":newStatus"] =
      SEATOOL_TO_ONEMAC_STATUS[SEAToolData.packageStatus];
      updatePackageParams.UpdateExpression.concat(",currentStatus = :newStatus");
    }

    ddb.update(updatePackageParams, function(err) {
      console.log(`Error happened updating DB:  ${err.message}`);
    });

  }
}

exports.handler = myHandler;
