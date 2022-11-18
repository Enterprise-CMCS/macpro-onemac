import AWS from "aws-sdk";
import { RESPONSE_CODE, Workflow } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { getUser } from "./getUser";
import { validateUserReadOnly } from "./utils/validateUser";

const s3 = new AWS.S3();

async function assignAttachmentUrls(item) {
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
  let detailsk = `v0#${componentType}`;
  if (
    detailsk.search(/rai/i) > -1 &&
    event.queryStringParameters.cNum &&
    event.queryStringParameters.cNum !== "undefined"
  )
    detailsk += `#${event.queryStringParameters.cNum}`;

  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: componentId,
      sk: detailsk,
    },
  };

  const raiComponentType =
    componentType.includes("waiver") && componentType !== "waiverappk"
      ? "waiver"
      : componentType;
  const raiSk = `v0#${raiComponentType}rai`;
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

    if (result.Item?.raiResponses.length === 0) {
      const raiResult = await dynamoDb.query(raiParams);
      result.Item.raiResponses = [...raiResult.Items];
    }
    if (result.Item?.raiResponses.length > 0) {
      for (const child of result.Item?.raiResponses) {
        await assignAttachmentUrls(child);
      }
    }

    if (Workflow.ALLOW_WAIVER_EXTENSION_TYPE.includes(componentType)) {
      //fetch any waiver extensions associated to this component
      const waiverExtensionParams = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI2",
        KeyConditionExpression: "GSI2pk = :pk AND GSI2sk = :sk",
        ExpressionAttributeValues: {
          ":pk": componentId,
          ":sk": `${Workflow.ONEMAC_TYPE.WAIVER_EXTENSION}`,
        },
      };

      const waiverExtensionResult = await dynamoDb.query(waiverExtensionParams);
      result.Item.waiverExtensions = [...waiverExtensionResult.Items];
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
