import React from "react";
import { TriageLandingPageConfig } from "../../libs/landingPageLib";
import { Button } from "@cmsgov/design-system";
import PageTitleBar from "../../components/PageTitleBar";

/** Config-driven template to build landing pages that link to another system.
 * See {@link TriageLandingPageConfig} for details on the config object. All
 * configs are maintained in `libs/landingPageLib.ts`.
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
