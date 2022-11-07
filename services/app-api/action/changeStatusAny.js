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
    theEmails.map(sendEmail);
    sendEmail({
      Subject: "TEST 1: Medicaid SPA Package MD-22-4234 Withdraw Request",
      HTML:
        "\n" +
        "        <p>This is confirmation that you have requested to withdraw the package below. The package will no longer be considered for CMS review:</p>\n" +
        "        \n" +
        "      <p>\n" +
        "        <br><b>State or territory</b>: MD\n" +
        "        <br><b>Name</b>: StateSubmitter Nightwatch<br><b>Email Address</b>: statesubmitter@nightwatch.test\n" +
        "        \n" +
        "        <br><b>SPA ID</b>: MD-22-4234\n" +
        "        \n" +
        "        \n" +
        "        <br><b>Proposed Effective Date</b>: Nov 7 2022\n" +
        "        \n" +
        "      </p>\n" +
        "        <p>\n" +
        "          <b>Summary</b>:\n" +
        "          <br>This is just a test\n" +
        "        </p>\n" +
        "      \n" +
        "            <p>\n" +
        "            <b>Files</b>:\n" +
        "            <ul>\n" +
        "            <li>CMS Form 179: 15MB.pdf</li><li>SPA Pages: adobe.pdf</li>\n" +
        "            </ul>\n" +
        "            </p>\n" +
        "          \n" +
        "        <p>Thank you!</p>\n" +
        "        ",
      ToAddresses: [
        "StateSubmitter Nightwatch <statesubmitter@nightwatch.test>",
        "KristinState GrueAdmin <k.grue.stateadmn@gmail.com>",
        "Statesystemadmin Nightwatch <statesystemadmin@nightwatch.test>",
      ],
    });
    sendEmail({
      Subject: "TEST 2: Medicaid SPA Package MD-22-4234 Withdraw Request",
      HTML:
        "\n" +
        "        <p>This is confirmation that you have requested to withdraw the package below. The package will no longer be considered for CMS review:</p>\n" +
        "        \n" +
        "      <p>\n" +
        "        <br><b>State or territory</b>: MD\n" +
        "        <br><b>Name</b>: StateSubmitter Nightwatch<br><b>Email Address</b>: statesubmitter@nightwatch.test\n" +
        "        \n" +
        "        <br><b>SPA ID</b>: MD-22-4234\n" +
        "        \n" +
        "        \n" +
        "        <br><b>Proposed Effective Date</b>: Nov 7 2022\n" +
        "        \n" +
        "      </p>\n" +
        "        <p>\n" +
        "          <b>Summary</b>:\n" +
        "          <br>This is just a test\n" +
        "        </p>\n" +
        "      \n" +
        "            <p>\n" +
        "            <b>Files</b>:\n" +
        "            <ul>\n" +
        "            <li>CMS Form 179: 15MB.pdf</li><li>SPA Pages: adobe.pdf</li>\n" +
        "            </ul>\n" +
        "            </p>\n" +
        "          \n" +
        "        <p>Thank you!</p>\n" +
        "        ",
      ToAddresses: ["KristinState GrueAdmin <k.grue.stateadmn@gmail.com>"],
    });
  } catch (e) {
    console.error("Failed to send acknowledgement emails", e);
  }

  return config.successResponseCode;
};
