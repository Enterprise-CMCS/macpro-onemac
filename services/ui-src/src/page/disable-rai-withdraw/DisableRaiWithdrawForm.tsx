import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import {
  ONEMAC_ROUTES,
  TYPE_TO_DETAIL_ROUTE,
  disableRaiWithdraw,
} from "cmscommonlib";
import { FormLocationState } from "../../domain-types";
import { useLocation } from "react-router-dom";

export const disableRaiWithdrawFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...disableRaiWithdraw,
  pageTitle: "Formal RAI Response Withdraw - Disabled",
  detailsHeader: "Disable Formal RAI Response Withdraw",
  introJSX: (
    <p id="form-intro">
      Once you submit this form, you will disable the previous Formal RAI
      Response Withdraw - Enabled action. The State will not be able to withdraw
      the Formal RAI Response. If you leave this page, you will lose your
      progress on this form.
    </p>
  ),
  addlInfoTitle: "Change Reason",
  addlInfoText: (
    <p>
      Please be descriptive about why this action is being disabled.{" "}
      <b>Information entered will be visible to both CMS and State users.</b>
    </p>
  ) as React.ReactNode,
  addlInfoRequired: true,
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST,
  submitInstructionsJSX: <></>,
  idMustExist: true,
};

const DisableRaiWithdrawForm: FC = () => {
  const location = useLocation<FormLocationState>();
  if (location.state?.componentId && location.state?.parentType) {
    const detailPath = TYPE_TO_DETAIL_ROUTE[location.state.parentType];
    disableRaiWithdrawFormInfo.landingPage = `${detailPath}/${location.state?.componentId}`;
  }

  return <OneMACForm formConfig={disableRaiWithdrawFormInfo} />;
};

export default DisableRaiWithdrawForm;
