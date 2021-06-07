import React from "react";

import ChoiceItem from "./ChoiceItem";

const ChoiceList = ({ choices }) => {
  const renderChoices = () => {
    return choices.map((choice, key) => (
      <ChoiceItem
        key={key}
        linkTo={choice.linkTo}
        title={choice.title}
        description={choice.description}
      />
    ));
  };

  return <ul className="gradient-box">{renderChoices()}</ul>;
};

export default ChoiceList;
