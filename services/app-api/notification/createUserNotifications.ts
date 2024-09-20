import dynamoDb from "../libs/dynamodb-lib"; // Import shared DynamoDB library
import handler from "../libs/handler-lib"; // Lambda handler wrapper

export const getUserTargetedSystemNotifications = async () => {
  const currentDate = new Date().toISOString();

  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression:
      "GSI1pk = :userNotification AND GSI1sk BETWEEN :pubStart AND :pubEnd",
    FilterExpression:
      "pk = :system AND (expiryDate >= :currentDate OR attribute_not_exists(expiryDate))", // pk filter and expiry check
    ExpressionAttributeValues: {
      ":userNotification": "USER_NOTIFICATION", // GSI1pk for user notifications
      ":pubStart": `0000-01-01T00:00:00Z#${currentDate}`, // Start from the earliest possible date
      ":pubEnd": `${currentDate}#9999-12-31T23:59:59Z`, // End at the far future expiry date
      ":system": "SYSTEM", // Ensure pk is SYSTEM
      ":currentDate": currentDate, // Current date to filter out expired notifications
    },
  };

  const result = await dynamoDb.query(params);
  return result.Items;
};

// Function to get all user notifications (including dismissed)
export const getAllUserNotifications = async (userId: string) => {
  const params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :user AND begins_with(sk, :notification)",
    ExpressionAttributeValues: {
      ":user": `USER#${userId}`,
      ":notification": "NOTIFICATION#",
    },
  };

  const result = await dynamoDb.query(params);
  return result.Items;
};

// Function to insert missing notifications
export const insertMissingNotifications = async (
  userId: string,
  notifications: any[]
) => {
  const putRequests = notifications.map((notification) => {
    const newNotification = {
      ...notification, // Copy notification data from system notification
      pk: `USER#${userId}`,
      sk: notification.sk,
      dismissed: false, // Default to not dismissed for the user
    };

    return {
      PutRequest: {
        Item: newNotification,
      },
    };
  });

  const params = {
    RequestItems: {
      [process.env.oneMacTableName as string]: putRequests,
    },
  };

  console.log(
    "Inserting missing notifications:",
    JSON.stringify(putRequests, null, 2)
  );

  // DynamoDB batch write to insert multiple items
  await dynamoDb.batchWrite(params).promise();
};

// Main Lambda function to create user notifications upon login
export const createUserNotifications = async (userId: string) => {
  // Step 1: Get all user-targeted system notifications
  const systemNotifications =
    (await getUserTargetedSystemNotifications()) || [];

  // Exit early if there are no active user-targeted system notifications
  if (systemNotifications.length === 0) {
    console.log("No active user-targeted system notifications found.");
    return {
      statusCode: 200,
      body: {
        message: "No active user-targeted system notifications to sync.",
        insertedCount: 0,
      },
    };
  }

  // Step 2: Get all user notifications (including dismissed)
  const userNotifications = (await getAllUserNotifications(userId)) || [];

  // Step 3: Find the missing notifications
  const existingNotificationIds = new Set(
    userNotifications.map((notif) => notif.sk.split("#")[1]) // Extract notificationId from user notification sk
  );

  // Filter system notifications to find the ones not yet created for this user
  const missingNotifications = systemNotifications.filter(
    (notif) => !existingNotificationIds.has(notif.sk.split("#")[1]) // Compare system notificationId with user notificationId
  );

  // Step 4: Insert missing notifications
  if (missingNotifications.length > 0) {
    await insertMissingNotifications(userId, missingNotifications);
  }

  return {
    statusCode: 200,
    body: {
      message: "User notifications synced successfully.",
      insertedCount: missingNotifications.length,
    },
  };
};

export const main = handler(async (event) => {
  // Extract the email from the token claims
  const userEmail = event.requestContext.authorizer?.claims?.email;

  if (!userEmail) {
    return {
      statusCode: 400,
      body: { message: "userEmail is required" },
    };
  }

  // Call the function to create missing user notifications, passing the email
  return createUserNotifications(userEmail);
});
