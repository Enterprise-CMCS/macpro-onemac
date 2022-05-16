import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { baseWaiver } from "cmscommonlib";

const baseWaiverWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...baseWaiver,
};

export const main = handler(async (event) => {
  try {
    console.log("event id: ", event);
    return changeStatusAny(event, baseWaiverWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
