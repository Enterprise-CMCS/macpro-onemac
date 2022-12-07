import handler from "../libs/handler-lib";
import { validateParentOfAny } from "./validateParentOfAny";
import { medicaidSPARAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return validateParentOfAny(event, medicaidSPARAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
