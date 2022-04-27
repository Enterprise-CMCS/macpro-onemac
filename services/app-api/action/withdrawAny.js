import dynamoDb from "./libs/dynamodb-lib";

import { RESPONSE_CODE, Workflow } from "cmscommonlib";

import { CMSWithdrawalNotice } from "./email/CMSWithdrawalNotice";
import { stateWithdrawalReceipt } from "./email/stateWithdrawalReceipt";
import sendEmail from "./libs/email-lib";
import updateComponent from "./utils/updateComponent";
import { validateUserSubmitting } from "./utils/validateUser";
import { getUser } from "./getUser";

export const withdrawAny = async (event, config) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  try {
    const user = await getUser(body.withdrawnByEmail);
    if (!validateUserSubmitting(user, body.componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  let updatedPackageData;
  const { componentId, withdrawnByEmail, withdrawnByName } = body;
  try {
    updatedPackageData = await updateComponent({
      componentId,
      componentType: config.componentType,
      currentStatus: Workflow.ONEMAC_STATUS.WITHDRAWN,
      withdrawnByEmail: withdrawnByEmail.toLowerCase(),
      withdrawnByName,
      withdrawnTimestamp: Date.now(),
    });

    if (updatedPackageData.parentId) {
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
    }
  } catch (e) {
    console.error("Failed to update package", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }

  try {
    await Promise.all(
      [CMSWithdrawalNotice, stateWithdrawalReceipt]
        .map((f) => f(updatedPackageData, config))
        .map(sendEmail)
    );
  } catch (e) {
    console.error("Failed to send acknowledgement emails", e);
  }

  return RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS;
};
