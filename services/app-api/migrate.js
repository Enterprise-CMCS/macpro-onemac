import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

import { temporaryExtensions } from "./migrateData";

/**
 * Perform data migrations
 */

const tableName = process.env.oneMacTableName;

function constructUpdateParams(pk, sk, value) {
  const params = {
    TableName: tableName,
    Key: { pk: pk, sk: sk },
    UpdateExpression: "set temporaryExtensionType = :t",
    ExpressionAttributeValues: {
      ":t": value,
    },
    ReturnValues: "UPDATED_NEW",
  };

  if (value === "1915(b)") {
    params.UpdateExpression += ", componentType = :c, GSI1pk = :gsi1pk";
    params.ExpressionAttributeValues[":c"] = "waiverextensionb";
    params.ExpressionAttributeValues[":gsi1pk"] =
      "OneMAC#submitwaiverextensionb";
  } else if (value === "1915(c)") {
    params.UpdateExpression += ", componentType = :c, GSI1pk = :gsi1pk";
    params.ExpressionAttributeValues[":c"] = "waiverextensionc";
    params.ExpressionAttributeValues[":gsi1pk"] =
      "OneMAC#submitwaiverextensionc";
  }

  return params;
}

async function updateItemsBasedOnMappedList() {
  for (const [pk, value] of Object.entries(temporaryExtensions)) {
    const queryParams = {
      TableName: tableName,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1pk = :gsi1pk and GSI1sk = :gsi1sk",
      ExpressionAttributeValues: {
        ":gsi1pk": "OneMAC#submitwaiverextension",
        ":gsi1sk": pk,
      },
    };

    try {
      const queryResult = await dynamoDb.query(queryParams);
      console.log("Query result:", queryResult.Items);
      if (queryResult.Items.length === 0) {
        console.log("No items found for pk:", pk);
        continue;
      }
      const sk = queryResult.Items[0].sk;
      const params = constructUpdateParams(pk, sk, value);

      console.log("Update params:", params);
      const result = await dynamoDb.update(params);
      console.log("Update result:", result);
    } catch (err) {
      console.log("Error:", err);
    }
  }
}

export const main = handler(async () => {
  //update the list of known mapped items first
  await updateItemsBasedOnMappedList();
});
