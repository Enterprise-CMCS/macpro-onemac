import { RESPONSE_CODE } from "cmscommonlib";

import { getUser } from "../getUser";
import { validateUserSubmitting } from "../utils/validateUser";
import updateComponent from "../utils/updateComponent";
import sendEmail from "../libs/email-lib";

export const changeStatusAny = async (event, config) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  try {
    const user = await getUser(body.changedByEmail);
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
    currentStatus: config.newStatus,
    lastModifiedEmail: body.changedByEmail.toLowerCase(),
    lastModifiedName: body.changedByName,
    lastModifiedTimestamp: Date.now(),
  };
  try {
    updatedPackageData = await updateComponent(updateData, config);
    console.log("Updated Package Data: ", updatedPackageData);
  } catch (e) {
    console.error("Failed to update package", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }

  try {
    const theEmails = await Promise.all(
      config.emailFunctions.map(
        async (f) => await f(updatedPackageData, config)
      )
    );
    console.log("the Emails: ", theEmails);
    await Promise.all(theEmails.map(sendEmail));
  } catch (e) {
    console.error("Failed to send acknowledgement emails", e);
  }

  return config.successResponseCode;
};
