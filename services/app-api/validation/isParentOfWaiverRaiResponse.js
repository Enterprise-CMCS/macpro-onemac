import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { waiverRAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, waiverRAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
