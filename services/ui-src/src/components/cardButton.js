import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import getCardButtonPropsByType from "../utils/cardButtonTypes";

export default function CardButton({ loading = false, onClick, type }) {
  const {
    title,
    desc,
    navigateTo,
    pushState,
    buttonText = "Select",
    imageAttributes: { fileName, bgColor, width, height, top, left },
  } = getCardButtonPropsByType(type);

  const history = useHistory();
  const onButtonClick = useCallback(() => {
    if (onClick) onClick();
    if (navigateTo) history.push(navigateTo, pushState);
  }, [history, navigateTo, onClick, pushState]);

  return (
    <div
      className="card-button"
      style={{
        background: `${bgColor} url('/assets/images/cardButton/${fileName}.svg') ${left}px ${top}px / ${width}px ${height}px no-repeat`,
      }}
    >
      <div className="card-button-content">
        <div className="card-button-title">{title}</div>
        <div className="card-button-description">{desc}</div>
      </div>
      <div className="card-button-select-container">
        <button
          className="ds-c-button card-button-select"
          onClick={onButtonClick}
          style={{ color: bgColor }}
        >
          {loading && (
            <>
              <span
                className="ds-c-spinner ds-c-spinner-small"
                aria-valuetext="Loading"
                role="progressbar"
              />
              &nbsp;
            </>
          )}
          {buttonText}
        </button>
      </div>
    </div>
  );
}

CardButton.propTypes = {
  type: PropTypes.string.isRequired,
};
