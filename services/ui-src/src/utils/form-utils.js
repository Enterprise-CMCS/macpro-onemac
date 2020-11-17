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

export const WavierTransmittalNumberRegEx = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)|(^[A-Z]{2}[.][0-9]{4}[.]R[0-9]{2}[.][0-9]{2}$)"
export const SpaTransmittalNumberRegEx = "^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$"
export const WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.M## or SS.####.R##.##"
export const SpaTransmittalNumber = "SS-YY-NNNN-xxxx"

/**
 * Validate SPA Id Transmittal Number Format
 * @param {statecode} The Territory/State Code Selected by a Form
 * @param {spaId} The SPA Transmittal Number
 *
 */
export function validateSpaId(stateCode, spaId) {

    let errorMessage

    let RegexFormatString = "^" + stateCode + "-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$"
    if (stateCode === "SS")
        RegexFormatString = "^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$"

    if (!spaId) {
        errorMessage = 'Transmittal Number Required !';
    } else if (!isValidFieldFormat(spaId, RegexFormatString)) {
        errorMessage = `Transmittal Number Format Error must Match: ${SpaTransmittalNumber} !`;
    }
    return errorMessage
}

/**
 * Validate Wavier Id Transmittal Number Format
 * @param {statecode} The Territory/State Code Selected by a Form
 * @param {waiverId} The Waiver Transmittal Number
 */
export function validateWavierId(stateCode, wavierId) {

    let errorMessage
    let RegexFormatString = "(^" + stateCode + "[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)|(^" + stateCode + "[.][0-9]{4}[.]R[0-9]{2}[.][0-9]{2}$)"

    if (stateCode === "SS")
        RegexFormatString = WavierTransmittalNumberRegEx


    console.log( wavierId + " = " + RegexFormatString)
    if (!wavierId) {
        errorMessage = 'Transmittal Number Required !';
    } else if (!isValidFieldFormat(wavierId, RegexFormatString)) {
        errorMessage = `Transmittal Number Format Error must Match: ${WaiverTransmittalNumberFormatErrorMessage} !`;
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

