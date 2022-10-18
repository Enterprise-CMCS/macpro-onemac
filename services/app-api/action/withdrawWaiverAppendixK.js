import handler from "../libs/handler-lib";
import { changeStatusAny } from "./changeStatusAny";
import { defaultWithdrawConfig } from "./defaultWithdrawConfig";
import { waiverAppendixK } from "cmscommonlib";

const waiverAppendixKWithdrawConfig = {
  ...defaultWithdrawConfig,
  ...waiverAppendixK,
};

export const main = handler(async (event) => {
  try {
    console.log("event id: ", event);
    return changeStatusAny(event, waiverAppendixKWithdrawConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
