import React from "react";
import PropTypes from "prop-types";

/**
 * Returns the territory form element
 * @param {string} errorMessage any error message to show
 * @param {string} value the current field value
 * @param {string} isReadOnly
 * @param {function} onChange
 * @returns the HTML for the SPA ID
 */
const RequiredChoice = ({ 
  fieldInfo,
  label,
  errorMessage, 
  value, 
  isReadOnly, 
  onChange }) => {
  /**
   * Generates options based on an array of objects with label and value for each option.
   * For example:
   * const options = [
   *   { "label": "New waiver", "value": "New waiver" },
   *   { "label": "Waiver amendment", "value": "Waiver amendment" },
   *   { "label": "Request for waiver renewal", "value": "Request for waiver renewal" }
   * ];
   * @param {Array} optionsList array of objects with label and value for each option
   */
  const renderOptionsList = (optionsList) => {
    if (!optionsList || !Array.isArray(optionsList)) {
      throw new Error("Options list must be an array of items.");
    }

    let retval = optionsList.map((item, i) => {
      return (
        <option key={i} value={item.value}>
          {item.label}
        </option>
      );
    });
    return retval;
  };
  const errorMsgId = fieldInfo.fieldName+"ErrorMsg";

  return (
    <>
      <label htmlFor={fieldInfo.fieldName}>
        {label}<span className="required-mark">*</span>
      </label>
      {errorMessage && (
        <div id={errorMsgId} className="ds-u-color--error">
          {errorMessage}
        </div>
      )}
      {!isReadOnly ? (
        <select
          className="field"
          id={fieldInfo.fieldName}
          name={fieldInfo.fieldName}
          value={value}
          onChange={onChange}
          required
        >
          <option value="">-- select a {fieldInfo.defaultItem} --</option>
          {renderOptionsList(fieldInfo.optionsList)}
        </select>
      ) : (
        <input
          className="field"
          type="text"
          id={fieldInfo.fieldName}
          name={fieldInfo.fieldName}
          disabled
          value={value}
        ></input>
      )}
    </>
  );
};

RequiredChoice.propTypes = {
  fieldInfo: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  isReadOnly: PropTypes.bool,
  value: PropTypes.string,
};

export default RequiredChoice;
