import {
  ABPLandingPageContent,
  CHIPEligibilityLandingPageContent,
  MMDLLogo,
  MacPROLogo,
  MedicaidEligibilityLandingPageContent,
} from "../page/landing/LandingPages";

export interface TriageLandingPageConfig {
  pageTitle: string;
  // logo passed as <img /> element
  logoJSX: JSX.Element;
  // TriageExternalLandingPage component handles positioning, but use
  // <p> tags to handle spacing in the descriptionJSX element
  descriptionJSX: JSX.Element;
  buttonLabel: string;
}
// config for /medicaid-abp
export const ABPLandingConfig: TriageLandingPageConfig = {
  pageTitle: "",
  logoJSX: MMDLLogo,
  descriptionJSX: ABPLandingPageContent,
  buttonLabel: "",
};
// config for /medicaid-eligibility
export const medicaidEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle: "",
  logoJSX: MacPROLogo,
  descriptionJSX: MedicaidEligibilityLandingPageContent,
  buttonLabel: "",
};
// config for /chip-eligibility
export const chipEligibilityLandingConfig: TriageLandingPageConfig = {
  pageTitle: "",
  logoJSX: MMDLLogo,
  descriptionJSX: CHIPEligibilityLandingPageContent,
  buttonLabel: "",
};
