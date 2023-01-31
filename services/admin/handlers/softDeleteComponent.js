import AWS from "aws-sdk";
import { isFinite } from "lodash";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

function validateEvent(event) {
  //validate required input params
  let missingParams = "";
  if (!event.componentId) {
    missingParams += " componentId ";
  }
  if (!event.componentType) {
    missingParams += " componentType ";
  }
  if (!event.prependAdditionalInfo) {
    missingParams += " prependAdditionalInfo ";
  }
  if (!event.submissionTimestamp || !isFinite(event.submissionTimestamp)) {
    missingParams += " submissionTimestamp (must be a number)";
  }
  if (missingParams.trim().length != 0) {
    throw new Error("Missing event parameters - " + missingParams);
  }
  console.log("%s softDeleteComponent event validated", event.componentId);
}

/**
 * Update a given change request transmittalNumber to mark it as deleted and update the additionalInfo property with notes about the update event.
 *
 * @param {string} event.componentId The component id to update
 * @param {string} event.componentType the type of component - examples: (chipspa,chipsparai,medicaidspa,medicaidsparai,waivernew)
 * @param {string} event.prependAdditionalInfo is any text that should be prepended to the summary (additional info) to explain the update
 * @param {string} event.submissionTimestamp timestamp of the component submission
 * @returns {string} Confirmation message
 */
exports.main = async function (event) {
  console.log("softDeleteComponent.main", event);

  validateEvent(event);

  const pk = event.componentId.toUpperCase();
  const sk = `OneMAC#${event.submissionTimestamp}`;
  const currentStatus = "Inactivated";

  // because we are prepending the additionalInformation... we have to use get/put
  const getParams = {
    TableName: process.env.oneMacTable,
    Key: {
      pk,
      sk,
    },
  };

  console.log("%s getParams", event.componentId, getParams);
  const result = await dynamoDb.get(getParams).promise();

  if (!result || !result.Item) {
    throw new Error(pk + " not found with sk: " + sk);
  }
  const auditArray = [event.prependAdditionalInfo, ...result.Item?.auditArray];

  //update the status to inactivated and prepend the additional info
  await dynamoDb
    .put({
      TableName: process.env.oneMacTable,
      Key: { pk, sk },
      Item: {
        ...result.Item,
        currentStatus,
        additionalInformation: `${event.prependAdditionalInfo}\n\n${result.Item.additionalInformation}`,
        auditArray,
      },
    })
    .promise();

  return "Update Complete";
};
