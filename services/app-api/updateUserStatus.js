import {
  RESPONSE_CODE,
  USER_STATUS,
  territoryMap,
  roleLabels,
  APPROVING_USER_ROLE,
  USER_ROLE,
} from "cmscommonlib";
import handler from "./libs/handler-lib";
import sendEmail from "./libs/email-lib";
import { saveEmail } from "./utils/saveEmail";

import { getUser } from "./getUser";
import { changeUserStatus } from "./utils/changeUserStatus";
import { getMyApprovers } from "./getMyApprovers";
import { logAttempt } from "./utils/logAttempt";

const statusLabels = {
  [USER_STATUS.ACTIVE]: "granted",
  [USER_STATUS.DENIED]: "denied",
  [USER_STATUS.REVOKED]: "revoked",
};

export const accessChangeNotice = (
  territory,
  fullName,
  role,
  email,
  status
) => {
  const moreSpecificAccess =
    territory === "N/A" ? "" : ` for ${territoryMap[territory]}`;

  return {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [`${fullName} <${email}>`],
    Subject: `Your OneMAC ${roleLabels[role]} Access${moreSpecificAccess} has been ${statusLabels[status]}`,
    HTML: `<p>Hello,</p><p>Your access as a ${
      roleLabels[role]
    }${moreSpecificAccess} has been ${
      statusLabels[status]
    }. If you have any questions, please reach out to your ${
      roleLabels[APPROVING_USER_ROLE[role]]
    }.</p><p>Thank you!</p>`,
  };
};

export const selfRevokeAdminNotice = (territory, fullName, approverList) => {
  return {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: approverList.map(
      ({ fullName, email }) => `${fullName} <${email}>`
    ),
    Subject: `OneMAC State access for ${territoryMap[territory]} was self-revoked by ${fullName}`,
    HTML: `<p>Hello,</p><p>The OneMAC State access for ${territoryMap[territory]} has been self-revoked by ${fullName}. Please log into your User Management Dashboard to see the updated access.</p><p>Thank you!</p>`,
  };
};

export const doUpdate = async (body, doneBy, doneTo) => {
  try {
    await changeUserStatus({
      ...body,
      doneByName: doneBy.fullName,
      fullName: doneTo.fullName,
    });
  } catch (e) {
    console.error(`Could not update user %s's status`, body.email, e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  try {
    const accessChangeEmail = accessChangeNotice(
      body.territory,
      doneTo.fullName,
      body.role,
      doneTo.email,
      body.status
    );
    await sendEmail(accessChangeEmail);
  } catch (e) {
    console.log("failed to send email: ", e);
  }
};

export const updateUserStatus = async (event) => {
  let body;
  const rightNowNormalized = Date.now();
  const ipAddress = event.requestContext.identity.sourceIp;

  try {
    body = JSON.parse(event.body);
  } catch (e) {
    logAttempt("updateUserStatus", false, ipAddress);
    console.error("Failed to parse body", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  body.date = rightNowNormalized;
  let doneBy, doneTo;
  try {
    [doneBy, doneTo] = await Promise.all([
      getUser(body.doneByEmail),
      getUser(body.email),
    ]);
  } catch (e) {
    logAttempt("updateUserStatus", false, ipAddress);
    console.error("Could not fetch relevant user info", e);
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  if (body.status === USER_STATUS.ACTIVE) {
    for (const { role, status, territory } of doneTo.roleList) {
      if (role !== body.role && status === USER_STATUS.ACTIVE) {
        await doUpdate(
          { ...body, role, territory, status: USER_STATUS.REVOKED },
          doneBy,
          doneTo
        );
      }
    }
  }

  if (
    body.status === USER_STATUS.DENIED ||
    body.status === USER_STATUS.REVOKED
  ) {
    for (const { role, territory } of doneTo.roleList) {
      if (role === USER_ROLE.DEFAULT_CMS_USER) {
        await doUpdate(
          { ...body, role, territory, status: USER_STATUS.ACTIVE },
          doneBy,
          doneTo
        );
      }
    }
  }

  await doUpdate(body, doneBy, doneTo);

  try {
    if (
      body.email === body.doneByEmail &&
      body.status === USER_STATUS.REVOKED
    ) {
      const approverList = await getMyApprovers(body.role, body.territory);
      const selfRevokeEmail = selfRevokeAdminNotice(
        body.territory,
        doneTo.fullName,
        approverList
      );
      const emailReturn = await sendEmail(selfRevokeEmail);
      selfRevokeEmail.componentId = body.email;
      selfRevokeEmail.eventTimestamp = rightNowNormalized;
      await saveEmail(
        emailReturn.MessageId,
        `updateUserStatus`,
        "CMS",
        selfRevokeEmail
      );
    }
  } catch (e) {
    logAttempt("updateUserStatus", false, ipAddress, body.user);
    console.log("failed to send email: ", e);
  }

  logAttempt("updateUserStatus", true, ipAddress, body.user);
  return RESPONSE_CODE.USER_SUBMITTED;
};

export const main = handler(updateUserStatus);
