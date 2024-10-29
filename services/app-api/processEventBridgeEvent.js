export const main = async (event) => {
  console.log("Received EventBridge event:", JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    try {
      console.log("Processing record:", record);
      // Insert business logic here, such as using `dynamoDb` for further database operations
    } catch (error) {
      console.error("Error processing record:", error);
    }
  }
};
