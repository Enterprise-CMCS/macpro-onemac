import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultWithdrawConfig, OneMACFormConfig } from "../../libs/formLib";
import { withdrawRAIResponse } from "cmscommonlib";

export const withdrawRAIFormInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...withdrawRAIResponse,
  pageTitle: "Withdraw Formal RAI Response",
  introJSX: (
    <p id="form-intro">
      Complete this form to withdraw the Formal RAI response. Once complete, you
      and CMS will receive an email confirmation.
    </p>
  ),
  detailsHeader: "Withdraw Formal RAI Response",
  addlInfoText: "Explain your need for withdrawal.",
  addlInfoRequired: true,
  validateParentAPI: "validateParentOfWithdrawRAI",
  confirmSubmit: {
    confirmSubmitHeading: "Withdraw Formal RAI Response?",
    buildMessage: (packageId) => (
      <p>
        You are about to withdraw the Formal RAI Response for {packageId}. CMS
        will be notified.
      </p>
    ),
    confirmSubmitYesButton: "Yes, withdraw response",
  },
};

const WithdrawRAIForm: FC = () => {
  return <OneMACForm formConfig={withdrawRAIFormInfo} />;
};

export default WithdrawRAIForm;
