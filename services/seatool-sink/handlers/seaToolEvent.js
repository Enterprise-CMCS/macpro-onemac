const AWS = require("aws-sdk");
//const { ChangeRequest } = require("cmscommonlib");
//const { Workflow } = require("cmscommonlib");
//const { ONEMAC_STATUS } = Workflow;

AWS.config.update({ region: "us-east-1" });
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const topicPrefix = "aws.ksqldb.seatool.agg.StatePlan_";

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
//   PENDING_CONCURRENCE: "8",
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
//   [SEATOOL_STATUS.PENDING_CONCURRENCE]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.UNSUBMITTED]: ONEMAC_STATUS.UNSUBMITTED,
//   [SEATOOL_STATUS.PENDING_FINANCE]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.PENDING_APPROVAL]: ONEMAC_STATUS.IN_REVIEW,
//   [SEATOOL_STATUS.UNKNOWN]: ONEMAC_STATUS.SUBMITTED,
// };

// const SEATOOL_TO_ONEMAC_PLAN_TYPE_IDS = {
//   [SEATOOL_PLAN_TYPE.CHIP_SPA]: ChangeRequest.TYPE.CHIP_SPA,
//   [SEATOOL_PLAN_TYPE.SPA]: ChangeRequest.TYPE.SPA,
//   [SEATOOL_PLAN_TYPE.WAIVER]: ChangeRequest.TYPE.WAIVER_INITIAL,
//   [SEATOOL_PLAN_TYPE.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
// };

function myHandler(event) {
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  console.log("Received event:", JSON.stringify(event, null, 2));
  const componentType = event.topic.replace(topicPrefix, "");
  const value = JSON.parse(event.value);
  console.log(`Type: ${componentType} Topic: ${event.topic}`);

  const pk = value.STATE_PLAN.ID_NUMBER;
  const changedDate = value.STATE_PLAN.CHANGED_DATE;
  if (!pk || !changedDate) return;

  // use the offset as a version number/event tracker... highest id is most recent
  const sk = `SEATool#${changedDate}`;

  const GSI1pk = `SEATool#${componentType}`;
  const GSI1sk = value.STATE_PLAN.ID_NUMBER;

  // put the SEATool Entry - don't bother if already exists
  const updateSEAToolParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk,
      sk,
    },

    Item: { pk, sk, GSI1pk, GSI1sk, ...value },
    ReturnValues: "ALL_OLD", // ReturnValues for put can only be NONE or ALL_OLD
  };

  console.log("Params: ", updateSEAToolParams);

  ddb.put(updateSEAToolParams, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Data: ", data);
    }
  });
}

exports.handler = myHandler;
