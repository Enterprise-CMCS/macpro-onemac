import { enableRaiWithdraw, RESPONSE_CODE, Workflow } from "cmscommonlib";
import handler from "../libs/handler-lib";
import { submitAnyWithData } from "./submitAny";
import { defaultFormConfig } from "./defaultFormConfig";
import Joi from "joi";

export const enableRaiWithdrawFormConfig = {
  ...defaultFormConfig,
  ...enableRaiWithdraw,
  newStatus: Workflow.ONEMAC_STATUS.WITHDRAW_RAI_ENABLED,
  appendToSchema: {
    parentType: Joi.string().required(),
    submissionTimestamp: Joi.date().timestamp(),
    adminChanges: Joi.array().items(
      Joi.object({
        changeTimestamp: Joi.date().timestamp(),
        changeMade: Joi.string().required(),
        changeReason: Joi.string().required(),
      })
    ),
  },
};

export const main = handler(async (event) => {
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    console.error("Failed to parse body", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }

  data.submissionTimestamp = Date.now();
  data.adminChanges = [
    {
      changeTimestamp: data.submissionTimestamp,
      changeMade: `${data.submitterName} has enabled State package action to withdraw Formal RAI Response`,
      changeReason: data.additionalInformation,
    },
  ];

  delete data.additionalInformation; //we dont want this to persist in addl info since it's now in the admin changes

  return submitAnyWithData(data, enableRaiWithdrawFormConfig);
});
