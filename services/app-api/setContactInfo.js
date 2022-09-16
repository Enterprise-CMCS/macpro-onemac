import {
  effectiveRoleForUser,
  RESPONSE_CODE,
  USER_ROLE,
  USER_STATUS,
} from "cmscommonlib";

import handler from "./libs/handler-lib";
import { getUser } from "./getUser";
import { newUser } from "./utils/newUser";
import { changeUserStatus } from "./utils/changeUserStatus";

export const setContactInfo = async (event) => {
  let body;
  let apiResponse = RESPONSE_CODE.USER_EXISTS;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.error("Failed to parse body", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  try {
    const existingUser = await getUser(body.email);
    const fullName = body.fullName ?? `${body.firstName} ${body.lastName}`;

    if (!existingUser) {
      await newUser({
        fullName,
        email: body.email,
      });
      apiResponse = RESPONSE_CODE.USER_SUBMITTED;
    }
    if (
      !effectiveRoleForUser(existingUser?.roleList) &&
      (!body.cmsRoles ||
        (!body.cmsRoles.includes("onemac-state-user") &&
          !body.cmsRoles.includes("onemac-helpdesk")))
    ) {
      await changeUserStatus({
        email: body.email,
        fullName,
        doneByEmail: body.email,
        doneByName: fullName,
        date: Date.now(),
        role: USER_ROLE.DEFAULT_CMS_USER,
        territory: "N/A",
        status: USER_STATUS.ACTIVE,
      });

      apiResponse = RESPONSE_CODE.USER_SUBMITTED;
    }
  } catch (e) {
    console.error(`Could not create user %s`, body.email, e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  return apiResponse;
};

export const main = handler(setContactInfo);
