import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { waiverTemporaryExtension } from "cmscommonlib";

const initialWaiverTemporaryExtensionWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...waiverTemporaryExtension,
};

export const main = handler(async (event) => {
  try {
    return changeStatusAny(
      event,
      initialWaiverTemporaryExtensionWithdrawConfig
    );
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
