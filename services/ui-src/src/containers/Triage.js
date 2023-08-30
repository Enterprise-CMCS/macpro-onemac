import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";
import { choicesFromRoute } from "../libs/triageChoices";
import { MACFieldsetCard, MACFieldsetCardOption } from "../components/MACCard";

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
      <MACFieldsetCard legend={triageData.intro}>
        {triageData.choices.map((choice, key) => (
          <MACFieldsetCardOption {...choice} key={key} />
        ))}
      </MACFieldsetCard>
    </>
  );
};

export default Triage;
