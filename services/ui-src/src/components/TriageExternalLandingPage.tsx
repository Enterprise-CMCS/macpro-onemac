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
      <div>
        <div className="">{logoJSX}</div>
        <section>
          {descriptionJSX}
          <Button>{buttonLabel}</Button>
        </section>
      </div>
    </>
  );
};

export default TriageExternalLandingPage;
