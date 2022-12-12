import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverAppendixKRAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverAppendixKRAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
