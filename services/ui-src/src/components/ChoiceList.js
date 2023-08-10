import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

/* The ChoiceItem and ChoiceList components are replaced in Triage, but
 * not in Signup. Signup uses the `onClick` prop of ChoiceItem to trigger a
 * `history.repalce()` call. This is counter to the pattern established by
 * Triage using the `linkTo` to perform navigation when clicked. Confusingly,
 * Signup uses both onClick and linkTo - we should only rely on one.
 *
 * I could not access the Signup page due to lack of CMS IDM credentials,
 * so I opted to leave Signup un-refactored for now.
 *
 * TODO: Implement MACFieldsetCard with Signup after deprecating either
 *  onClick or linkTo */

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
                <span className="strong-text">{strongText}</span>
              </>
            )}
          </p>
        </div>
        <FontAwesomeIcon icon={faChevronRight} className="choice-item-arrow" />
      </Link>
    </label>
  );
};

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
