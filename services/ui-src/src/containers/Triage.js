import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";
import { choicesFromRoute } from "../libs/triageChoices";

const Triage = () => {
  const location = useLocation();
  const [triageData, setTriageData] = useState(
    choicesFromRoute[location.pathname]
  );

  useEffect(() => {
    setTriageData(choicesFromRoute[location.pathname]);
  }, [location]);

  return (
    <>
      <PageTitleBar heading={triageData.heading} enableBackNav />
      <section className="choice-container">
        <fieldset>
          <legend className="choice-intro">{triageData.intro}</legend>
          <ChoiceList choices={triageData.choices} />
        </fieldset>
      </section>
    </>
  );
};

export default Triage;
