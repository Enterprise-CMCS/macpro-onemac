import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { initialWaiverB } from "cmscommonlib";
import { initialWaiverFormConfig } from "./initialWaiverFormConfig";

export const initialWaiverBFormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...initialWaiverB,
  ...initialWaiverFormConfig,
};

const InitialWaiverBForm: FC = () => {
  return <OneMACForm formConfig={initialWaiverBFormInfo} />;
};

export default InitialWaiverBForm;
