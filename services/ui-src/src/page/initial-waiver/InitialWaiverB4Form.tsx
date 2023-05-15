import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { defaultOneMACFormConfig, OneMACFormConfig } from "../../libs/formLib";
import { initialWaiverB4 } from "cmscommonlib";
import { initialWaiverFormConfig } from "./initialWaiverFormConfig";

export const initialWaiverB4FormInfo: OneMACFormConfig = {
  ...defaultOneMACFormConfig,
  ...initialWaiverB4,
  ...initialWaiverFormConfig,
};

const InitialWaiverB4Form: FC = () => {
  return <OneMACForm formConfig={initialWaiverB4FormInfo} />;
};

export default InitialWaiverB4Form;
