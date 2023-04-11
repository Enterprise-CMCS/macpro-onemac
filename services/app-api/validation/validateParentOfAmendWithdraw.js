import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverAmendmentWithdraw } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverAmendmentWithdraw);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
