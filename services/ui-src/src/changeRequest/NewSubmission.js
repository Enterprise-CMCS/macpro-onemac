import React from "react";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const SUBMISSION_CHOICES = [{
  title: "State Plan Amendment (SPA)",
  description: "Submit a new Medicaid & CHIP State Plan Amendments or RAI",
  linkTo: "/newspa",
},{
  title: "Waiver Action",
  description: "Submit Waivers, Amendments, Renewals, RAI, or Temp. Extension",
  linkTo: "/newwaiver",
},
];

const NewSubmission = () => {
  return (
    <>
      <PageTitleBar heading="Submission Type" enableBackNav />
      <div className="choice-container">
        <div className="choice-intro">Select a Submission Type.</div>
        <ChoiceList choices={SUBMISSION_CHOICES} />
      </div>
    </>
  );
};

export default NewSubmission;
