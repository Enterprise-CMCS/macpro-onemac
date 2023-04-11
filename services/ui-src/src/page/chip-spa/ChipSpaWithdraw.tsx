import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import config from "../../utils/config";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { Workflow, ONEMAC_ROUTES, chipSPAWithdraw } from "cmscommonlib";

export const chipSpaWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...chipSPAWithdraw,
  detailsHeaderFull: "Withdraw CHIP SPA Package",
  attachmentIntroJSX: (
    <>
      <p className="req-message">
        Upload your supporting documentation for withdrawal.
      </p>
      <p>
        Maximum file size of {config.MAX_ATTACHMENT_SIZE_MB} MB.{" "}
        <b>You can add multiple files</b>. We accept the following file types:{" "}
        <b>.pdf, .docx, .jpg, .png</b>.
      </p>
      <p className="req-message">
        <span className="required-mark">*</span> indicates required attachment.
      </p>
      <h4>Required</h4>
      <ul>
        <li>
          Official withdrawal letters are required and must be on state
          letterhead signed by the State Medicaid Director or CHIP Director.
        </li>
      </ul>
    </>
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  parentTypeNice: Workflow.ONEMAC_LABEL[Workflow.ONEMAC_TYPE.CHIP_SPA],
  validateParentAPI: "validateParentOfChipSpaWithdraw",
};

const ChipSpaWithdraw: FC = () => {
  return <OneMACForm formConfig={chipSpaWithdrawInfo} />;
};

export default ChipSpaWithdraw;
