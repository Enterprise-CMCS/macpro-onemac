import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { chipSPARAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, chipSPARAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
