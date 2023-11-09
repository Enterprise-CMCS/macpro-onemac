import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import {
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  enableRaiWithdraw,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const enableRaiWithdrawFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...enableRaiWithdraw,
  pageTitle: "Formal RAI Response Withdraw - Enabled",
  detailsHeader: "Enable Formal RAI Response Withdraw",
  introJSX: (
    <p id="form-intro">
      Once you submit this form, the most recent Formal RAI Response for this
      package will be able to be withdrawn by the state. If you leave this page,
      you will lose your progress on this form.
    </p>
  ),
  noText: true,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  submitInstructionsJSX: <></>,
  idMustExist: true,
};

const EnableRaiWithdrawForm: FC = () => {
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId && location.state?.parentType) {
    const detailPath = TYPE_TO_DETAIL_ROUTE[location.state.parentType];
    enableRaiWithdrawFormInfo.landingPage = `${detailPath}/${location.state?.componentId}`;
  }

  return <OneMACForm formConfig={enableRaiWithdrawFormInfo} />;
};

export default EnableRaiWithdrawForm;
