import React from "react";

import ChoiceItem from "./ChoiceItem";

const ChoiceList = ({ choices }) => {
  const gradientClass =
    choices.length === 2 ? "gradient-box-small" : "gradient-box-big";
  return (
    <ul className={`gradient-box ${gradientClass}`}>
      {choices.map((choice, key) => (
        <ChoiceItem {...choice} key={key} />
      ))}
    </ul>
  );
};

export default ChoiceList;
