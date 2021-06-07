import React from "react";

import ChoiceItem from "./ChoiceItem";

const ChoiceList = ({ choices }) => {
  return (
    <ul className="gradient-box">
      {choices.map((choice, key) => <ChoiceItem {...choice} key={key} />)}
    </ul>
  );
};

export default ChoiceList;
