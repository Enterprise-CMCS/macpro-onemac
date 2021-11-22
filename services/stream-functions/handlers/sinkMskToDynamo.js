const AWS = require('aws-sdk');
import { ChangeRequest } from "cmscommonlib";

AWS.config.update({region: 'us-east-1'});
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const topicPrefix = "lmdc.seatool.submission.cdc.sea-dbo-";

const SEATOOL_TABLE = {
  STATE_PLAN: "State_Plan",
  RAI: "RAI",
}

const SEATOOL_PLAN_TYPE = {
  CHIP_SPA: "124",
  SPA: "125",
  WAIVER: "122",
  WAIVER_APP_K: "123",
};

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
  [SEATOOL_PLAN_TYPE.WAIVER]: ChangeRequest.TYPE.WAIVER_BASE,
  [SEATOOL_PLAN_TYPE.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
};

const topLevelUpdates = {
  [SEATOOL_TABLE.STATE_PLAN]: [
    "clockEndTimestamp",
    "expirationTimestamp",
    "currentStatus",
  ],
  [SEATOOL_TABLE.RAI]: []
};

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log('Received event:', JSON.stringify(event, null, 2));
  const table = event.topic.replace(topicPrefix, "");
  const value = JSON.parse(event.value);
  console.log(`Topic: ${event.topic} Table: ${table} Event value: ${JSON.stringify(value, null, 2)}`);

  const pk = value.payload.ID_Number;
  if (!pk || !value.payload.replica_id) return;

  // use the repllica id as a version number/event tracker... highest id is most recent
  const sk = `SEATool#${table}#${value.payload.replica_id}`

  // put the SEATool Entry - overwrites if already exists
  const updateSEAToolParams = {
    TableName: process.env.oneMacTableName,
    Item: {pk,sk,...value.payload},
  };

  ddb.put(updateSEAToolParams, function(err) {
      if (err) {
        console.log("Error", err);
      } else if (table === "State_Plan") {
        const oneMACData = {
          currentStatus: SEATOOL_TO_ONEMAC_STATUS[value.payload.SPW_Status_ID],
          clockEndTimestamp: value.payload.Alert_90_Days_Date,
          componentType: SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS[value.payload.Plan_Type],
          componentId: pk,
          expirationTimestamp: value.payload.End_Date,
        }
        ddb.update(ChangeRequest.getUpdateParams(oneMACData,topLevelUpdates[table]), function(err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Update Success!  Returned data is: ", data);
            console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);
        }});
      }
  });
}

exports.handler = myHandler;
