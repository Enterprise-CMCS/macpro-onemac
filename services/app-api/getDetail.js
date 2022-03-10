import AWS from "aws-sdk";
import { RESPONSE_CODE } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { getUser } from "./getUser";
import { validateUserReadOnly } from "./utils/validateUser";

const s3 = new AWS.S3();

async function assignAttachmentUrls(item) {
  console.log("url item", JSON.stringify(item, null, 2));
  if (Array.isArray(item.attachments)) {
    const attachmentURLs = await Promise.all(
      item.attachments.map(({ url }) =>
        s3.getSignedUrlPromise("getObject", {
          Bucket: process.env.attachmentsBucket,
          Key: decodeURIComponent(url.split("amazonaws.com/")[1]),
          Expires: 3600,
        })
      )
    );

    attachmentURLs.forEach((url, idx) => {
      item.attachments[idx].url = url;
    });
  }
}
export const getDetails = async (event) => {
  const componentId = event?.pathParameters?.id;
  if (!componentId) return RESPONSE_CODE.VALIDATION_ERROR;

  try {
    const user = await getUser(event.queryStringParameters.email);
    if (!validateUserReadOnly(user, componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    console.log("error : ", e);
    return RESPONSE_CODE.VALIDATION_ERROR;
  }
  const componentType = event.queryStringParameters.cType;
  let detailsk = componentType;
  if (
    detailsk != "spa" &&
    detailsk != "chipspa" &&
    detailsk != "waivernew" &&
    detailsk != "waiverrenewal" &&
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

  const raiSk = componentType + "rai";
  const raiParams = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk AND begins_with(sk,:sk)",
    ExpressionAttributeValues: {
      ":pk": componentId,
      ":sk": raiSk,
    },
    ScanIndexForward: false, //get records in reverse chronological order
  };

  try {
    const result = await dynamoDb.get(params);
    if (!result.Item) {
      return {};
    }

    await assignAttachmentUrls(result.Item);

    const raiResult = await dynamoDb.query(raiParams);
    if (raiResult.Count > 0) {
      for (const child of raiResult.Items) {
        await assignAttachmentUrls(child);
      }
      result.Item.raiResponses = raiResult.Items.slice(0); //replace the static children with fresh result from query
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
