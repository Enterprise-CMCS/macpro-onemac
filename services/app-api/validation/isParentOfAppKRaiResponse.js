import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { waiverAppendixKRAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, waiverAppendixKRAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
