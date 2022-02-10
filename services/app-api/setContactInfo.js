import { RESPONSE_CODE } from "cmscommonlib";

import handler from "./libs/handler-lib";
import { getUser } from "./getUser";
import { newUser } from "./utils/newUser";

export const setContactInfo = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.error("Failed to parse body", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  try {
    const existingUser = await getUser(body.email);
    if (existingUser !== null) {
      return RESPONSE_CODE.USER_EXISTS;
    }
  } catch (e) {
    console.error("Could not fetch relevant user info", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  try {
    await newUser({
      fullName: body.fullName ?? `${body.firstName} ${body.lastName}`,
      email: body.email,
    });
  } catch (e) {
    console.error(`Could not create user ${body.email}`, e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  return RESPONSE_CODE.USER_SUBMITTED;
};

export const main = handler(setContactInfo);
