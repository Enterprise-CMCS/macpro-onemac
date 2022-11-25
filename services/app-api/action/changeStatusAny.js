import { RESPONSE_CODE } from "cmscommonlib";

import dynamoDb from "../libs/dynamodb-lib";

import { getUser } from "../getUser";
import { validateUserSubmitting } from "../utils/validateUser";
// import updateComponent from "../utils/updateComponent";
import sendEmail from "../libs/email-lib";

export const changeStatusAny = async (event, config) => {
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }

  let user;
  try {
    user = await getUser(body.changedByEmail);
    if (!validateUserSubmitting(user, body.componentId.substring(0, 2))) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (e) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  try {
    const rightNowNormalized = Date.now();
    data.submissionTimestamp = rightNowNormalized;
    data.currentStatus = config.newStatus;
    data.currentStatusTimestamp = rightNowNormalized;
    data.lastModifiedEmail = data.changedByEmail.toLowerCase();
    data.lastModifiedName = data.changedByName;
    data.lastModifiedTimestamp = rightNowNormalized;
    data.componentType = config.componentType;

    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: data.componentId,
        sk: `OneMAC#${data.submissionTimestamp}`,
        GSI1pk: `OneMAC#withdraw${config.componentType}`,
        GSI1sk: data.componentId,
        ...data,
      },
      ConditionExpression: "attribute_not_exists(pk)",
    };

    console.log(
      "params for changeStatusAny: ",
      JSON.stringify(putParams, null, 2)
    );
    await dynamoDb.put(putParams);

    // updatedPackageData = await updateComponent(updateData, config);
    // console.log("Updated Package Data: ", updatedPackageData);
  } catch (e) {
    console.error("Failed to add new package event", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }

  try {
    const theEmails = await Promise.all(
      config.emailFunctions.map(
        async (f) => await f(updatedPackageData, config, user)
      )
    );
    console.log("the Emails: ", theEmails);
    await Promise.all(theEmails.map(sendEmail));
  } catch (e) {
    console.error("Failed to send acknowledgement emails", e);
  }

  return config.successResponseCode;
};
