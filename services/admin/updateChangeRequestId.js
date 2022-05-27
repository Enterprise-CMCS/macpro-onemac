import AWS from "aws-sdk";
import { parseISO, addSeconds } from "date-fns";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

export async function main(event) {
  console.log("Inside updateChangeRequestId", event);
  console.log(
    "Input vars:",
    "tablename:",
    process.env.tableName,
    "ISOsubmittedAt:",
    process.env.ISOsubmittedAt,
    "fromTransmittalNumber:",
    process.env.fromTransmittalNumber,
    "toTransmittalNumber:",
    process.env.toTransmittalNumber,
    "appendAdditionalInfo:",
    process.env.appendAdditionalInfo
  );

  //get territory from transactionNumber
  const territory = process.env.fromTransmittalNumber.substring(0, 2);
  console.log("territory", territory);

  //convert input timestamp to epoch - submittedAt timestamps are input in ET so append -04
  const dateSubmittedAt = parseISO(process.env.ISOsubmittedAt.concat("-04"));
  const dateSubmittedAtPlusOneSecond = addSeconds(dateSubmittedAt, 1);

  //query for change request in the given territory and sumbitted at the specified time (within one second)
  const results = await dynamoDb
    .query({
      TableName: process.env.tableName,
      ProjectionExpression: "transmittalNumber,summary,userId,id",
      IndexName: "territory-submittedAt-index",
      KeyConditionExpression:
        "territory = :v_territory and submittedAt between :v_submittedAt and :v_submittedEnd",
      ExpressionAttributeValues: {
        ":v_territory": territory,
        ":v_submittedAt": dateSubmittedAt.getTime(),
        ":v_submittedEnd": dateSubmittedAtPlusOneSecond.getTime(),
      },
    })
    .promise();

  console.log("Query Results:", results.Items);

  //validate proper results
  if (results.Items.length > 0) {
    throw new Error("Item not found.");
  } else if (results.Items.length > 1) {
    throw new Error("Multiple records found - can not do auto update");
  } else if (
    results.Items[0].transmittalNumber != process.env.fromTransmittalNumber
  ) {
    throw new Error(
      "Incorrect Transmittal number found - can not do auto update"
    );
  }

  //update the transmittalNumber to the input transmittalNumber and append the additional info
  await dynamoDb
    .update({
      TableName: process.env.tableName,
      Key: { userId: results.Items[0].userId, id: results.Items[0].id },
      UpdateExpression:
        "SET transmitttalNumber = :toTransmittalNumber, summary = :toSummary",
      ExpressionAttributeValues: {
        ":toTransmittalNumber": process.env.toTransmittalNumber,
        ":toSummary":
          process.env.appendAdditionalInfo + " " + results.Items[0].summary,
      },
    })
    .promise();

  return "Update Complete";
}
