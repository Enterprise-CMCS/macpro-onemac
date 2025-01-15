import AWS from "aws-sdk";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { getUser } from "./getUser";
import { cmsStatusUIMap, stateStatusUIMap } from "./libs/status-lib";
import { validateUserReadOnly } from "./utils/validateUser";
import { getActionsForPackage } from "./utils/actionDelegate";

const s3 = new AWS.S3();

async function generateSignedUrl(item) {
  if (Array.isArray(item.attachments)) {
    const attachmentURLs = await Promise.all(
      item?.attachments.map(({ url }) =>
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

async function assignAttachmentUrls(item) {
  if (item?.reverseChrono?.length > 0 && Array.isArray(item.reverseChrono)) {
    for (const child of item.reverseChrono) {
      await generateSignedUrl(child);
    }
  }
}

export const getDetails = async (event) => {
  const componentId = event?.pathParameters?.id;
  let userRoleObj;
  if (!componentId) return RESPONSE_CODE.VALIDATION_ERROR;

  try {
    const user = await getUser(event.queryStringParameters.email);
    userRoleObj = getUserRoleObj(user.roleList);

    if (!validateUserReadOnly(user, componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    console.log("error : ", e);
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: componentId,
      sk: "Package",
    },
  };

  try {
    const result = await dynamoDb.get(params);
    if (!result.Item) {
      return {};
    }

    await assignAttachmentUrls(result.Item);

    if (result.Item.waiverAuthority)
      result.Item.temporaryExtensionType = result.Item.waiverAuthority.slice(
        0,
        7
      );

    const originalStatus = result.Item.currentStatus;
    result.Item.currentStatus = userRoleObj.isCMSUser
      ? cmsStatusUIMap[result.Item.currentStatus]
      : stateStatusUIMap[result.Item.currentStatus];

    if (!userRoleObj.canSeeSubjectAndDescription) {
      if (result.Item.subject) delete result.Item.subject;
      if (result.Item.description) delete result.Item.description;
    }

    if (!userRoleObj.isCMSUser && result.Item.reviewTeam)
      delete result.Item.reviewTeam;

    result.Item.actions = await getActionsForPackage(
      result.Item.componentType,
      originalStatus,
      !!result.Item.latestRaiResponseTimestamp,
      result.Item.subStatus,
      userRoleObj,
      "detail"
    );

    if (result.Item.subStatus) {
      result.Item.subStatus = userRoleObj.isCMSUser
        ? cmsStatusUIMap[result.Item.subStatus]
        : stateStatusUIMap[result.Item.subStatus];
    }

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
