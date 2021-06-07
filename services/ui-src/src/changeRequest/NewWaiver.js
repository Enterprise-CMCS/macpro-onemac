import React from "react";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const WAIVER_CHOICES = [{
  title: "Waiver Action",
  description: "Submit waivers, amendments, and renewals",
  linkTo: "/waiver",
},{
  title: "Respond to Waiver RAI",
  description: "Submit additional information",
  linkTo: "/waiverrai",
},{
  title: "Request Temporary Extension",
  description: "Submit for 1915(b) and 1915(c)",
  linkTo: "/waiverextension",
},{
  title: "Appendix K Amendment",
  description: "Submit Appendix K Amendment",
  linkTo: "/waiverappk",
},
];

const NewWaiver = () => {
  return (
    <>
      <PageTitleBar heading="Waiver Action Type" text="" />
      <div className="choice-container">
        <h3>Select a Waiver type to start your submission.</h3>
        <ChoiceList choices={WAIVER_CHOICES} />
      </div>
    </>
  );
};

export default NewWaiver;
