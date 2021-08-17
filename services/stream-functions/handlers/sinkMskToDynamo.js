const AWS = require('aws-sdk');
const { ChangeRequest } = require("cmscommonlib");

const SEATOOL_PLAN_TYPE = {
  CHIP_SPA: "124",
  SPA: "125",
  WAIVER: "122",
  WAIVER_APP_K: "123",
};

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  const value = JSON.parse(event.value);
  console.log(`Event value: ${JSON.stringify(value, null, 2)}`);

  const SEAToolId = value.payload.ID_Number;

  let packageStatusID = "unknown";
  if (value.payload.SPW_Status_ID) packageStatusID = value.payload.SPW_Status_ID.toString();

  if (!value?.payload?.Plan_Type)  return;
  const planTypeList = ["122", "123", "124", "125"];
  const planType = planTypeList.find( (pt) => (pt === value.payload.Plan_Type.toString()));
  if (!planType) return;

  let stateCode = 'MI';
  if (value.payload.State_Code) {
    stateCode = value.payload.State_Code.toString();
  }
  const SEAToolData = {
    'packageStatus': packageStatusID,
    'stateCode': stateCode,
    'planType': planType,
    'packageId': SEAToolId,
    'clockEndTimestamp': value.payload.Alert_90_Days_Date,
  };
  if (SEAToolId != undefined) {
    AWS.config.update({region: 'us-east-1'});
    const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

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

    const SEATOOL_STATUS = {
      PENDING: "Pending",
      PENDING_RAI: "Pending-RAI",
      PENDING_OFF_THE_CLOCK: "Pending-Off the Clock",
      APPROVED: "Approved",
      DISAPPROVED: "Disapproved",
      WITHDRAWN: "Withdrawn",
      TERMINATED: "Terminated",
      PENDING_CONCURRANCE: "Pending-Concurrence",
      UNSUBMITTED: "Unsubmitted",
      PENDING_FINANCE: "Pending-Finance",
      PENDING_APPROVAL: "Pending-Approval",
    };

    // check if the SEATool updates should be reflected in OneMAC
    const SEATOOL_TO_ONEMAC_STATUS = {
      [SEATOOL_STATUS.PENDING]: "Package In Review",
      [SEATOOL_STATUS.PENDING_RAI]: "RAI Issued",
      [SEATOOL_STATUS.PENDING_OFF_THE_CLOCK]: "Response to RAI In Review",
      [SEATOOL_STATUS.APPROVED]: "Package Approved",
      [SEATOOL_STATUS.DISAPPROVED]: "Package Disapproved",
      [SEATOOL_STATUS.WITHDRAWN]: "Package Withdrawn",
      [SEATOOL_STATUS.TERMINATED]: "Amendmend Terminated",
      [SEATOOL_STATUS.PENDING_CONCURRANCE]: "Package In Review",
      [SEATOOL_STATUS.UNSUBMITTED]: "Draft",
      [SEATOOL_STATUS.PENDING_FINANCE]: "Package In Review",
      [SEATOOL_STATUS.PENDING_APPROVAL]: "Package In Review",
    };

    const SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS = {
      [SEATOOL_PLAN_TYPE.CHIP_SPA]: ChangeRequest.TYPE.CHIP_SPA,
      [SEATOOL_PLAN_TYPE.SPA]: ChangeRequest.TYPE.SPA,
      [SEATOOL_PLAN_TYPE.WAIVER]: ChangeRequest.TYPE.WAIVER,
      [SEATOOL_PLAN_TYPE.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
    };
/*
const SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS = {
  [SEATOOL_PLAN_TYPE.CHIP_SPA]: "chipspa",
  [SEATOOL_PLAN_TYPE.SPA]: "spa",
  [SEATOOL_PLAN_TYPE.WAIVER]: "waiver",
  [SEATOOL_PLAN_TYPE.WAIVER_APP_K]: "waiverappk",
};
*/

    SEAToolData.packageType = SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS[SEAToolData.planType];

    // update OneMAC Package Item
    const updatePk = SEAToolData.packageId;
    const updateSk = "PACKAGE";
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

    // only update clock if new Clock is sent
    if (SEAToolData.clockEndTimestamp) {
      updatePackageParams.ExpressionAttributeValues[":newClockEnd"] =
      SEAToolData.clockEndTimestamp;
      updatePackageParams.UpdateExpression += ", currentClockEnd = :newClockEnd";
    }

    // only update status if new Status is sent
    if (SEAToolData.packageStatus) {
      let newStatus = `SEATool Status: ${SEAToolData.packageStatus}`;
      if (SEATOOL_TO_ONEMAC_STATUS[SEAToolData.packageStatus])
        newStatus = SEATOOL_TO_ONEMAC_STATUS[SEAToolData.packageStatus];
      updatePackageParams.ExpressionAttributeValues[":newStatus"] = newStatus;
      updatePackageParams.UpdateExpression += ",currentStatus = :newStatus";
    }

    ddb.update(updatePackageParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", JSON.parse(data));
        console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);
    }});

  }
}

exports.handler = myHandler;
