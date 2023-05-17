import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

import { temporaryExtensions } from "./migrateData";

/**
 * Perform data migrations
 */

const tableName = process.env.oneMacTableName;

// Define the constructUpdateParams function first to avoid the error
function constructUpdateParams(pk, value) {
  const params = {
    TableName: tableName,
    Key: { pk: pk },
    UpdateExpression: "set temporaryExtensionType = :t",
    ExpressionAttributeValues: {
      ":t": value,
    },
    ReturnValues: "UPDATED_NEW",
  };

  if (value === "1915(b)") {
    params.UpdateExpression += ", componentType = :c";
    params.ExpressionAttributeValues[":c"] = "waiverextensionb";
  } else if (value === "1915(c)") {
    params.UpdateExpression += ", componentType = :c";
    params.ExpressionAttributeValues[":c"] = "waiverextensionc";
  }

  return params;
}

async function updateItemsBasedOnScan() {
  const params = {
    TableName: tableName,
    FilterExpression:
      "componentType = :ct and attribute_exists(temporaryExtensionType)",
    ExpressionAttributeValues: {
      ":ct": "waiverextension",
    },
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    console.log("Scan result:", result.Items);

    for (const item of result.Items) {
      const value = item.temporaryExtensionType;
      const updateParams = constructUpdateParams(item.pk, value);

      try {
        const updateResult = await dynamoDb.update(updateParams).promise();
        console.log("Update result:", updateResult);
      } catch (err) {
        console.error(
          "Unable to update item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      }
    }
  } catch (err) {
    console.error(
      "Unable to scan the table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  }
}

async function updateItemsBasedOnTemporaryExtensions() {
  for (const [pk, value] of Object.entries(temporaryExtensions)) {
    const params = constructUpdateParams(pk, value);

    try {
      const result = await dynamoDb.update(params).promise();
      console.log("Update result:", result);
    } catch (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  }
}

export const main = handler(async () => {
  await updateItemsBasedOnTemporaryExtensions();
  await updateItemsBasedOnScan();
});
