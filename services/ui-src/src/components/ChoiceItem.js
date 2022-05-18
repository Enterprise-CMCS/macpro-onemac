import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ChoiceItem = ({ linkTo, title, description, onclick }) => {
  return (
    <li className="choice" onClick={onclick}>
      <Link to={linkTo}>
        <div>
          <div className="choice-title">{title}</div>
          <p>{description}</p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className="choice-item-arrow" />
      </Link>
    </li>
  );
};

export default ChoiceItem;
