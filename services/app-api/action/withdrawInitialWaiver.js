import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { initialWaiver } from "cmscommonlib";

const initialWaiverWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...initialWaiver,
};

export const main = handler(async (event) => {
  try {
    console.log("event id: ", event);
    return changeStatusAny(event, initialWaiverWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
