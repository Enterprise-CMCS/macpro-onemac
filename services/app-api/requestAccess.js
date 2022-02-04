import { RESPONSE_CODE, USER_STATUS } from "cmscommonlib";

import handler from "./libs/handler-lib";
import getUser from "./utils/getUser";
import { changeUserStatus } from "./utils/changeUserStatus";

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

  try {
    for (const territory of body.territories ?? ["N/A"]) {
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
    }
  } catch (e) {
    console.error(`Could not update user ${body.email}'s status`, e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  return RESPONSE_CODE.USER_SUBMITTED;
};

export const main = handler(requestAccess);
