import handler from "./libs/handler-lib";
import { RESPONSE_CODE } from "cmscommonlib";

import {
  CMSWithdrawalEmail,
  StateWithdrawalEmail,
} from "./changeRequest/formatWithdrawalEmails";
import sendEmail from "./libs/email-lib";
import updateComponent from "./utils/updateComponent";
import { validateUserSubmitting } from "./utils/validateUser";
import getUser from "./utils/getUser";

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
    updatedPackageData = await updateComponent({
      ...body,
      packageId: body.componentId,
      parentType: body.componentType,
      currentStatus: "Withdrawn",
      submissionTimestamp: Date.now(),
    });
  } catch (e) {
    console.error("Failed to update package", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }

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
