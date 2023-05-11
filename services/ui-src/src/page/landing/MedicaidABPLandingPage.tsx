import React from "react";
import TriageExternalLandingPage, {
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /medicaid-abp
const ABPLandingConfig: TriageLandingPageConfig = {
  pageTitle:
    "Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and Cost Sharing",
  logoJSX: <></>,
  descriptionJSX: (
    <>
      <p>
        Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and
        Cost Sharing are managed within the Medicaid Model Data Lab (MMDL).
      </p>
      <p>
        The MMDL system allows states to apply for changes to their State plan,
        and access report on Medicaid program administration/implementation.
      </p>
    </>
  ),
  buttonLabel: "Enter the MMDL system",
};

const MedicaidABPLandingPage = () => (
  <TriageExternalLandingPage {...ABPLandingConfig} />
);

export default MedicaidABPLandingPage;
