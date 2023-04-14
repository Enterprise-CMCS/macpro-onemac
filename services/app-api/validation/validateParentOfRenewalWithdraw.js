import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverRenewalWithdraw } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverRenewalWithdraw);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
