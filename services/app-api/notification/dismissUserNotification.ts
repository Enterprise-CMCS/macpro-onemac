import dynamoDb from "../libs/dynamodb-lib"; // Import shared DynamoDB library
import handler from "../libs/handler-lib"; // Lambda handler wrapper

export const dismissUserNotification = async (
  userId: string,
  notificationId: string
) => {
  const params = {
    TableName: process.env.oneMacTableName, // Environment variable for the table name
    Key: {
      pk: `USER#${userId}`, // Partition key for the user
      sk: `NOTIFICATION#${notificationId}`, // Sort key for the notification
    },
    UpdateExpression: "SET dismissed = :dismissed",
    ExpressionAttributeValues: {
      ":dismissed": true, // Mark the notification as dismissed
    },
    ReturnValues: "UPDATED_NEW", // Return the updated attributes
  };

  try {
    const result = await dynamoDb.update(params);
    return {
      statusCode: 200,
      body: result.Attributes, // Return the updated notification attributes
    };
  } catch (error) {
    console.error("Error dismissing user notification:", error);
    return {
      statusCode: 500,
      body: {
        message: "Error dismissing user notification",
      },
    };
  }
};

// Lambda handler function
export const main = handler(async (event) => {
  const userId = event.pathParameters?.userId; // Extract the userId from path parameters
  const notificationId = event.pathParameters?.notificationId; // Extract the notificationId from path parameters

  if (!userId || !notificationId) {
    return {
      statusCode: 400,
      body: { message: "userId and notificationId are required" },
    };
  }

  // Call the function to mark the notification as dismissed
  return dismissUserNotification(userId, notificationId);
});
