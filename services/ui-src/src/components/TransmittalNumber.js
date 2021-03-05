import React from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";

/**
 * Returns the ID specific form element
 * @param {string} idLabel the nice name to use for the id
 * @param {string} hintText the contents of the hint text under the label
 * @param {string} idFAQLink the link for additional help completing this id
 * @param {string} statusLevel error or warn (ing)
 * @param {string} statusMessage the message to show
 * @param {string} value current input value
 * @param {string} onChange the function name to show
 * @returns the HTML for the Transmittal Number
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
