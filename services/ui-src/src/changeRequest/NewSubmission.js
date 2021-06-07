import React from "react";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const SUBMISSION_CHOICES = [{
  title: "State Plan Amendment (SPA)",
  description: "Submit a new Medicaid &amp; CHIP State Plan Amendments or RAI",
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
      <PageTitleBar heading="Submission Type" text="" />
      <div className="choice-container">
        <h3>Select a Submission Type.</h3>
        <ChoiceList choices={SUBMISSION_CHOICES} />
      </div>
    </>
  );
};

export default NewSubmission;
