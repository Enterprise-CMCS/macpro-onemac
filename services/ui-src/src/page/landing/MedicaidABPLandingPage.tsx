import React from "react";
import TriageExternalLandingPage, {
  ExternalSystem,
  TriageLandingPageConfig,
} from "../../components/TriageExternalLandingPage";

// config for /medicaid-abp
const ABPLandingConfig: TriageLandingPageConfig = {
  pageTitle:
    "Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and Cost Sharing",
  logoJSX: <img src="/assets/images/logos/mmdl.png" alt="MMDL Logo" />,
  descriptionJSX: (
    <>
      <p>
        <b>
          Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and
          Cost Sharing are managed within the{" "}
          <a href={ExternalSystem.MMDL} target="_blank">
            Medicaid Model Data Lab (MMDL)
          </a>
          .
        </b>
      </p>
      <p>
        The MMDL system allows states to apply for changes to their State plan,
        and access report on Medicaid program administration/implementation.
      </p>
    </>
  ),
  buttonLabel: "Enter the MMDL system",
  buttonLink: ExternalSystem.MMDL,
};

const MedicaidABPLandingPage = () => (
  <TriageExternalLandingPage {...ABPLandingConfig} />
);

export default MedicaidABPLandingPage;
