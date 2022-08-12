import { RESPONSE_CODE } from "cmscommonlib";
import dynamoDb from "./libs/dynamodb-lib";

import { getUser } from "../getUser";
import { validateUserSubmitting } from "../utils/validateUser";

export const validateParentOfAny = async (event, config) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  try {
    const user = await getUser(body.changedByEmail);
    if (!validateUserSubmitting(user, body.componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  const parentParams = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk AND begins_with(sk,:version)",
    ExpressionAttributeValues: {
      ":pk": body.componentId,
      ":version": "v0#",
    },
    ExpressionAttributeNames: {
      "#parentType": "componentType",
      "#parentStatus": "currentStatus",
    },
    ProjectionExpression: "#parentType, #parentStatus",
  };
  const result = await dynamoDb.query(parentParams);

  if (!result?.Items) return false;

  return result.Items.find((item) => config.couldBeMyParent(item)) ?? false;
};
