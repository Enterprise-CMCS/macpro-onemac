//const AWS = require('aws-sdk');
//const { ChangeRequest } = require("cmscommonlib");
//const { Workflow } = require("cmscommonlib");
//const { ONEMAC_STATUS } = Workflow;

//AWS.config.update({ region: 'us-east-1' });
//const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const topicPrefix = "lmdc.seatool.submission.cdc.sea-dbo-";

// const SEATOOL_PLAN_TYPE = {
//   CHIP_SPA: "124",
//   SPA: "125",
//   WAIVER: "122",
//   WAIVER_APP_K: "123",
// };

// const SEATOOL_STATUS = {
//   PENDING: "1",
//   PENDING_RAI: "2",
//   PENDING_OFF_THE_CLOCK: "3",
//   APPROVED: "4",
//   DISAPPROVED: "5",
//   WITHDRAWN: "6",
//   TERMINATED: "7",
//   PENDING_CONCURRANCE: "8",
//   UNSUBMITTED: "9",
//   PENDING_FINANCE: "10",
//   PENDING_APPROVAL: "11",
//   UNKNOWN: "unknown",
// };

// check if the SEATool updates should be reflected in OneMAC
// const SEATOOL_TO_ONEMAC_STATUS = {
//   [SEATOOL_STATUS.PENDING]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.PENDING_RAI]: ONEMAC_STATUS.RAI_ISSUED,
//   [SEATOOL_STATUS.PENDING_OFF_THE_CLOCK]: ONEMAC_STATUS.PAUSED,
//   [SEATOOL_STATUS.APPROVED]: ONEMAC_STATUS.APPROVED,
//   [SEATOOL_STATUS.DISAPPROVED]: ONEMAC_STATUS.DISAPPROVED,
//   [SEATOOL_STATUS.WITHDRAWN]: ONEMAC_STATUS.WITHDRAWN,
//   [SEATOOL_STATUS.TERMINATED]: ONEMAC_STATUS.TERMINATED,
//   [SEATOOL_STATUS.PENDING_CONCURRANCE]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.UNSUBMITTED]: ONEMAC_STATUS.UNSUBMITTED,
//   [SEATOOL_STATUS.PENDING_FINANCE]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.PENDING_APPROVAL]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.UNKNOWN]: ONEMAC_STATUS.SUBMITTED,
// };

// const SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS = {
//   [SEATOOL_PLAN_TYPE.CHIP_SPA]: ChangeRequest.TYPE.CHIP_SPA,
//   [SEATOOL_PLAN_TYPE.SPA]: ChangeRequest.TYPE.SPA,
//   [SEATOOL_PLAN_TYPE.WAIVER]: ChangeRequest.TYPE.WAIVER_BASE,
//   [SEATOOL_PLAN_TYPE.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
// };

// const topLevelUpdates = [
//   "clockEndTimestamp",
//   "expirationTimestamp",
//   "currentStatus",
// ];

function createTestEvent(event, value) {

  const testEvent = {
    "topic": event.topic,
    "partition": event.partition,
    "offset": event.offset,
    "value": JSON.stringify({
      "payload": {
        "ID_Number": value.payload.ID_Number,
        "Submission_Date": value.payload.Submission_Date,
        "Plan_Type": value.payload.Plan_Type,
        "Action_Type": value.payload.Action_Type,
        "Alert_90_Days_Date": value.payload.Alert_90_Days_Date,
        "Summary_Memo": value.payload.Summary_Memo,
        "SPW_Status_ID": value.payload.SPW_Status_ID,
        "replica_id": value.payload.replica_id
      }
    }),
  };

  return testEvent;
}

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  const table = event.topic.replace(topicPrefix, "");
  const value = JSON.parse(event.value);
  const eventId = event.offset;
  if (table === "State_Plan") console.log('Test State_Plan Event: ', JSON.stringify(createTestEvent(event, value), null, 2));
  console.log(`Topic: ${event.topic} Table: ${table} Event value: ${JSON.stringify(value, null, 2)}`);

  const SEAToolId = value.payload.ID_Number;
  if (!SEAToolId) return;

  const pk = value.payload.ID_Number;
  if (!pk || !eventId) return;

  // use the offset as a version number/event tracker... highest id is most recent
  const sk = `SEATool#${table}#${eventId}`;

  // put the SEATool Entry - overwrites if already exists
  const updateSEAToolParams = {
    TableName: process.env.oneMacTableName,
    Item: { pk, sk, ...value.payload },
    ReturnValues: "ALL_OLD",  // ReturnValues for put can only be NONE or ALL_OLD
  };

  console.log("Params: ", updateSEAToolParams);
/*
  ddb.put(updateSEAToolParams, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Data: ", data);
      if (table === "State_Plan") {
        const SEAToolData = {
          currentStatus: SEATOOL_TO_ONEMAC_STATUS[value.payload.SPW_Status_ID],
          clockEndTimestamp: value.payload.Alert_90_Days_Date,
          componentType: SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS[value.payload.Plan_Type],
          componentId: pk,
          expirationTimestamp: value.payload.End_Date,
        };

        // update OneMAC Component
        const updatePk = SEAToolData.componentId;
        const updateSk = SEAToolData.componentType;
        const updatePackageParams = {
          TableName: process.env.oneMacTableName,
          Key: {
            pk: updatePk,
            sk: updateSk,
          },
          ConditionExpression: "pk = :pkVal AND sk = :skVal",
          UpdateExpression:
            "SET seaToolIdNumber = :seaToolIdNumber",
          ExpressionAttributeValues: {
            ":pkVal": updatePk,
            ":skVal": updateSk,
            ":seaToolIdNumber": SEAToolData.componentId,
            ":newChange": [SEAToolData],
          },
        };

        topLevelUpdates.forEach((attributeName) => {
          if (SEAToolData[attributeName]) {
            const newLabel = `:new${attributeName}`;
            updatePackageParams.ExpressionAttributeValues[newLabel] =
              SEAToolData[attributeName];
            //          if (Array.isArray(SEAToolData[attributeName]))
            //          updatePackageParams.UpdateExpression += `, ${attributeName} = list_append(if_not_exists(${attributeName},:emptyList), ${newLabel})`;
            //      else
            updatePackageParams.UpdateExpression += `, ${attributeName} = ${newLabel}`;
          }
        });

        ddb.update(updatePackageParams, function (err, data) {
          if (err) {
            if (err.code === "ConditionalCheckFailedException")
              console.log("Not a OneMAC package: ", updatePk);
            else
              console.log("Error", err);
          } else {
            console.log("Update Success!  Returned data is: ", data);
            console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);
          }
        });
      }
    }
  });
  */
}

exports.handler = myHandler;
