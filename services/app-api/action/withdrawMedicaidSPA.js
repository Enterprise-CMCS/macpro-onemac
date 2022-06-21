import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { medicaidSPA } from "cmscommonlib";

const medicaidSPAWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...medicaidSPA,
};

export const main = handler(async (event) => {
  try {
    console.log("event id: ", event);
    return changeStatusAny(event, medicaidSPAWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
