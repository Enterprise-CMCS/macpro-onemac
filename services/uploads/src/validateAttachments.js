//import AWS from "aws-sdk";

//import { ATTACHMENTS_BUCKET } from "./constants";
import dynamoDb from "../libs/dynamodb-lib";

//const s3 = new AWS.S3();

export async function validate(event) {
  console.log("In validate....", event);

  const params = {
    TableName: process.env.UPLOADS_TABLE_NAME,
    KeyConditionExpression: "userId = :userId AND id = :id",
    ExpressionAttributeValues: {
      ":userId": "us-east-1:4480cb87-b4ab-4556-acef-d91f38901059",
      ":id": "00748560-77be-11eb-8c50-7b02a5126084",
    },
  };

  const result = await dynamoDb.query(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  console.log("retrieved record", result);
}
