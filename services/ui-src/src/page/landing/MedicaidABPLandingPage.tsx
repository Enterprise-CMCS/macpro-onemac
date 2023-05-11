import React from "react";
import TriageExternalLandingPage, {
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /medicaid-abp
const ABPLandingConfig: TriageLandingPageConfig = {
  pageTitle:
    "Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and Cost Sharing",
  logoJSX: <></>,
  descriptionJSX: <></>,
  buttonLabel: "",
};

const MedicaidABPLandingPage = () => (
  <TriageExternalLandingPage {...ABPLandingConfig} />
);

export default MedicaidABPLandingPage;
