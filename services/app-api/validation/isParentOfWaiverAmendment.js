import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { waiverAmendment } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, waiverAmendment);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
