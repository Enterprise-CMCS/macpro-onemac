import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { chipSPARAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, chipSPARAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
