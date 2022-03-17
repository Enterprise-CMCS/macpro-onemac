import React from "react";
import { ROUTES } from "cmscommonlib";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const choices = [
  {
    title: "State Plan Amendment (SPA)",
    description: "Submit a new Medicaid & CHIP State Plan Amendments or RAI",
    linkTo: ROUTES.TRIAGE_SPA,
  },
  {
    title: "Waiver Action",
    description:
      "Submit Waivers, Amendments, Renewals, RAI, or Temp. Extension",
    linkTo: ROUTES.TRIAGE_WAIVER,
  },
];

const PackageGroupChoices = () => {
  return (
    <>
      <PageTitleBar heading="Submission Type" enableBackNav />
      <div className="choice-container">
        <div className="choice-intro">Select a Submission Type.</div>
        <ChoiceList choices={choices} />
      </div>
    </>
  );
};

export default PackageGroupChoices;
