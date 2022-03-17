import React from "react";

import { ROUTES } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const choices = [
  {
    title: "Base Waiver",
    description: "Create a new Base Waiver",
    linkTo: ROUTES.BASE_WAIVER,
  },
  {
    title: "Request Temporary Extension",
    description: "Submit for 1915(b) and 1915(c)",
    linkTo: ROUTES.WAIVER_TEMPORARY_EXTENSION,
  },
];

const WaiverChoices = () => {
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

export default WaiverChoices;
