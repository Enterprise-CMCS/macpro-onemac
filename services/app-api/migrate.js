import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import updateComponent from "./utils/updateComponent";

const statusConversion = {
  "Package In Review": "In Review",
  "Package Approved": "Approved",
  "Package Disapproved": "Disapproved",
  "Waiver Terminated": "Terminated",
};

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  // scan one table index as only indexed items need migration
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `OneMAC#spa`,
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "componentId, componentType, currentStatus",
  };

  // SPA group
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      const newStatus = statusConversion[item.currentStatus];
      // skip if don't need to change status
      if (!newStatus) continue;

      const updateData = {
        submitterName: "Migrate Script",
        submitterEmail: "k.grue@theta-llc.com",
        submissionTimestamp: Date.now(),
        componentId: item.componentId,
        componentType: item.componentType,
        currentStatus: newStatus,
      };
      console.log("update data: ", updateData);

      const updateConfig = {
        successResponseCode: "Migrated",
        allowMultiplesWithSameId: item.componentType.search(/rai/i) > -1,
      };

      await updateComponent(updateData, updateConfig);
    }
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  params.ExpressionAttributeValues = {
    ":gsi1pk": `OneMAC#waiver`,
  };

  // Waiver group
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      const newStatus = statusConversion[item.currentStatus];
      // skip if don't need to change status
      if (!newStatus) continue;

      const updateData = {
        submitterName: "Migrate Script",
        submitterEmail: "k.grue@theta-llc.com",
        submissionTimestamp: Date.now(),
        componentId: item.componentId,
        componentType: item.componentType,
        currentStatus: newStatus,
      };

      const updateConfig = {
        successResponseCode: "Migrated",
        allowMultiplesWithSameId: item.componentType.search(/rai/i) > -1,
      };

      console.log("update data: ", updateData);
      await updateComponent(updateData, updateConfig);
    }
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  return "Done";
});
