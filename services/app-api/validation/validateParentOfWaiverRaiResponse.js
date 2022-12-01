import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { waiverRAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, waiverRAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
