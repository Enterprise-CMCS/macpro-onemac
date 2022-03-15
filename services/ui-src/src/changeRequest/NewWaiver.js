import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { ROUTES } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const NewWaiver = () => {
  const location = useLocation();
  const isLegacy = location.search.includes("legacy");

  const choices = useMemo(
    () =>
      [
        {
          title: "Waiver Action",
          description: "Submit waivers, amendments, and renewals",
          linkTo: ROUTES.WAIVER,
        },
        !isLegacy && {
          title: "Base Waiver",
          description: "Create a new Base Waiver",
          linkTo: ROUTES.BASE_WAIVER,
        },
        {
          title: "Request Temporary Extension",
          description: "Submit for 1915(b) and 1915(c)",
          linkTo: ROUTES.WAIVER_EXTENSION,
        },
        {
          title: "Respond to Waiver RAI",
          description: "Submit additional information",
          linkTo: ROUTES.WAIVER_RAI,
        },
        {
          title: "Appendix K Amendment",
          description: "Submit Appendix K Amendment",
          linkTo: ROUTES.WAIVER_APP_K,
        },
      ].filter(Boolean),
    [isLegacy]
  );

  return (
    <>
      <PageTitleBar heading="Waiver Action Type" enableBackNav />
      <div className="choice-container">
        <div className="choice-intro">
          Select a Waiver type to start your submission.
        </div>
        <ChoiceList choices={choices} />
      </div>
    </>
  );
};

export default NewWaiver;
