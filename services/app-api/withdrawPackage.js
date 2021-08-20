import handler from "./libs/handler-lib";
import { ChangeRequest, RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";

import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import getUser from "./utils/getUser";
import { getAuthorizedStateList } from "./user/user-util";
import updatePackage from "./utils/updatePackage";

const getPackage = async (packageId) => {
  const { Item: data } = await dynamoDb.get({
    TableName: process.env.oneMacTableName,
    Key: { pk: packageId, sk: "PACKAGE" },
  });

  if (!data) throw new Error("ItemNotFound");

  return data;
};

const formatPackageMetadata = (data) => `
<p>
  <br><b>State or territory</b>: ${data.packageId.substring(0, 2)}
  <br><b>Name</b>: ${data.submitterName}
  <br><b>Email Address</b>: ${data.submitterEmail}
  <br><b>Package ID</b>: ${data.packageId}
  <br><b>Package Type</b>: ${
    ChangeRequest.CONFIG[data.packageType].detailsHeader
  }
</p>
`;

const sendEmails = async (data) => {
  await sendEmail({
    ToAddresses: [process.env.reviewerEmail],
    Subject: `Package ${data.packageId} withdrawn in OneMAC`,
    HTML: `
      <p>The Submission Portal received a withdrawal request:</p>
      ${formatPackageMetadata(data)}
      <br>
      <p>
        If the contents of this email seem suspicious, do not open them, and
        instead forward this email to
        <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.
      </p>
      <p>Thank you!</p>
    `,
  });

  try {
    await sendEmail({
      ToAddresses: [
        ...data.changeHistory.map(({ submitterEmail }) => submitterEmail),
      ],
      Subject: `Your ${ChangeRequest.CONFIG[data.packageType].detailsHeader} ${
        data.packageId
      } has been withdrawn in OneMAC`,
      HTML: `
      <p>
        This is confirmation that you withdrew a ${
          ChangeRequest.CONFIG[data.packageType].detailsHeader
        } in
        OneMAC:
      </p>
      ${formatPackageMetadata(data)}
      <br>
      <p>
        This mailbox is for the submittal of State Plan Amendments and
        non-web-based responses to Requests for Additional Information (RAI) on
        submitted SPAs only.  Any other correspondence will be disregarded.
      </p>
      <p>
        If you have questions or did not expect this email, please contact
        <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a>
      </p>
      <p>Thank you!</p>
      `,
    });
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user acknowledgement email.",
      error
    );
  }
};

const validateUser = async (email, territory) => {
  const user = await getUser(email);

  if (!user) throw new Error(RESPONSE_CODE.USER_NOT_FOUND);

  const userRoleObj = getUserRoleObj(user.type);
  const territoryList = getAuthorizedStateList(user);
  return (
    userRoleObj.canAccessDashboard &&
    Array.isArray(territoryList) &&
    territoryList.includes(territory)
  );
};

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
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

  try {
    await updatePackage({
      ...body,
      packageStatus: "Withdrawn",
      submissionTimestamp: Date.now(),
    });
  } catch (e) {
    console.error("Failed to update package", e);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }

  try {
    const data = await getPackage(body.packageId);
    await sendEmails(data);
  } catch (e) {
    console.error("Failed to send acknowledgement email", e);
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }

  return RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS;
});
