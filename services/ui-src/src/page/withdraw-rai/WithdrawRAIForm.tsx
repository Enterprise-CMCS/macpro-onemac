import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { withdrawRAIResponse } from "cmscommonlib";

export const withdrawRAIFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
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
};

const WithdrawRAIForm: FC = () => {
  return <OneMACForm formConfig={withdrawRAIFormInfo} />;
};

export default WithdrawRAIForm;
