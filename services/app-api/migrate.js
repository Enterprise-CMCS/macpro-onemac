import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const tableName = process.env.oneMacTableName;

const oldStatus = "RAI Response Withdraw Enabled"; // The status you want to update from
const newStatus = "Withdraw Formal RAI Response Enabled"; // The status you want to update to

async function updateItems() {
  const params = {
    TableName: tableName,
    FilterExpression: "currentStatus = :oldStatus or subStatus = :oldStatus",
    ExpressionAttributeValues: {
      ":oldStatus": oldStatus,
    },
  };

  try {
    const data = await dynamoDb.scan(params);
    for (const item of data.Items) {
      const updateParams = {
        TableName: tableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression:
          item.currentStatus === oldStatus
            ? "set currentStatus = :newStatus"
            : "set subStatus = :newStatus",
        ExpressionAttributeValues: { ":newStatus": newStatus },
      };
      console.log("Updating item:", item.pk);
      console.log("Update params:", updateParams);
      await dynamoDb.update(updateParams);
    }
    console.log("Update complete.");
  } catch (error) {
    console.error("Error updating items:", error);
  }
}

export const main = handler(async () => {
  await updateItems();
});
