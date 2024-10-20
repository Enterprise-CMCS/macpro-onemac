import dynamoDb from "../libs/dynamodb-lib";
import { RESPONSE_CODE } from "cmscommonlib";
import handler from "../libs/handler-lib";

/**
 * Get active system notifications
 * Returns an empty array if no notifications are found
 * @returns the list of active system notifications or an empty array
 */
export const getActiveSystemNotifications = async () => {
  const currentDate = new Date().toISOString();
  console.log("oneMacTableName:", process.env.oneMacTableName); // Log the env variable

  const params = {
    TableName: process.env.oneMacTableName, // Use the environment variable for the table name
    IndexName: "GSI1", // Use your GSI1 index name
    KeyConditionExpression:
      "GSI1pk = :systemType AND GSI1sk BETWEEN :pubStart AND :pubEnd",
    FilterExpression:
      "expiryDate >= :currentDate OR attribute_not_exists(expiryDate)",
    ExpressionAttributeValues: {
      ":systemType": "SYSTEM", // For system notifications
      ":pubStart": `0000-01-01T00:00:00Z#${currentDate}`, // Start from the earliest possible date
      ":pubEnd": `${currentDate}#9999-12-31T23:59:59Z`, // End at the far-future expiry date
      ":currentDate": currentDate, // Use the current date to filter out expired records
    },
  };

  try {
    const result = await dynamoDb.query(params); // Using the custom dynamoDb query method
    return result.Items || []; // Return the list of notifications or an empty array if none
  } catch (error) {
    console.log("Error fetching system notifications: ", error);
    return {
      statusCode: RESPONSE_CODE.SYSTEM_ERROR,
      body: {
        message: "There was an error fetching the active system notifications.",
      },
    };
  }
};

/**
 * Main handler function to expose via API Gateway or Lambda
 */
export const main = handler(async () => {
  try {
    return getActiveSystemNotifications();
  } catch (error) {
    console.log("Error: ", error);
    return {
      statusCode: RESPONSE_CODE.SERVER_ERROR,
      body: JSON.stringify({
        message: "Internal Server Error.",
      }),
    };
  }
});
