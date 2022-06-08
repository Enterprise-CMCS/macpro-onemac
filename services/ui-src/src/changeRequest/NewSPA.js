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
    title: "Respond to Formal Medicaid SPA RAI",
    description: "Submit additional information",
    linkTo: "/sparai",
  },
  {
    title: "CHIP SPA",
    description: "Submit new CHIP State Plan Amendment",
    linkTo: "/chipspa",
  },
  {
    title: "Respond to Formal CHIP SPA RAI",
    description: "Submit additional information",
    linkTo: "/chipsparai",
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
