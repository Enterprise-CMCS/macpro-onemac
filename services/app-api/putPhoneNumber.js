import { RESPONSE_CODE } from "cmscommonlib";

import handler from "./libs/handler-lib";
import isLambdaWarmup from "./libs/lambda-warmup";
import dynamoDb from "./libs/dynamodb-lib";

/**
 * Update a user's phone number
 */
export const main = handler(async (event) => {
  if (isLambdaWarmup(event)) return null;

  if (!validatePhoneNumber(event) || !validateUserId(event)) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  try {
    await dynamoDb.update({
      TableName: process.env.userTableName,
      Key: { id: event.queryStringParameters.id },
      UpdateExpression: "SET phoneNumber = :phoneNumber",
      // the reason for the default value is that lambda interprets the empty
      // string in a request body as `null`
      ExpressionAttributeValues: { ":phoneNumber": event.body ?? "" },
    });

    return RESPONSE_CODE.USER_SUBMITTED;
  } catch (error) {
    console.log("Could not update user in Dynamo", error);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }
});

const validatePhoneNumber = ({ body }) => {
  if (typeof body === "string" || body === null) return true;

  console.error("User submitted a phone number that was not a string", body);
};

const validateUserId = ({ queryStringParameters: { id } }) => {
  if (id) return true;

  console.error("ID to update was not provided");
};
