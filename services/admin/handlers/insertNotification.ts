import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import { addDays } from "date-fns"; // Import a date manipulation library like date-fns for handling date parsing

const dynamoDb = new DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);
const oneMacTableName = process.env.oneMacTableName || "defaultTableName";

// Define types for event and notification record
interface EventInput {
  publicationDate?: string;
  expiryDate?: string;
  header: string;
  body: string;
  buttonText?: string;
  buttonLink?: string;
  notificationType: "user" | "system"; // User-friendly notification type input
}

interface NotificationRecord {
  pk: string;
  sk: string;
  GSI1pk: string;
  GSI1sk: string;
  publicationDate: string;
  expiryDate: string;
  header: string;
  body: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  createdAt: string;
}

// Function to translate notificationType to GSI1pk value
function mapNotificationType(type: "user" | "system"): string {
  return type === "user" ? "USER_NOTIFICATION" : "SYSTEM";
}

// Function to handle flexible date inputs
function parseDate(input?: string): string {
  // If no input is provided, default to the current date
  if (!input) {
    return new Date().toISOString();
  }

  if (input === "today") {
    return new Date().toISOString();
  }

  if (input.includes("days from now")) {
    const days = parseInt(input.split(" ")[0], 10);
    return addDays(new Date(), days).toISOString();
  }

  // Assuming user passes YYYY-MM-DD format for easier input
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(`${input}T00:00:00Z`).toISOString();
  }

  // Default to current date if input is invalid
  return new Date().toISOString();
}

function validateEvent(event: EventInput): void {
  const missingParams: string[] = [];

  if (!event.header) {
    missingParams.push("header");
  }
  if (!event.body) {
    missingParams.push("body");
  }
  if (!event.notificationType) {
    missingParams.push("notificationType");
  }
  if (missingParams.length > 0) {
    throw new Error(`Missing event parameters: ${missingParams.join(", ")}`);
  }

  console.log("Event passed validation");
}

function generateNotificationId(): string {
  return uuidv4();
}

function formatNotificationRecord(event: EventInput): NotificationRecord {
  const notificationId = generateNotificationId(); // Generate a UUID for the notification ID
  const pk = "SYSTEM"; // System-wide notification
  const sk = `NOTIFICATION#${notificationId}`; // Unique notification identifier

  // Default values for publicationDate and expiryDate with more user-friendly inputs
  const publicationDate = parseDate(event.publicationDate); // Default to current date
  const expiryDate = event.expiryDate
    ? parseDate(event.expiryDate)
    : "9999-12-31T23:59:59Z"; // Default to far future date

  // Use the translated notificationType
  const GSI1pk = mapNotificationType(event.notificationType);
  const GSI1sk = `${publicationDate}#${expiryDate}`; // Sort key for GSI based on dates
  const createdAt = new Date().toISOString(); // Current timestamp

  return {
    pk,
    sk,
    GSI1pk,
    GSI1sk,
    publicationDate,
    expiryDate,
    header: event.header,
    body: event.body,
    buttonText: event.buttonText || null, // Optional field
    buttonLink: event.buttonLink || null, // Optional field
    createdAt,
  };
}

async function insertNotification(record: NotificationRecord): Promise<void> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: oneMacTableName,
    Item: record,
  };

  console.log("Inserting notification", params);

  await dynamoDb.put(params).promise();
}

export const main = async (event: EventInput) => {
  console.log("insertNotification.main", event);

  validateEvent(event);

  const notificationRecord = formatNotificationRecord(event);

  await insertNotification(notificationRecord);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Notification inserted successfully",
      record: notificationRecord, // Return the full inserted record
    }),
  };
};
