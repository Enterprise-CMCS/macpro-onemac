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
      <option key={i} value={item.value} >
        {item.label}
      </option>
    );
  });
  return retval;
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

/**
 * Validate SPA Id Transmittal Number Format
 * @return
 *
 */
export function validateSpaId(spaId) {

    let errorMessage = undefined
    let SpaTransmittalNumberFormatErrorMessage = "SS-YY-NNNN or SS-YY-NNNN-xxxx"
    let RegexFormatString = "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)"

    if (!spaId) {
        errorMessage = 'SPA ID Required !';
    } else if (!isValidFieldFormat(spaId, RegexFormatString)) {
        errorMessage = `The SPA ID must be in the format of ${SpaTransmittalNumberFormatErrorMessage} !`;
    }
    return errorMessage
}

/**
 * Validate Waiver Id Transmittal Number Format
 * @return
 */
export function validateWaiverId(waiverId) {

    let errorMessage = undefined
    let RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)|(^[A-Z]{2}[.][0-9]{4}[.]R[0-9]{2}[.][0-9]{2}$)"

    let WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.M## or SS.####.R##.##"

    if (!waiverId) {
        errorMessage = 'Waiver Number Required !';
    } else if (!isValidFieldFormat(waiverId, RegexFormatString)) {
        errorMessage = `The Waiver Number must be in the format of ${WaiverTransmittalNumberFormatErrorMessage} !`;
    }
    return errorMessage
}

/**
 * Validate Field
 * @param {value} Transmittal Number Field Entered on Change Event.
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

};
