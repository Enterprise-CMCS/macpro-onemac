import React from "react";
import { Button } from "@cmsgov/design-system";
import PageTitleBar from "./PageTitleBar";

export interface TriageLandingPageConfig {
  pageTitle: string;
  // logo passed as <img /> element
  logoJSX: JSX.Element;
  // TriageExternalLandingPage component handles positioning, but use
  // <p> tags to handle spacing in the descriptionJSX element
  descriptionJSX: JSX.Element;
  buttonLabel: string;
}

const FAQHelperText = () => (
  <p className="landing-description">
    <i>
      For additional information on where to submit, refer to the Crosswalk from
      Paper-based State Plan to MACPro and MMDL document in our FAQ section.
    </i>
  </p>
);

/** Config-driven template to build landing pages that link to another system.
 * See {@link TriageLandingPageConfig} for details on the config object.
 */
const TriageExternalLandingPage = ({
  pageTitle,
  logoJSX,
  descriptionJSX,
  buttonLabel,
}: TriageLandingPageConfig) => {
  return (
    <>
      <PageTitleBar heading={pageTitle} enableBackNav />
      <div className="landing-container">
        <div className="landing-logo">{logoJSX}</div>
        <section className="landing-description">{descriptionJSX}</section>
        <Button variation="primary" className="landing-button">
          {buttonLabel}
        </Button>
        <FAQHelperText />
      </div>
    </>
  );
};

export default TriageExternalLandingPage;
