import { DateTime } from "luxon";
import Joi from "joi";

import { ChangeRequest, territoryCodeList } from "cmscommonlib";

import SPA from "./SPA";
import SPARAI from "./SPARAI";
import Waiver from "./Waiver";
import WaiverRAI from "./WaiverRAI";
import WaiverExtension from "./WaiverExtension";
import WaiverAppK from "./WaiverAppK";
import CHIPSPA from "./CHIPSPA";
import CHIPSPARAI from "./CHIPSPARAI";

/**
 * Get a singleton object that overloads the getCMSEmail and getStateEmail
 * with the specfic functions for the data type.
 * @param {String} type the change request type sent to the back end
 * @returns {Object, undefined} the object with the functions, or undefined
 * to let developer know the emails haven't been set for that type.
 */
export default function getChangeRequestFunctions(type) {
  return {
    [ChangeRequest.TYPE.CHIP_SPA]: CHIPSPA,
    [ChangeRequest.TYPE.CHIP_SPA_RAI]: CHIPSPARAI,
    [ChangeRequest.TYPE.SPA]: SPA,
    [ChangeRequest.TYPE.SPA_RAI]: SPARAI,
    [ChangeRequest.TYPE.WAIVER]: Waiver,
    [ChangeRequest.TYPE.WAIVER_INITIAL]: Waiver,
    [ChangeRequest.TYPE.WAIVER_APP_K]: WaiverAppK,
    [ChangeRequest.TYPE.WAIVER_EXTENSION]: WaiverExtension,
    [ChangeRequest.TYPE.WAIVER_RAI]: WaiverRAI,
  }[type];
}

/**
 * Get HTML instructions for accessing submissions in the application.
 * @returns {string}
 */
export function getAccessInstructions() {
  return `
    <ul>
      <li>
        The submission can be accessed in the OneMAC application, which you can
        find at <a href="${process.env.applicationEndpoint}/dashboard">this link</a>.
      </li>
      <li>
        If you are not already logged in, please click the "Login" link at the
        top of the page and log in using your Enterprise User Administration
        (EUA) credentials.
      </li>
      <li>
        After you have logged in, you will be taken to the OneMAC application.
        The submission will be listed on the dashboard page, and you can view
        its details by clicking on its ID number.
      </li>
    </ul>
  `;
}

/**
 * Get HTML containing links representing the attached documents.
 * @param {Object} uploads data describing the uploaded file, with title, url, and filename
 * @returns {String} HTML with the document links.
 */
export function getLinksHtml(uploads) {
  if (!Array.isArray(uploads) || uploads.length === 0) return "";

  return (
    "<ul>" +
    uploads
      .filter((u) => u && u.title && u.filename)
      .map(({ title, filename }) => `<li>${title}: ${filename}</li>`)
      .join("") +
    "</ul>"
  );
}

/**
 * takes a UTC timestamp, converts to CMS TimeZone, and formats it in the CMS email way
 * @param {Number} theTimestamp the Unix timestamp to be used as the date
 * @returns {String} CMS approved date format.
 */
export function getCMSDateFormat(theTimestamp) {
  const theDate = DateTime.fromMillis(theTimestamp).setZone("America/New_York");

  return theDate.toFormat("DDDD '@ 11:59pm' ZZZZ");
}

/**
 * Validate Field Territory/State Code
 * @param {value} Transmittal Number Field Entered on Change Event.
 */
export function hasValidStateCode(fieldValue) {
  const result = territoryCodeList.includes(fieldValue.substring(0, 2));

  return result;
}

// reference: https://www.iana.org/assignments/media-types/media-types.xhtml
// also see RFC6838
const MIME_TYPE_PATTERN =
  /(application|audio|font|image|message|model|multipart|text|video)\/.+/;

const getUploadName = (uploadCfg) =>
  typeof uploadCfg === "string" ? uploadCfg : uploadCfg.title;

export function validateSubmission(data) {
  // first, validate the basic structure shared by all submissions
  const uploadSchema = Joi.object({
    contentType: Joi.string().pattern(MIME_TYPE_PATTERN).required(),
    filename: Joi.string().required(),
    s3Key: Joi.string().required(),
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
  });
  const basicSchema = Joi.object({
    // inserted by backend
    createdAt: Joi.number(),
    id: Joi.string().guid(),
    state: Joi.string(),
    userId: Joi.string(),
    // user submitted
    actionType: Joi.string().allow(""),
    waiverAuthority: Joi.string().allow(""),
    proposedEffectiveDate: Joi.string().isoDate().allow(""),
    summary: Joi.string().allow("").max(4000),
    territory: Joi.string()
      .valid(...territoryCodeList)
      .required(),
    parentNumber: Joi.string().allow(""),
    transmittalNumber: Joi.string().required(),
    transmittalNumberWarningMessage: Joi.string().allow(""),
    type: Joi.string()
      .valid(...Object.values(ChangeRequest.TYPE))
      .required(),
    uploads: Joi.array().items(uploadSchema).min(1).required(),
    user: Joi.object(),
  });

  const { error: basicError, value: valueAfterBasic } =
    basicSchema.validate(data);
  if (basicError) {
    if (process.env.NODE_ENV !== "test") {
      console.error(basicError, valueAfterBasic);
    }
    return basicError;
  }

  // then, retrieve the specific config for this submission type and check it
  // against the particular business requirements it must fulfill
  const config = ChangeRequest.CONFIG[data.type];

  let transmittalNumber = Joi.string();
  if (
    data.type === ChangeRequest.TYPE.WAIVER &&
    config[`${data.actionType}TransmittalNumber`]?.idRegex
  ) {
    transmittalNumber = transmittalNumber.pattern(
      new RegExp(config[`${data.actionType}TransmittalNumber`].idRegex)
    );
  } else if (config.transmittalNumber?.idRegex) {
    transmittalNumber = transmittalNumber.pattern(
      new RegExp(config.transmittalNumber.idRegex)
    );
  }

  let uploads = Joi.array().items(
    uploadSchema.append({
      title: Joi.string().valid(
        ...[...config.requiredUploads, ...config.optionalUploads].map(
          getUploadName
        )
      ),
    })
  );
  for (const field of config.requiredUploads) {
    uploads = uploads.has(
      uploadSchema.append({
        title: Joi.string().valid(getUploadName(field)).valid().required(),
      })
    );
  }
  for (const field of [...config.requiredUploads, ...config.optionalUploads]) {
    if (typeof field !== "string" && field.allowMultiple === false) {
      uploads = uploads.unique(
        (a, b) => a.title === b.title && a.title === field.title
      );
    }
  }

  const advancedSchema = basicSchema.append({
    transmittalNumber,
    uploads,
  });

  const { error: advancedError, value: valueAfterAdvanced } =
    advancedSchema.validate(data);
  if (advancedError) {
    if (process.env.NODE_ENV !== "test") {
      console.error(advancedError, valueAfterAdvanced);
    }
    return advancedError;
  }
}
