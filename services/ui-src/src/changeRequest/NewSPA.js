import React from "react";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const SPA_CHOICES = [
  {
    title: "Medicaid SPA",
    description: "Submit new Medicaid State Plan Amendment",
    linkTo: "/spa",
  },
  {
    title: "CHIP SPA",
    description: "Submit new CHIP State Plan Amendment",
    linkTo: "/chipspa",
  },
];

const NewSPA = () => {
  return (
    <>
      <PageTitleBar heading="SPA Type" enableBackNav />
      <div className="choice-container">
        <div className="choice-intro">
          Select a SPA type to start your submission.
        </div>
        <ChoiceList choices={SPA_CHOICES} />
      </div>
    </>
  );
};

export default NewSPA;
