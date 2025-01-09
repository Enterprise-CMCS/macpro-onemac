import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageTitleBar from "../components/PageTitleBar";
import { choicesFromRoute } from "../libs/triageChoices";
import { MACFieldsetCard, MACFieldsetCardOption } from "../components/MACCard";
import { useFlags } from "launchdarkly-react-client-sdk";

const Triage = () => {
  const location = useLocation();
  const [triageData, setTriageData] = useState(
    choicesFromRoute[location.pathname]
  );
  const [choices, setChoices] = useState([...triageData.choices]);
  // mmdlFaq is the flag for all MMDL work
  const { mmdlFaq } = useFlags();

  useEffect(() => {
    const tempTriageData = choicesFromRoute[location.pathname];
    // if the mmdl Flag is set to true, cards related to MMDL will not appear
    if (mmdlFaq) {
      tempTriageData.choices = tempTriageData.choices.filter(
        (choice) => !choice.description.includes("MMDL")
      );
    }
    setTriageData(tempTriageData);
    setChoices([...tempTriageData.choices]);
  }, [location, mmdlFaq]);

  return (
    <>
      <PageTitleBar heading={triageData.heading} enableBackNav />
      <MACFieldsetCard legend={triageData.intro}>
        {choices.map((choice, key) => (
          <MACFieldsetCardOption {...choice} key={key} />
        ))}
      </MACFieldsetCard>
    </>
  );
};

export default Triage;
