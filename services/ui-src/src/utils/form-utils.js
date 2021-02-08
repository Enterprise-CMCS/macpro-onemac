import { territoryList } from "../libs/territoryLib";
import {CHANGE_REQUEST_TYPES} from "../changeRequest/changeRequestTypes";

/**
 * Validate SPA Id Transmittal Number Format
 * @return
 *
 */
export function validateSpaId(spaID, isExistingSpaId, formInfo) {
    let errorMessage = undefined
    let SpaTransmittalNumberFormatErrorMessage = "SS-YY-NNNN or SS-YY-NNNN-xxxx"
    let RegexFormatString = "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)"

    if (!spaID) {
        errorMessage = 'SPA ID Required !';
    }  else if (!hasValidStateCode(spaID)) {
        errorMessage = `The SPA ID must contain valid Territory/State Code`
    }  else if (!isValidFieldFormat(spaID, RegexFormatString)) {
        errorMessage = `The SPA ID must be in the format of ${SpaTransmittalNumberFormatErrorMessage} !`;
    }  else if (isExistingSpaId && formInfo.type === CHANGE_REQUEST_TYPES.SPA ) {
        errorMessage = "According to our records, this SPA ID already exists. Please check the SPA ID and try entering it again.";
    }  else if (!isExistingSpaId && formInfo.type === CHANGE_REQUEST_TYPES.SPA_RAI ) {
        errorMessage = "According to our records, this SPA ID does not exist. Please check the SPA ID and try entering it again.";
    }

    return errorMessage
}

/**
 * Validate Waiver Id Transmittal Number Format
 * @return
 */

export function validateWaiverId(waiverId, isExistingWaiverId, formFields, formInfo) {

    let errorMessage = undefined
    let RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)"
    let WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.M##"
    if (formFields["waiverAuthority"] !== "1915(c)") {
        RegexFormatString = RegexFormatString + "|(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.][0-9]{2}$)"
        WaiverTransmittalNumberFormatErrorMessage = WaiverTransmittalNumberFormatErrorMessage + " or SS.##.R##.##"
    } else {
            WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.##"
            RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.][0-9]{2}$)"
    }

    if (!waiverId) {
        errorMessage = 'Waiver Number Required !';
    }  else if (!hasValidStateCode(waiverId)) {
        errorMessage = `The Waiver Number must contain valid Territory/State Code`
    } else if (!isValidFieldFormat(waiverId, RegexFormatString)) {
        errorMessage = `The Waiver Number must be in the format of ${WaiverTransmittalNumberFormatErrorMessage} !`;
    } else if ( formInfo.idType === CHANGE_REQUEST_TYPES.WAIVER)
    {

        if (formFields["waiverAuthority"] === "1915(c)" ) {
          if (formFields["actionType"] !== "amendment" && !isExistingWaiverId) {
            errorMessage = "According to our records, this Waiver Number does not exist. Please check the Waiver Number and try entering it again.";
          }
        } else if (formFields["waiverAuthority"] !== "1915(c)"
            && formFields["actionType"] !== "new" && !isExistingWaiverId) {
             errorMessage = "According to our records, this Waiver Number does not exist. Please check the Waiver Number and try entering it again.";
        } else if (formFields["actionType"] === "new" && isExistingWaiverId) {
             errorMessage =
                "According to our records, this Waiver Number already exists. Please check the Waiver Number and try entering it again.";
        }
    } else if (!isExistingWaiverId && formFields["actionType"] !== "new") {
        errorMessage = "According to our records, this Waiver Number does not exist. Please check the Waiver Number and try entering it again.";
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
