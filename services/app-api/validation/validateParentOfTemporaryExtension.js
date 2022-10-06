import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverTemporaryExtension } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverTemporaryExtension);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
