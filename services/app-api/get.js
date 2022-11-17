import AWS from "aws-sdk";
import { RESPONSE_CODE, dynamoConfig } from "cmscommonlib";

import handler from "./libs/handler-lib";

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'id': change request ID
    Key: {
      userId: event.pathParameters.userId,
      id: event.pathParameters.id,
    },
  };

  const result = await dynamoDb.get(params).promise();
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Generate a pre-signed URL for each attachment.
  if (Array.isArray(result.Item.uploads)) {
    try {
      const attachmentURLs = await Promise.all(
        result.Item.uploads.map(({ s3Key }) =>
          s3.getSignedUrlPromise("getObject", {
            Bucket: process.env.attachmentsBucket,
            Key: `protected/${result.Item.userId}/${s3Key}`,
            Expires: 3600,
          })
        )
      );

      attachmentURLs.forEach((url, idx) => {
        result.Item.uploads[idx].url = url;
      });
    } catch (e) {
      console.error("Failed to pre-sign URLs for attachment links", e);
      return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
    }
  }

  console.log("Sending back result:", JSON.stringify(result, null, 2));
  // Return the retrieved item
  return result.Item;
});
