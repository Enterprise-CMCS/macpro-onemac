import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";

/**
 * Returns the SPA ID specific form element
 * @param {string} errorMessage any error message to show
 * @param {string} value the current field value
 * @param {string} isReadOnly
 * @param {function} onChange
 * @param {string} warningMessage any warning message to show
 * @returns the HTML for the SPA ID
 */
const TransmittalNumber = ({
  idLabel,
  hintText,
  idFAQLink,
  statusLevel,
  statusMessage,
  value,
  onChange,
}) => {
  let statusMsgClass = "ds-u-color--error";

  if (statusLevel === "warn") {
    statusMsgClass = "ds-u-color--primary";
  }

  return (
    <div>
      <div className="label-container">
        <div className="label-lcol">
          <label htmlFor="transmittalNumber">
            {idLabel}
            <span className="required-mark">*</span>
          </label>
        </div>
        <div className="label-rcol">
          <HashLink to={idFAQLink}>What is my {idLabel}?</HashLink>
        </div>
        <p className="field-hint">{hintText}</p>
      </div>
      {statusMessage && (
        <div id="transmittalNumberStatusMsg" className={statusMsgClass}>
          {statusMessage}
        </div>
      )}
      <input
        className="field"
        type="text"
        id="transmittalNumber"
        name="transmittalNumber"
        value={value}
        onChange={onChange}
        required
      ></input>
    </div>
  );
};

TransmittalNumber.propTypes = {
  idLabel: PropTypes.string,
  hintText: PropTypes.string,
  idFAQLink: PropTypes.string,
  statusLevel: PropTypes.string,
  statusMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
};

export default TransmittalNumber;
