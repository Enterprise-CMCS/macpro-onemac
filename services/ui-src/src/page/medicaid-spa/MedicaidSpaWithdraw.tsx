import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import {
  defaultWithdrawConfig,
  OneMACFormConfig,
  defaultConfirmSubmitWithdraw,
} from "../../libs/formLib";
import { ONEMAC_ROUTES, medicaidSPAWithdraw } from "cmscommonlib";

export const medicaidSpaWithdrawInfo: OneMACFormConfig = {
  ...defaultWithdrawConfig,
  ...medicaidSPAWithdraw,
  detailsHeaderFull: "Withdraw Medicaid SPA Package",
  introJSX: (
    <p id="form-intro">
      Complete this form to withdraw a package. Once complete, you will not be
      able to resubmit this package. CMS will be notified and will use this
      content to review your request, and you will not be able to edit this
      form. If CMS needs any additional information, they will follow up by
      email.
    </p>
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_SPA,
  confirmSubmit: defaultConfirmSubmitWithdraw,
};

const MedicaidSpaWithdraw: FC = () => {
  return <OneMACForm formConfig={medicaidSpaWithdrawInfo} />;
};

export default MedicaidSpaWithdraw;
