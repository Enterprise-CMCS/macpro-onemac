import React from "react";

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
export function renderOptionsList(optionsList) {
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
}

/**
 * Validate SPA Id Transmittal Number Format
 * @param {spaId} String The SPA Transmittal Number
 *
 */
export function validateSpaId(spaId) {

  let errorMessage = "";
  let SpaTransmittalNumberFormatErrorMessage = "SS-YY-NNNN or SS-YY-NNNN-xxxx";
  let RegexFormatString = "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)";

  if (!spaId) {
    errorMessage = 'Transmittal Number Required !';
  } else if (!isValidFieldFormat(spaId, RegexFormatString)) {
    errorMessage = `The SPA ID must be in the format of ${SpaTransmittalNumberFormatErrorMessage} !`;
  }
  return errorMessage;
}

/**
* Validate Wavier Id Transmittal Number Format
* @param {waiverId} String The Waiver Transmittal Number
*/
export function validateWavierId(wavierId) {

  let errorMessage = "";
  let RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)|(^[A-Z]{2}[.][0-9]{4}[.]R[0-9]{2}[.][0-9]{2}$)";

  let WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.M## or SS.####.R##.##";

  if (!wavierId) {
    errorMessage = 'Transmittal Number Required !';
  } else if (!isValidFieldFormat(wavierId, RegexFormatString)) {
    errorMessage = `The Waiver ID must be in the format of ${WaiverTransmittalNumberFormatErrorMessage} !`;
  }
  return errorMessage;
}

/**
* Validate Field against a Regex
* @param {fieldValue} String Transmittal Number Field Entered on Change Event.
* @param {regexFormatString} String The Regex to compare to
*/
export function isValidFieldFormat(fieldValue, regexFormatString) {

  let fieldValidationRegEx = new RegExp(regexFormatString)
  let result = false;

  if (fieldValue && fieldValue.match(fieldValidationRegEx)) {
    result = true
  } else {
    result = false
  }

  return result;

}

/**
 * Validate that the State/Territory has been selected
 * @param {value} String The Territory/State Code Selected
 */
export function validateTerritory(value) {
  let errorMessage = "";

  if (!value) errorMessage = "Please select a State or Territory.";

  return errorMessage;
}
