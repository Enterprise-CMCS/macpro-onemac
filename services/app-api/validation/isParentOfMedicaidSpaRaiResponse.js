import handler from "../libs/handler-lib";
import { isParentOfAny } from "./isParentOfAny";
import { medicaidSPARAIResponse } from "cmscommonlib";

export const main = handler(async (event) => {
  try {
    return isParentOfAny(event, medicaidSPARAIResponse);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
