import React from "react";

import { ROUTES } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const choices = [
  {
    title: "Sample Choice Title",
    description: "Some dummy text to show what it looks like",
    linkTo: ROUTES.TRIAGE_GROUP,
  },
];

const SPAChoices = () => {
  return (
    <>
      <PageTitleBar heading="SPA Type" enableBackNav />
      <div className="choice-container">
        <div className="choice-intro">
          There are no SPA form options for package dashboard.
        </div>
        <ChoiceList choices={choices} />
      </div>
    </>
  );
};

export default SPAChoices;
