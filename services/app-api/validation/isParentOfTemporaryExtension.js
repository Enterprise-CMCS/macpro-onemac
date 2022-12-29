import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { waiverTemporaryExtension } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, waiverTemporaryExtension);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
