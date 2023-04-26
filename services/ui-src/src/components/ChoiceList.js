import React from "react";

import ChoiceItem from "./ChoiceItem";

const ChoiceList = ({ choices }) => {
  return (
    <>
      <div className="gradient-box"></div>
      <div className="choice-list">
        {choices.map((choice, key) => (
          <ChoiceItem {...choice} key={key} />
        ))}
      </div>
    </>
  );
};

export default ChoiceList;
