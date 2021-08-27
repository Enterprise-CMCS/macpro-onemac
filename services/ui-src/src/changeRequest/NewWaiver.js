import React from "react";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const WAIVER_CHOICES = [
  {
    title: "Waiver Action",
    description: "Submit waivers, amendments, and renewals",
    linkTo: "/waiver",
  },
  {
    title: "Request Temporary Extension",
    description: "Submit for 1915(b) and 1915(c)",
    linkTo: "/waiverextension",
  },
  {
    title: "Appendix K Amendment",
    description: "Submit Appendix K Amendment",
    linkTo: "/waiverappk",
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
        <ChoiceList choices={WAIVER_CHOICES} />
      </div>
    </>
  );
};

export default NewWaiver;
