import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { initialWaiverWithdraw } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, initialWaiverWithdraw);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
