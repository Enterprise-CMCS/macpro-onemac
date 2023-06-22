import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);
const oneMacTableName = process.env.oneMacTableName;

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

async function getOneMacEventRecords(fromPackageId) {
  const params = {
    TableName: oneMacTableName,
    KeyConditionExpression: "pk = :pkValue and begins_with(sk, :skValue)",
    ExpressionAttributeValues: {
      ":pkValue": fromPackageId,
      ":skValue": "OneMAC#",
    },
  };

  console.log("right  before query", params);
  const queryResponse = await dynamoDb.query(params).promise();
  console.log("OneMAC events found for: ", fromPackageId);

  return queryResponse.Items;
}

function formatPutRequests(toPackageId, addlInfo, records) {
  const changeTimestamp = Date.now();
  const putRequests = records.map((item) => {
    const thisChange = {
      changeTimestamp,
      changeMade: `ID changed from ${item.pk} to ${toPackageId}`,
      changeReason: addlInfo,
    };
    const adminChanges = result.Item.adminChanges
      ? [thisChange, ...result.Item?.adminChanges]
      : [thisChange];

    const requestItem = {
      ...item,
      pk: toPackageId,
      componentId: toPackageId,
      GSI1sk: toPackageId,
      adminChanges,
    };
    return {
      TableName: oneMacTableName,
      Item: requestItem,
    };
  });
  console.log("Adding the following records", putRequests);
  return putRequests;
}

function formatDeleteRequests(packageId, records) {
  const deletes = records.map((item) => {
    return {
      Key: {
        pk: packageId,
        sk: item.sk,
      },
      TableName: oneMacTableName,
    };
  });

  //also add root package for deletion
  deletes.push({
    Key: {
      pk: packageId,
      sk: "Package",
    },
    TableName: oneMacTableName,
  });
  console.log("Marking following records for delete", deletes);
  return deletes;
}

async function updatePackageId(event) {
  // query just the onemac events for this package
  const records = await getOneMacEventRecords(event.fromPackageId);
  console.log("records", records);

  const deleteRequests = formatDeleteRequests(event.fromPackageId, records);

  const putRequests = formatPutRequests(
    event.toPackageId,
    event.prependAdditionalInfo,
    records
  );

  if (!event.testRun) {
    try {
      const deletePromises = deleteRequests.map((deleteParams) => {
        return dynamoDb.delete(deleteParams).promise();
      });
      await Promise.all(deletePromises);

      const putPromises = putRequests.map((putRequest) => {
        return dynamoDb.put(putRequest).promise();
      });
      await Promise.all(putPromises);
    } catch (err) {
      console.log("Error updating item:", err);
      throw err;
    }
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
  console.log("updatePackageId.main", event);

  validateEvent(event);

  await updatePackageId(event);
};
