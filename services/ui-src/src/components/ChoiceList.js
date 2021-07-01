import { divide } from "lodash";
import React from "react";

import ChoiceItem from "./ChoiceItem";

const ChoiceList = ({ choices }) => {
  return (
    <>
      <div className="gradient-box"></div>
      <ul className="choice-list">
        {choices.map((choice, key) => (
          <ChoiceItem {...choice} key={key} />
        ))}
      </ul>
    </>
  );
};

export default ChoiceList;
