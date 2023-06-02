import React from "react";
import { Button } from "@cmsgov/design-system";
import PageTitleBar from "./PageTitleBar";
import { ROUTES } from "cmscommonlib";

export enum ExternalSystem {
  MAC_PRO = "https://www.medicaid.gov/resources-for-states/medicaid-and-chip-program-macpro-portal/index.html#MACPro",
  MMDL = "https://wms-mmdl.cms.gov/MMDL/faces/portal.jsp",
}

export interface TriageLandingPageConfig {
  pageTitle: string;
  // logo passed as <img /> element
  logoJSX: JSX.Element;
  // TriageExternalLandingPage component handles positioning, but use
  // <p> tags to handle spacing in the descriptionJSX element
  descriptionJSX: JSX.Element;
  buttonLabel: string;
  buttonLink: string;
}

const FAQHelperText = () => (
  <span className="landing-description">
    <i>
      For additional information on where to submit, refer to the{" "}
      <a href={ROUTES.FAQ_SYSTEM} target="new">
        Crosswalk from Paper-based State Plan to MACPro and MMDL
      </a>{" "}
      document in our FAQ section.
    </i>
  </span>
);

/** Config-driven template to build landing pages that link to another system.
 * See {@link TriageLandingPageConfig} for details on the config object.
 */
const TriageExternalLandingPage = ({
  pageTitle,
  logoJSX,
  descriptionJSX,
  buttonLabel,
  buttonLink,
}: TriageLandingPageConfig) => {
  return (
    <>
      <PageTitleBar heading={pageTitle} enableBackNav />
      <div className="landing-container">
        <div className="landing-logo">{logoJSX}</div>
        <section className="landing-description">{descriptionJSX}</section>
        <a href={buttonLink} target="_blank" rel="noreferrer">
          <Button variation="primary" className="landing-button">
            {buttonLabel}
          </Button>
        </a>
        <FAQHelperText />
      </div>
    </>
  );
};

export default TriageExternalLandingPage;
