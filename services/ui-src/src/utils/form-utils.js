import { territoryList } from "../libs/territoryLib";

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
    }  else if (!hasValidStateCode(spaId)) {
        errorMessage = `The SPA ID must contain valid Territory/State Code`
    }  else if (!isValidFieldFormat(spaId, RegexFormatString)) {
        errorMessage = `The SPA ID must be in the format of ${SpaTransmittalNumberFormatErrorMessage} !`;
    }
    return errorMessage
}

/**
 * Validate Waiver Id Transmittal Number Format
 * @return
 */

export function validateWaiverId(waiverId, authority, waiverType) {


    let errorMessage = undefined
    let RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)"
    let WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.M##"
    if (waiverType !== "Waiver Action") {
        RegexFormatString = RegexFormatString + "|(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.][0-9]{2}$)"
        WaiverTransmittalNumberFormatErrorMessage = WaiverTransmittalNumberFormatErrorMessage + " or SS.##.R##.##"
    } else {
        if (authority === "1915(c)") {
            WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.##"
            RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.][0-9]{2}$)"
        }
    }

    if (!waiverId) {
        errorMessage = 'Waiver Number Required !';
    }  else if (!hasValidStateCode(waiverId)) {
        errorMessage = `The Waiver Number must contain valid Territory/State Code`
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


/**
 * Validate Field Territory/State Code
 * @param {value} Transmittal Number Field Entered on Change Event.
 */
export function hasValidStateCode(fieldValue) {

    const result = territoryList.some(
        state => state['value'] === fieldValue.substring(0,2)
    )

    return result;

};
