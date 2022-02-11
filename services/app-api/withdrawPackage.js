import handler from "./libs/handler-lib";
import { RESPONSE_CODE, ChangeRequest } from "cmscommonlib";

import {
  CMSWithdrawalEmail,
  StateWithdrawalEmail,
} from "./changeRequest/formatWithdrawalEmails";
import sendEmail from "./libs/email-lib";
import updateComponent from "./utils/updateComponent";
import { validateUserSubmitting } from "./utils/validateUser";
import { getUser } from "./getUser";

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
  try {
    const { componentId, submitterEmail, submitterName } = body;
    updatedPackageData = await updateComponent({
      componentId,
      packageId: componentId,
      parentType: body.componentType,
      currentStatus: ChangeRequest.ONEMAC_STATUS.WITHDRAWN,
      submissionTimestamp: Date.now(),
      submitterEmail: submitterEmail.toLowerCase(),
      submitterName,
    });
  } catch (e) {
    console.error("Failed to update package", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }
  console.log("update Package Data is: ", updatedPackageData);
  try {
    await Promise.all(
      [CMSWithdrawalEmail, StateWithdrawalEmail]
        .map((f) => f(updatedPackageData))
        .map(sendEmail)
    );
  } catch (e) {
    console.error("Failed to send acknowledgement emails", e);
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }

  return RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS;
});
