import React from "react";

import ChoiceItem from "./ChoiceItem";
import { MACTriageCard } from "./MACCard";

const ChoiceList = ({ choices }) => {
  return (
    <>
      <div className="gradient-box"></div>
      <div className="choice-list">
        {choices.map((choice, key) => (
          <MACTriageCard {...choice} key={key} />
        ))}
      </div>
    </>
  );
};

export default ChoiceList;
