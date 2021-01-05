import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import { ROUTES } from "../Routes";

/**
 * Returns the SPA ID specific form element
 * @param {string} errorMessage any error message to show
 * @param {string} value the current field value
 * @param {string} isReadOnly
 * @param {function} onChange
 * @returns the HTML for the SPA ID
 */
const TransmittalNumber = ({
  idType,
  errorMessage,
  value,
  isReadOnly,
  onChange,
}) => {
  let numName = "SPA ID";
  let hint = "Must follow the format SS-YY-NNNN-xxxx";
  let FAQLink = ROUTES.FAQ_SPA_ID;
  if (idType === "waiver") {
    numName = "Waiver Number";
    hint = "Must follow the format SS.##.R##.M## or SS.####.R##.##";
    FAQLink = ROUTES.FAQ_WAIVER_ID;
  }

  return (
    <div>
      <div className="label-container">
        <div className="label-lcol">
          <label htmlFor="transmittalNumber">
            {numName}
            <span className="required-mark">*</span>
          </label>
        </div>
        <div className="label-rcol">
          <HashLink to={FAQLink}>What is my {numName}?</HashLink>
        </div>
        <p className="field-hint">{hint}</p>
      </div>
      {errorMessage && (
        <div id="transmittalNumberErrorMsg" className="ds-u-color--error">
          {errorMessage}
        </div>
      )}
      <input
        className="field"
        type="text"
        id="transmittalNumber"
        name="transmittalNumber"
        disabled={isReadOnly}
        value={value}
        onChange={onChange}
        required
      ></input>
    </div>
  );
};

TransmittalNumber.propTypes = {
  errorMessage: PropTypes.string,
  isReadOnly: PropTypes.string,
  value: PropTypes.string,
};

export default TransmittalNumber;
