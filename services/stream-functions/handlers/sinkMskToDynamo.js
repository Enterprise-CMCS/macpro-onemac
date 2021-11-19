const AWS = require('aws-sdk');
// const { ChangeRequest } = require("cmscommonlib");

AWS.config.update({region: 'us-east-1'});
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

/* const SEATOOL_TABLES = {
  STATE_PLAN: `State_Plan`,
  RAI: `RAI`
};
*/
const topicPrefix = "lmdc.seatool.submission.cdc.sea-dbo-";
/*
const SEATOOL_TOPICS = {
  STATE_PLAN: `${topicPrefix}${SEATOOL_TABLES.STATE_PLAN}`,
  RAI: `${topicPrefix}${SEATOOL_TABLES.RAI}`
};

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
  [SEATOOL_TOPICS.STATE_PLAN]: [
    "clockEndTimestamp",
    "expirationTimestamp",
    "currentStatus",
  ],
  [SEATOOL_TOPICS.RAI]: []
};
*/
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

  const sk = `SEATool#${table}#${value.payload.replica_id}`

  // update the SEATool Entry
  const updateSEAToolParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: pk,
      sk: sk,
    },
    Item: {...value.payload},
  };

  ddb.put(updateSEAToolParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Update Success, data is: ", data);
        console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);
/*
        // if the SEATool entry is new, do we need to add Paper IDs??
        if (data.Attributes.changeHistory.length === 1) {
          console.log("that was a new package from SEATool");
        } else {
          console.log("We have seen that package before!");
        }

        // update OneMAC Component
        const updatePk = SEAToolData.componentId;
        const updateSk = data.packageType;
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

        topLevelUpdates[topic].forEach((attributeName) => {
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
        */
      }
  });
}

exports.handler = myHandler;
