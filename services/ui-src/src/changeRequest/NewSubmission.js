import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const NewSubmission = () => {
  const location = useLocation();

  const choices = useMemo(
    () => [
      {
        title: "State Plan Amendment (SPA)",
        description:
          "Submit a new Medicaid & CHIP State Plan Amendments or RAI",
        linkTo: `/newspa${location.search}`,
      },
      {
        title: "Waiver Action",
        description:
          "Submit Waivers, Amendments, Renewals, RAI, or Temp. Extension",
        linkTo: `/newwaiver${location.search}`,
      },
    ],
    [location.search]
  );

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

export default NewSubmission;
