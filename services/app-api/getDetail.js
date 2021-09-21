import { RESPONSE_CODE } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { validateUserReadOnly } from "./utils/validateUser";

export const getDetails = async (event) => {
  console.log("user email is: ", event.queryStringParameters.email);

  const componentId = event.pathParameters.id;

  try {
    const user = await getUser(event.queryStringParameters.email);
    if (!validateUserReadOnly(user, componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    console.log("error : ", e);
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  let detailsk = event.queryStringParameters.cType;
  if (
    detailsk != "spa" &&
    detailsk != "chipspa" &&
    detailsk != "waivernew" &&
    event.queryStringParameters.cNum
  )
    detailsk += `#${event.queryStringParameters.cNum}`;

  const params = {
    TableName: process.env.oneMACTableName,
    Key: {
      pk: componentId,
      sk: detailsk,
    },
  };
  console.log("getDetail parameters: ", params);
  try {
    const result = await dynamoDb.get(params);
    if (!result.Item) {
      return {};
    }
    console.log("Sending back result:", JSON.stringify(result, null, 2));
    return { ...result.Item };
  } catch (e) {
    console.log("Error is: ", e);
    return {};
  }
};

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  try {
    return getDetails(event);
  } catch (e) {
    console.log("error: ", e);
  }
});
