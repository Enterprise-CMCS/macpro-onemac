import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ChoiceItem = ({ linkTo, title, description, onclick, strongText }) => {
  return (
    <label className="choice" onClick={onclick}>
      <Link to={linkTo}>
        <div>
          <div className="choice-title">{title}</div>
          <p>
            {description}
            {strongText && (
              <>
                <br />
                <span class="strong-text">{strongText}</span>
              </>
            )}
          </p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className="choice-item-arrow" />
      </Link>
    </label>
  );
};

export default ChoiceItem;
