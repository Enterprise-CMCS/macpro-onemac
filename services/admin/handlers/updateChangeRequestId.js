import AWS from "aws-sdk";
import { parseISO, addSeconds } from "date-fns";

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
  if (!event.ISOsubmittedAt) {
    missingParams += " ISOsubmittedAt ";
  }
  if (!event.fromTransmittalNumber) {
    missingParams += " fromTransmittalNumber ";
  }
  if (!event.toTransmittalNumber) {
    missingParams += " toTransmittalNumber ";
  }
  if (!event.type) {
    missingParams += " type ";
  }
  if (!event.territory) {
    missingParams += " territory ";
  }
  if (!event.appendAdditionalInfo) {
    missingParams += " appendAdditionalInfo ";
  }
  if (missingParams.trim().length != 0) {
    throw new Error("Missing event parameters - " + missingParams);
  }

  //validate format of ISOsubmittedAt
  if (isNaN(parseISO(event.ISOsubmittedAt))) {
    throw new Error(
      "Invalid format for ISOsubmittedAt parameter. Expected YYYY-MM-DDThh:mm:ss and received " +
        event.ISOsubmittedAt
    );
  }

  console.log("event passed validation");
}

function extractMatchedResult(results, event) {
  const result = results.Items.find((item) => {
    return (
      item.transmittalNumber === event.fromTransmittalNumber &&
      item.type === event.type
    );
  });

  if (!result) {
    throw new Error(
      "Transmittal number not found for specified territory and submission time - can not do auto update"
    );
  }
  console.log("Match found", result);
  return result;
}

/**
 * Update a given change request transaction number based on its current transactionNumber, type, and submittedAt timestamp.
 * Note that the ISOsubmittedAt parameter should represent US Eastern Timezone and be in 24hr format.
 *
 * @param {string} event.ISOsubmittedAt An ISO formatted (YYYY-MM-DDThh:mm:ss) dateTime string representing the US Eastern Timezone date of submission
 * @param {string} event.fromTransmittalNumber The submission id (TransmittalNumber) to update
 * @param {string} event.toTransmittalNumber the new submission id (TransmittalNumber)
 * @param {string} event.type the type of submission - see changeRequest.js Type - examples: (chipspa,chipsparai,spa,sparai,waiver)
 * @param {string} event.territory the two character state code to which the submission belongs
 * @param {string} event.appendAdditionalInfo is any text that should be prepended to the summary (additional info) to explain the update
 * @returns {string} Confirmation message
 */
exports.main = async function (event) {
  console.log("updateChangeRequestId.main", event);

  validateEvent(event);

  //convert input timestamp to epoch; submittedAt timestamps are input in ET so append -04
  const dateSubmittedAt = parseISO(event.ISOsubmittedAt.concat("-04"));

  //query for change request in the given territory and sumbitted at the specified time (within one second)
  const queryParams = {
    TableName: process.env.tableName,
    ProjectionExpression: "transmittalNumber,#type,summary,userId,id",
    ExpressionAttributeNames: { "#type": "type" },
    IndexName: "territory-submittedAt-index",
    KeyConditionExpression:
      "territory = :v_territory and submittedAt between :v_submittedAt and :v_submittedEnd",
    ExpressionAttributeValues: {
      ":v_territory": event.territory,
      ":v_submittedAt": dateSubmittedAt.getTime(),
      ":v_submittedEnd": addSeconds(dateSubmittedAt, 1).getTime(),
    },
  };

  console.log("queryParams", queryParams);
  const results = await dynamoDb.query(queryParams).promise();

  //find exact match from query results
  const result = extractMatchedResult(results, event);

  //update the transmittalNumber to the input transmittalNumber and append the additional info
  await dynamoDb
    .update({
      TableName: process.env.tableName,
      Key: { userId: result.userId, id: result.id },
      UpdateExpression:
        "SET transmittalNumber = :toTransmittalNumber, summary = :toSummary",
      ExpressionAttributeValues: {
        ":toTransmittalNumber": event.toTransmittalNumber,
        ":toSummary": event.appendAdditionalInfo + " " + result.summary,
      },
    })
    .promise();

  return "Update Complete";
};
