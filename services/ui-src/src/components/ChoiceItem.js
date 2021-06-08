import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ChoiceItem = ({ linkTo, title, description }) => {
  return (
        <li className="choice" ><Link to={linkTo}><h4>{title}</h4>
          <p>{description}</p>
          <FontAwesomeIcon
              icon={faChevronRight}
              className="choice-item-arrow"
            /></Link></li>
  );
};

export default ChoiceItem;
