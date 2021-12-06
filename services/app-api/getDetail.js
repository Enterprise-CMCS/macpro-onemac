import AWS from "aws-sdk";
import { RESPONSE_CODE } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { validateUserReadOnly } from "./utils/validateUser";

const s3 = new AWS.S3();

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
    TableName: process.env.oneMacTableName,
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
    if (Array.isArray(result.Item.attachments)) {
      const attachmentURLs = await Promise.all(
        result.Item.attachments.map(({ url }) =>
          s3.getSignedUrlPromise("getObject", {
            Bucket: process.env.attachmentsBucket,
            Key: decodeURIComponent(url.split("amazonaws.com/")[1]),
            Expires: 3600,
          })
        )
      );

      attachmentURLs.forEach((url, idx) => {
        result.Item.attachments[idx].url = url;
      });
    }
    console.log("Sending back result:", JSON.stringify(result, null, 2));
    return { ...result.Item };
  } catch (e) {
    console.log("Error is: ", e);
    return {};
  }
};

export const main = handler(async (event) => {
  try {
    return getDetails(event);
  } catch (e) {
    console.log("error: ", e);
  }
});
