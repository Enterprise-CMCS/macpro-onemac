import { RESPONSE_CODE } from "cmscommonlib";

import handler from "./libs/handler-lib";
import getUser from "./utils/getUser";
import { changeUserStatus } from "./utils/changeUserStatus";

export const updateUserStatus = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.error("Failed to parse body", e);
  }

  let doneBy, doneTo;
  try {
    [doneBy, doneTo] = await Promise.all([
      getUser(body.doneByEmail),
      getUser(body.email),
    ]);
  } catch (e) {
    console.error("Could not fetch relevant user info", e);
    return RESPONSE_CODE.USER_NOT_FOUND;
  }

  try {
    await changeUserStatus({
      ...body,
      date: Math.floor(Date.now() / 1000),
      doneByName: doneBy.fullName,
      fullName: doneTo.fullName,
    });
  } catch (e) {
    console.error(`Could not update user ${body.email}'s status`, e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  return RESPONSE_CODE.USER_SUBMITTED;
};

export const main = handler(updateUserStatus);
