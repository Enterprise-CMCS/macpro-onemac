import React from "react";

import { ROUTES } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const choices = [
  {
    title: "1915(b) Waiver Action",
    description: "Submit 1915(b) waivers, amendments, and renewals",
    linkTo: ROUTES.WAIVER,
  },
  {
    title: "Request 1915(b) and 1915(c) Temporary Extension",
    description: "Submit for 1915(b) and 1915(c)",
    linkTo: ROUTES.WAIVER_EXTENSION,
  },
  {
    title: "Respond to Waiver RAI",
    description: "Submit additional information",
    linkTo: ROUTES.WAIVER_RAI,
  },
  {
    title: "1915(c) Appendix K Amendment",
    description: "Create a 1915(c) Appendix K Amendment",
    linkTo: ROUTES.WAIVER_APP_K,
  },
];

const NewWaiver = () => {
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
