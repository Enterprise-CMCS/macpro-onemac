import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { waiverAmendment } from "cmscommonlib";

const waiverAmendmentWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...waiverAmendment,
};

export const main = handler(async (event) => {
  try {
    return changeStatusAny(event, waiverAmendmentWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
