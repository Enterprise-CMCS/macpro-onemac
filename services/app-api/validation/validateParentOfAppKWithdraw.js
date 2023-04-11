import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverAppendixKWithdraw } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverAppendixKWithdraw);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
