import dynamoDb from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";

export const getActiveUserNotifications = async (userId: string) => {
  const currentDate = new Date().toISOString();

  const params = {
    TableName: process.env.oneMacTableName, // Environment variable for the table name
    KeyConditionExpression: "pk = :user AND begins_with(sk, :prefix)", // Query by user and notification prefix
    FilterExpression:
      "dismissed = :dismissed AND publicationDate <= :currentDate AND (expiryDate >= :currentDate OR attribute_not_exists(expiryDate))",
    ExpressionAttributeValues: {
      ":user": `USER#${userId}`, // Partition key for the user
      ":prefix": "NOTIFICATION#", // Sort key prefix for notifications
      ":dismissed": false, // Only return notifications that have not been dismissed
      ":currentDate": currentDate, // Filter by current date for publication and expiry dates
    },
  };

  try {
    const result = await dynamoDb.query(params);
    return result.Items || [];
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    return {
      statusCode: 500,
      body: {
        message: "Error fetching active user notifications",
      },
    };
  }
};

// Lambda handler function
export const main = handler(async (event) => {
  const userId = event.pathParameters?.userId; // Extract the userId from path parameters or query string
  if (!userId) {
    return {
      statusCode: 400,
      body: { message: "userId is required" },
    };
  }

  // Call the function to get active user notifications
  return getActiveUserNotifications(userId);
});
