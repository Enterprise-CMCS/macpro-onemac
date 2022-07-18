/* eslint-disable no-prototype-builtins */
import AWS from "aws-sdk";
import { parse, format, addDays } from "date-fns";
import csv from "csvtojson";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

const dateFormat = "dd-MMM-yy, h:mm:ss a x";

const successIds = [];
const errorIds = [];

function validateEvent(updateArray) {
  //validate required input params
  if (!updateArray || updateArray.length === 0) {
    throw new Error(
      "Missing event parameter - csvUpdates: must be a csv string of update objects"
    );
  }

  for (const update of updateArray) {
    if (
      !(
        update.hasOwnProperty("Old ID Format") &&
        update.hasOwnProperty("Type") &&
        update.hasOwnProperty("State") &&
        update.hasOwnProperty("Date Submitted") &&
        update.hasOwnProperty("New ID Format")
      )
    ) {
      throw new Error(
        "Invalid update object - missing properties on " +
          JSON.stringify(update)
      );
    }
  }
  console.log("event passed validation");
}

/**
 * Update a list of given change request transmittalNumbers based on their current transmittalNumber, type, and submittedAt timestamp.
 * Note that the submittedAt parameter should represent US Eastern Timezone and be in 24hr format.
 *
 * @returns {string} Confirmation message
 */
exports.main = async function (event) {
  console.log("batchUpdateChangeRequestId.main", event);

  const updateArray = await csv({
    colParser: {
      Type: function (item) {
        // transform types to app based types
        switch (item) {
          case "Medicaid SPA":
            return "spa";
          default:
            return item;
        }
      },
    },
  }).fromString(event.csvUpdates);

  validateEvent(updateArray);

  for (const idUpdate of updateArray) {
    console.log(idUpdate);
    //convert input submitted date to epoch; assume midnight in ET will be good enough
    const dateSubmittedAt = parse(
      idUpdate["Date Submitted"] + ", 12:00:00 AM -04",
      dateFormat,
      new Date()
    );

    //query for change request in the given territory and sumbitted on the specified day
    const queryParams = {
      TableName: process.env.tableName,
      ProjectionExpression: "transmittalNumber,#type,summary,userId,id",
      ExpressionAttributeNames: { "#type": "type" },
      IndexName: "territory-submittedAt-index",
      KeyConditionExpression:
        "territory = :v_territory and submittedAt between :v_submittedAt and :v_submittedEnd",
      FilterExpression:
        "transmittalNumber = :v_transmittalNumber and #type = :v_type",
      ExpressionAttributeValues: {
        ":v_territory": idUpdate["State"],
        ":v_submittedAt": dateSubmittedAt.getTime(),
        ":v_submittedEnd": addDays(dateSubmittedAt, 1).getTime(),
        ":v_transmittalNumber": idUpdate["Old ID Format"],
        ":v_type": idUpdate["Type"],
      },
    };
    console.log("Query Params:", queryParams);
    const results = await dynamoDb.query(queryParams).promise();

    //find exact match from query results
    if (results.Items?.length === 0) {
      const errorMsg =
        "Transmittal number not found for specified type, territory, and submission timeframe - can not do auto update";
      errorIds.push({ errorMsg, ...idUpdate });
      continue;
    } else if (results.Items?.length > 1) {
      const errorMsg =
        "Duplicate transmittal numbers found for specified type, territory, and submission timeframe - can not do auto update";
      errorIds.push({ errorMsg, ...idUpdate });
      continue;
    }

    const result = results.Items[0];
    console.log(result);
    //update the transmittalNumber to the input transmittalNumber and prepend the additional info
    const standardAddtionalInfo =
      "Modified ID on " +
      format(new Date(), "EEE, MMM d yyyy") +
      ` from ${idUpdate["Old ID Format"]} to ${idUpdate["New ID Format"]}` +
      "\n\n";
    await dynamoDb
      .update({
        TableName: process.env.tableName,
        Key: { userId: result.userId, id: result.id },
        UpdateExpression:
          "SET transmittalNumber = :toTransmittalNumber, summary = :toSummary",
        ExpressionAttributeValues: {
          ":toTransmittalNumber": idUpdate["New ID Format"],
          ":toSummary": standardAddtionalInfo + " " + result.summary,
        },
      })
      .promise();
    successIds.push(idUpdate);
  }
  console.log("\n\n------ END OF RUN REPORT ------");
  if (errorIds.length > 0) {
    console.log("The following IDs were not updated:", errorIds);
  }
  console.log("The following IDs were successfully updated:", successIds);

  return "Update Complete";
};
