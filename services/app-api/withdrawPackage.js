import handler from "./libs/handler-lib";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import getUser from "./utils/getUser";
import { getAuthorizedStateList } from "./user/user-util";
import updatePackage from "./utils/updatePackage";

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }

  const body = JSON.parse(event.body);
  const user = await getUser(body.submitterEmail);

  if (!user) {
    throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
  }

  const userRoleObj = getUserRoleObj(user.type);

  const territoryList = getAuthorizedStateList(user);
  if (!userRoleObj.canAccessDashboard || territoryList === "All") {
    throw new Error(RESPONSE_CODE.USER_NOT_AUTHORIZED);
  }

  await updatePackage({
    ...body,
    packageStatus: "Withdrawn",
    submissionTimestamp: Date.now(),
  });

  return RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS;
});
