import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultAttachmentInstructionsJSX,
  defaultConfirmSubmitRAI,
  defaultOneMACFormConfig,
  OneMACFormConfig,
} from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES, withdrawRAIResponse } from "cmscommonlib";

export const waiverRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...withdrawRAIResponse,
  pageTitle: "Respond to 1915(b) Waiver RAI",
  detailsHeader: "1915(b) Waiver RAI Response",
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  confirmSubmit: defaultConfirmSubmitRAI,
  validateParentAPI: "validateParentOfWaiverRaiResponse",
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B_RAI
  ),
};

const WithdrawRAIForm: FC = () => {
  return <OneMACForm formConfig={waiverRAIFormInfo} />;
};

export default WithdrawRAIForm;
