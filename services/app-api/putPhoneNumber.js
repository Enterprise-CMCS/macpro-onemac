import AWS from "aws-sdk";
import { RESPONSE_CODE, dynamoConfig } from "cmscommonlib";
import { isEmpty, isObject } from "lodash";
import Joi from "joi";

import handler from "./libs/handler-lib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const validateInput = (input) => {
  const schema = Joi.object().keys({
    id: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phoneNumber: Joi.string().required().allow(""),
  });

  const result = isEmpty(input)
    ? { error: "No request body sent" }
    : schema.validate(input);

  if (!result.error) {
    return true;
  }

  console.log("Validation error:", result.error);
};

/**
 * Update a user's phone number
 */
export const main = handler(async (event) => {
  let input = event.body;
  try {
    if (!isObject(input)) input = JSON.parse(input);

    if (!validateInput(input)) {
      throw "Validate input returned undefined";
    }
  } catch (e) {
    console.log("Error is", e);
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  try {
    await dynamoDb
      .update({
        TableName: process.env.oneMacTableName,
        Key: { pk: input.id, sk: "ContactInfo" },
        UpdateExpression: "SET phoneNumber = :phoneNumber",
        ExpressionAttributeValues: { ":phoneNumber": input.phoneNumber },
      })
      .promise();

    return RESPONSE_CODE.USER_SUBMITTED;
  } catch (error) {
    console.log("Could not update user in Dynamo", error);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }
});
