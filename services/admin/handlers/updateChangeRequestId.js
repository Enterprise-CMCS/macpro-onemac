import AWS from "aws-sdk";
import { addMonths } from "date-fns";

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
  if (!event.prependAdditionalInfo) {
    missingParams += " prependAdditionalInfo ";
  }
  if (missingParams.trim().length != 0) {
    throw new Error("Missing event parameters - " + missingParams);
  }

  console.log("event passed validation");
}

function extractMatchedResult(results, event) {
  const filteredResults = results.Items.filter((item) => {
    return (
      item.transmittalNumber === event.fromTransmittalNumber &&
      item.type === event.type
    );
  });

  if (filteredResults.length === 0) {
    throw new Error(
      "Transmittal number not found for specified type, territory, and submission timeframe - can not do auto update"
    );
  } else if (filteredResults.length > 1) {
    throw new Error(
      "Duplicate transmittal numbers found for specified type, territory, and submission timeframe - can not do auto update"
    );
  }

  console.log("Single Match Found", filteredResults[0]);
  return filteredResults[0];
}

/**
 * Update a given change request transmittalNumber based on its current transmittalNumber, type, and submittedAt timestamp.
 *
 * @param {string} event.fromTransmittalNumber The submission id (TransmittalNumber) to update
 * @param {string} event.toTransmittalNumber the new submission id (TransmittalNumber)
 * @param {string} event.type the type of submission - see changeRequest.js Type - examples: (chipspa,chipsparai,spa,sparai,waiver)
 * @param {string} event.territory the two character state code to which the submission belongs
 * @param {string} event.prependAdditionalInfo is any text that should be prepended to the summary (additional info) to explain the update
 * @param {string} event.submittedLastXMonths an optional integer representing the number of months back to query for the given transmittalNumber; if not provided will default to 3
 * @param {string} event.testRun an optional boolean that if true indicates that the final update should not occur
 * @returns {string} Confirmation message
 */
exports.main = async function (event) {
  console.log("updateChangeRequestId.main", event);

  validateEvent(event);

  const monthsAgo = -(event.submittedLastXMonths ?? 3);

  //query for change request in the given territory and sumbitted at the specified time (within one second)
  const queryParams = {
    TableName: process.env.tableName,
    ProjectionExpression: "transmittalNumber,#type,summary,userId,id",
    ExpressionAttributeNames: { "#type": "type" },
    IndexName: "territory-submittedAt-index",
    KeyConditionExpression:
      "territory = :v_territory and submittedAt >= :v_submittedStart",
    ExpressionAttributeValues: {
      ":v_territory": event.territory,
      ":v_submittedStart": addMonths(new Date(), monthsAgo).getTime(),
    },
  };

  console.log("queryParams", queryParams);
  const results = await dynamoDb.query(queryParams).promise();

  //find exact match from query results
  const result = extractMatchedResult(results, event);

  //update the transmittalNumber to the input transmittalNumber and prepend the additional info
  if (!event.testRun) {
    await dynamoDb
      .update({
        TableName: process.env.tableName,
        Key: { userId: result.userId, id: result.id },
        UpdateExpression:
          "SET transmittalNumber = :toTransmittalNumber, summary = :toSummary",
        ExpressionAttributeValues: {
          ":toTransmittalNumber": event.toTransmittalNumber,
          ":toSummary": event.prependAdditionalInfo + "\n\n" + result.summary,
        },
      })
      .promise();
  }

  return "Update Complete";
};
