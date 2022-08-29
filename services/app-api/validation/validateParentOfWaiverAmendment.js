import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverAmendment } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverAmendment);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
