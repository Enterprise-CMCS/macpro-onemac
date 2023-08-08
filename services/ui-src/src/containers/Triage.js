import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";
import { choicesFromRoute } from "../libs/triageChoices";
import { MACCardFieldsetWrapper } from "../components/MACCard";

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
      <MACCardFieldsetWrapper legend={triageData.intro}>
        <ChoiceList choices={triageData.choices} />
      </MACCardFieldsetWrapper>
    </>
  );
};

export default Triage;
