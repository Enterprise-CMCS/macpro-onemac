import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { waiverRenewal } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, waiverRenewal);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
