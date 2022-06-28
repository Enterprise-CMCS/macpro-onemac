import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { chipSPA } from "cmscommonlib";

const chipSPAWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...chipSPA,
};

export const main = handler(async (event) => {
  try {
    console.log("event id: ", event);
    return changeStatusAny(event, chipSPAWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
