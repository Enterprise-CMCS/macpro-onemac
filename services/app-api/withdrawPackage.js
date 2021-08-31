import handler from "./libs/handler-lib";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";

import {
  CMSWithdrawalEmail,
  StateWithdrawalEmail,
} from "./changeRequest/formatWithdrawalEmails";
import sendEmail from "./libs/email-lib";
import getUser from "./utils/getUser";
import { getAuthorizedStateList } from "./user/user-util";
import updatePackage from "./utils/updatePackage";

export const validateUser = async (email, territory) => {
  const user = await getUser(email);

  if (!user) throw new Error(RESPONSE_CODE.USER_NOT_FOUND);

  const userRoleObj = getUserRoleObj(user.type);
  const territoryList = getAuthorizedStateList(user);
  return (
    userRoleObj.canAccessForms &&
    Array.isArray(territoryList) &&
    territoryList.includes(territory)
  );
};

export const main = handler(async (event) => {
  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  if (!validateUser(body.submitterEmail, body.packageId.substring(0, 2))) {
    return RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }

  let updatedPackageData;
  try {
    updatedPackageData = await updatePackage({
      ...body,
      packageStatus: "Withdrawn",
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
