import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { chipSPAWithdraw } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, chipSPAWithdraw);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
