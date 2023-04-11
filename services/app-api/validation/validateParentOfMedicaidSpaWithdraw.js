import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { medicaidSPAWithdraw } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, medicaidSPAWithdraw);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
