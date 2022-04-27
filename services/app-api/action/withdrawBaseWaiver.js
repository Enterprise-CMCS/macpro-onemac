import handler from "../libs/handler-lib";
import { withdrawAny } from "./withdrawAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { baseWaiver } from "cmscommonlib";

const baseWaiverWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...baseWaiver,
};

export const main = handler(async (event) => {
  try {
    return withdrawAny(event, baseWaiverWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
