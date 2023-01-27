import AWS from "aws-sdk";

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

  if (!event.fromPackageId) {
    missingParams += " fromPackageId ";
  }
  if (!event.toPackageId) {
    missingParams += " toPackageId ";
  }
  if (!event.prependAdditionalInfo) {
    missingParams += " prependAdditionalInfo ";
  }
  if (missingParams.trim().length != 0) {
    throw new Error("Missing event parameters - " + missingParams);
  }

  console.log("event passed validation");
}

async function updateByPK(event) {
  const tableName = process.env.oneMacTableName;
  try {
    // query just the onemac events for this package
    const params = {
      TableName: tableName,
      KeyConditionExpression: "pk = :pkValue and begins_with(sk, :skValue)",
      ExpressionAttributeValues: {
        ":pkValue": event.fromPackageId,
        ":skValue": "OneMAC#",
      },
    };
    const data = await dynamoDb.query(params).promise();

    //if more than one onemac event then throw an error
    if (data.Count !== 1) {
      throw new Error(
        "Expected 1 item with pk " +
          event.fromPackageId +
          " but found " +
          data.Count +
          " items."
      );
    }
    const item = data.Items[0];
    console.log("OneMAC event found:", item);

    if (!event.testRun) {
      // Delete the old onemac event
      const deleteParams = {
        TableName: tableName,
        Key: { pk: item.pk, sk: item.sk },
      };
      await dynamoDb.delete(deleteParams).promise();
      console.log("Deleted Original OneMAC event");

      // Insert the new event with new id
      const newItem = {
        ...item,
        pk: event.toPackageId,
        componentId: event.toPackageId,
        GSI1pk: event.toPackageId,
        additionalInformation:
          event.prependAdditionalInfo + "\n\n" + item.additionalInformation,
      };
      const putParams = {
        TableName: tableName,
        Item: newItem,
      };
      await dynamoDb.put(putParams).promise();
      console.log("Added new event with updated id:", newItem);

      // delete the old package item
      const deletePackageParams = {
        TableName: tableName,
        Key: { pk: item.pk, sk: "Package" },
      };
      await dynamoDb.delete(deletePackageParams).promise();
      console.log("Deleted old package record");
    } else {
      console.log("testRun only, package not updated");
    }
  } catch (err) {
    console.log("Error updating item:", err);
    throw err;
  }
}

/**
 * Update a given packageId based on its current packageId (pk), type, and submittedAt timestamp.
 *
 * @param {string} event.fromPackageid The package id (pk,componentId) to update
 * @param {string} event.toPackageId the new package id (pk,componentId)
 * @param {string} event.prependAdditionalInfo is any text that should be prepended to the summary (additional info) to explain the update
 * @param {string} event.testRun an optional boolean that if true indicates that the final update should not occur
 * @returns {string} Confirmation message
 */
exports.main = async function (event) {
  console.log("updateChangeRequestId.main", event);

  validateEvent(event);

  await updateByPK(event);
};
