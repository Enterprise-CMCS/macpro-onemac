import { RESPONSE_CODE } from "cmscommonlib";
import { isEmpty, isObject } from "lodash";
import Joi from "joi";

import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

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
  if (!isObject(input)) input = JSON.parse(input);

  if (!validateInput(input)) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  try {
    await dynamoDb.update({
      TableName: process.env.userTableName,
      Key: { id: input.id },
      UpdateExpression: "SET phoneNumber = :phoneNumber",
      ExpressionAttributeValues: { ":phoneNumber": input.phoneNumber },
    });

    return RESPONSE_CODE.USER_SUBMITTED;
  } catch (error) {
    console.log("Could not update user in Dynamo", error);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }
});
