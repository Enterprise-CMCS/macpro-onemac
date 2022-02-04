import {
  RESPONSE_CODE,
  USER_STATUS,
  roleLabels,
  territoryMap,
} from "cmscommonlib";

import handler from "./libs/handler-lib";
import sendEmail from "./libs/email-lib";

import getUser from "./utils/getUser";
import { changeUserStatus } from "./utils/changeUserStatus";
import { getMyApprovers } from "./getMyApprovers";

export const adminNotice = (territory, fullName, approverList, role) => {
  const moreSpecificAccess =
    territory === "N/A" ? "" : ` for ${territoryMap[territory]}`;

  const email = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: approverList.map(
      ({ fullName, email }) => `${fullName} <${email}>`
    ),
  };
  email.Subject = `New OneMAC ${roleLabels[role]} Access Request`;
  email.HTML = `
    <p>Hello,</p>

    There is a new OneMAC ${roleLabels[role]} access request${moreSpecificAccess} from
    ${fullName} waiting for your review.  Please log into your
    User Management Dashboard to see the pending request.

    <p>Thank you!</p>`;

  return email;
};

export const requestAccess = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.error("Failed to parse body", e);
  }

  let user;
  try {
    user = await getUser(body.email);
  } catch (e) {
    console.error("Could not fetch relevant user info", e);
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  for (const territory of body.territories ?? ["N/A"]) {
    try {
      await changeUserStatus({
        date: Math.floor(Date.now() / 1000),
        doneByEmail: body.email,
        doneByName: user.fullName,
        email: body.email,
        fullName: user.fullName,
        role: body.role,
        status: USER_STATUS.PENDING,
        territory,
      });
    } catch (e) {
      console.error(`Could not update user ${body.email}'s status`, e);
      return RESPONSE_CODE.USER_SUBMISSION_FAILED;
    }

    // send notice to actor
    // send notice to admin users

    try {
      const approverList = await getMyApprovers(body.role, territory);
      const toAdminEmail = adminNotice(
        territory,
        user.fullName,
        approverList,
        body.role
      );
      await sendEmail(toAdminEmail);
    } catch (e) {
      console.log("failed to send email: ", e);
    }
  }
  // bcc the every transaction

  return RESPONSE_CODE.USER_SUBMITTED;
};

export const main = handler(requestAccess);
