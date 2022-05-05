import { Validate, waiverTemporaryExtension } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";

export const waiverTemporaryExtensionFormConfig = {
  ...defaultFormConfig,
  ...waiverTemporaryExtension,
  getParentInfo: (myId) => Validate.getParentWaiver(myId),
};

export const main = handler(async (event) =>
  submitAny(event, waiverTemporaryExtensionFormConfig)
);

// export const main = handler(async (event) => {
//   try {
//     console.log(
//       "waiverTemporaryExtensionFormConfig is: ",
//       waiverTemporaryExtensionFormConfig
//     );
//     return submitAny(event, waiverTemporaryExtensionFormConfig);
//   } catch (error) {
//     console.log("Exception: ", error);
//     throw error;
//   }
// });
