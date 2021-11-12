const AWS = require('aws-sdk');
const { ChangeRequest } = require("cmscommonlib");

AWS.config.update({region: 'us-east-1'});
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const SEATOOL_PLAN_TYPE = {
  CHIP_SPA: "124",
  SPA: "125",
  WAIVER: "122",
  WAIVER_APP_K: "123",
};

const SEATOOL_STATUS = {
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
  [SEATOOL_STATUS.PENDING]: "Package In Review",
  [SEATOOL_STATUS.PENDING_RAI]: "RAI Issued",
  [SEATOOL_STATUS.PENDING_OFF_THE_CLOCK]: "Review Paused, Off the Clock",
  [SEATOOL_STATUS.APPROVED]: "Package Approved",
  [SEATOOL_STATUS.DISAPPROVED]: "Package Disapproved",
  [SEATOOL_STATUS.WITHDRAWN]: "Package Withdrawn",
  [SEATOOL_STATUS.TERMINATED]: "Waiver Terminated",
  [SEATOOL_STATUS.PENDING_CONCURRANCE]: "Package In Review",
  [SEATOOL_STATUS.UNSUBMITTED]: "Unsubmitted",
  [SEATOOL_STATUS.PENDING_FINANCE]: "Package In Review",
  [SEATOOL_STATUS.PENDING_APPROVAL]: "Package In Review",
};

const SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS = {
  [SEATOOL_PLAN_TYPE.CHIP_SPA]: ChangeRequest.TYPE.CHIP_SPA,
  [SEATOOL_PLAN_TYPE.SPA]: ChangeRequest.TYPE.SPA,
  [SEATOOL_PLAN_TYPE.WAIVER]: ChangeRequest.TYPE.WAIVER_BASE,
  [SEATOOL_PLAN_TYPE.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
};

const topLevelUpdates = [
  "clockEndTimestamp",
  "expirationTimestamp",
  "currentStatus",
];

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  const value = JSON.parse(event.value);
  const receivedTimestamp = event.timestamp;
  console.log(`Event value: ${JSON.stringify(value, null, 2)}`);

  const SEAToolId = value.payload.ID_Number;
  if (!SEAToolId) return;

  let packageStatusID = "unknown";
  if (value.payload.SPW_Status_ID) packageStatusID = value.payload.SPW_Status_ID.toString();
  else return;  // PROD data has no SEA Tool items without a status

  if (!value?.payload?.Plan_Type)  return;
  const planTypeList = ["122", "123", "124", "125"];
  const planType = planTypeList.find( (pt) => (pt === value.payload.Plan_Type.toString()));
  if (!planType) return;

  let stateCode;
  if (value.payload.State_Code) {
    stateCode = value.payload.State_Code.toString();
  } else stateCode = SEAToolId.substring(0,2);

  let oneMACStatus = `SEATool Status: ${packageStatusID}`;
  if (SEATOOL_TO_ONEMAC_STATUS[packageStatusID]) 
    oneMACStatus = SEATOOL_TO_ONEMAC_STATUS[packageStatusID];

  const idInfo = ChangeRequest.decodeId(SEAToolId, planType);

  const SEAToolData = {
    'packageStatus': packageStatusID,
    'currentStatus': oneMACStatus,
    'stateCode': stateCode,
    'planType': planType,
    'packageType': SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS[planType],
    'packageId': idInfo.packageId,
    'componentId': idInfo.componentId,
    'componentType': idInfo.componentType,
    'clockEndTimestamp': value.payload.Alert_90_Days_Date,
    'expirationTimestamp': value.payload.End_Date,
    'updateReceived': receivedTimestamp,
  };
  if (SEAToolId != undefined) {

    // update the SEATool Entry
    const updateSEAToolParams = {
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
        console.log("Update Success, data is: ", data);
        console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);

        // if the SEATool entry is new, do we need to add Paper IDs??
        if (data.Attributes.changeHistory.length === 1) {
          console.log("that was a new package from SEATool");
        } else {
          console.log("We have seen that package before!");
        }
      }
    });

    // update OneMAC Component
    const updatePk = SEAToolData.componentId;
    const updateSk = SEAToolData.packageType;
    const updatePackageParams = {
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

    topLevelUpdates.forEach((attributeName) => {
      if (SEAToolData[attributeName]) {
        const newLabel = `:new${attributeName}`;
        updatePackageParams.ExpressionAttributeValues[newLabel] =
        SEAToolData[attributeName];
        if (Array.isArray(SEAToolData[attributeName]))
          updatePackageParams.UpdateExpression += `, ${attributeName} = list_append(if_not_exists(${attributeName},:emptyList), ${newLabel})`;
        else
          updatePackageParams.UpdateExpression += `, ${attributeName} = ${newLabel}`;
      }
    });
  
    ddb.update(updatePackageParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Update Success!  Returned data is: ", data);
        console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);
    }});

  }
}

exports.handler = myHandler;
