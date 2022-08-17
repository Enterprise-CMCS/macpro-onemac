import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverRenewal } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverRenewal);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
