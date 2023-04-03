import {
  RESPONSE_CODE,
  USER_STATUS,
  roleLabels,
  territoryMap,
} from "cmscommonlib";

import handler from "./libs/handler-lib";
import sendEmail from "./libs/email-lib";

import { getCMSDateFormat } from "./utils/date-utils";

import { getUser } from "./getUser";
import { changeUserStatus } from "./utils/changeUserStatus";
import { getMyApprovers } from "./getMyApprovers";

export const accessPendingNotice = (fullName, role, email) => {
  return {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [`${fullName} <${email}>`],
    Subject: "Your OneMAC Role Access is Pending Review",
    HTML: `<p>Hello,</p><p>We received your request as a ${
      roleLabels[role]
    } on ${getCMSDateFormat(
      Date.now()
    )}. Your request is pending review and you will receive a confirmation receipt when your status is reviewed.</p><p>Thank you!</p>`,
  };
};

export const adminNotice = (territory, fullName, approverList, role) => {
  const moreSpecificAccess =
    territory === "N/A" ? "" : ` for ${territoryMap[territory]}`;

  return {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: approverList.map(
      ({ fullName, email }) => `${fullName} <${email}>`
    ),
    Subject: `New OneMAC ${roleLabels[role]} Access Request`,
    HTML: `<p>Hello,</p><p>There is a new OneMAC ${roleLabels[role]} access request${moreSpecificAccess} from ${fullName} waiting for your review.  Please log into your User Management Dashboard to see the pending request.</p><p>Thank you!</p>`,
  };
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
    if (!user) {
      return RESPONSE_CODE.USER_NOT_FOUND;
    }
  } catch (e) {
    console.error("Could not fetch relevant user info", e);
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  for (const territory of body.territories ?? ["N/A"]) {
    try {
      await changeUserStatus({
        date: Date.now(),
        doneByEmail: body.email,
        doneByName: user.fullName,
        email: body.email,
        fullName: user.fullName,
        role: body.role,
        status: USER_STATUS.PENDING,
        territory,
      });
    } catch (e) {
      console.error(`Could not update user %s's status`, body.email, e);
      return RESPONSE_CODE.USER_SUBMISSION_FAILED;
    }

    try {
      const approverList = await getMyApprovers(body.role, territory);
      if (approverList.length > 0) {
        const toAdminEmail = adminNotice(
          territory,
          user.fullName,
          approverList,
          body.role
        );
        await sendEmail(toAdminEmail);
      }

      const toSelfEmail = accessPendingNotice(
        user.fullName,
        body.role,
        user.email
      );
      await sendEmail(toSelfEmail);
    } catch (e) {
      console.log("failed to send email: ", e);
    }
  }

  return RESPONSE_CODE.USER_SUBMITTED;
};

export const main = handler(requestAccess);
