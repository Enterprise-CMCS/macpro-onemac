import { medicaidSPAWithdraw } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
} from "./defaultFormConfig";
import { CMSWithdrawalNotice } from "../email/CMSWithdrawalNotice";
import { stateWithdrawalReceipt } from "../email/stateWithdrawalReceipt";

export const withdrawMedicaidSPAFormConfig = {
  ...defaultFormConfig,
  ...medicaidSPAWithdraw,
  buildCMSNotice: CMSWithdrawalNotice,
  buildStateReceipt: stateWithdrawalReceipt,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
  },
};

export const main = handler(async (event) =>
  submitAny(event, withdrawMedicaidSPAFormConfig)
);
