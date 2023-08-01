import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { withdrawRAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, withdrawRAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
