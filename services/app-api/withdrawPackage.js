// import dynamoDb from "./libs/dynamodb-lib";

import handler from "./libs/handler-lib";
import { RESPONSE_CODE, Workflow } from "cmscommonlib";

import { validateUserSubmitting } from "./utils/validateUser";
import { getUser } from "./getUser";
import updateComponent from "./utils/updateComponent";
import updateParent from "./utils/updateParent";
import { CMSWithdrawalNotice } from "./email/CMSWithdrawalNotice";
import { stateWithdrawalReceipt } from "./email/stateWithdrawalReceipt";
import sendEmail from "./libs/email-lib";

export const main = handler(async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
    const user = await getUser(body.submitterEmail);
    if (!validateUserSubmitting(user, body.componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  let updatedPackageData;
  const updateData = {
    componentId: body.componentId,
    componentType: body.componentType,
    currentStatus: Workflow.ONEMAC_STATUS.WITHDRAWN,
    lastModifiedEmail: body.submitterEmail.toLowerCase(),
    lastModifiedName: body.submitterName,
    lastModifiedTimestamp: Date.now(),
  };
  try {
    updatedPackageData = await updateComponent(updateData);
    console.log("Updated Package Data: ", updatedPackageData);
    updateData.submissionTimestamp = updatedPackageData.submissionTimestamp;

    if (updatedPackageData.parentId) {
      updateParent(updateData);
      /*
      const params = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: updatedPackageData.parentId,
          sk: updatedPackageData.parentType,
        },
      };

      const parentComponent = await dynamoDb.get(params);
      if (parentComponent.Item) {
        console.log("parent Component: ", parentComponent);
        const favoriteChild = parentComponent.Item.children.findIndex(
          (child) => {
            return (
              child.componentId === componentId &&
              child.componentType === componentType &&
              child.submissionTimestamp ===
                updatedPackageData.submissionTimestamp
            );
          }
        );
        const updateParams = {
          ...params,
          UpdateExpression: `SET children[${favoriteChild}].currentStatus = :newStatus`,
          ExpressionAttributeValues: {
            ":newStatus": Workflow.ONEMAC_STATUS.WITHDRAWN,
          },
          ReturnValues: "ALL_NEW",
        };

        console.log(await dynamoDb.update(updateParams));
      }
      */
    }
  } catch (e) {
    console.error("Failed to update package", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }

  const emailData = {
    ...updatedPackageData,
    submitterName: body.submitterName,
    submitterEmail: body.submitterEmail,
  };

  try {
    await Promise.all(
      [CMSWithdrawalNotice, stateWithdrawalReceipt]
        .map((f) => f(emailData))
        .map(sendEmail)
    );
  } catch (e) {
    console.error("Failed to send acknowledgement emails", e);
  }

  return RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS;
});
