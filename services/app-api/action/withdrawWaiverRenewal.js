import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { waiverRenewal } from "cmscommonlib";

const waiverRenewalWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...waiverRenewal,
};

export const main = handler(async (event) => {
  try {
    return changeStatusAny(event, waiverRenewalWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
