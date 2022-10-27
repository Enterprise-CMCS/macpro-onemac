import { ONEMAC_TYPE } from "./workflow.js";

export const getWaiverFamily = (inId) => {
  const familyRE = new RegExp("^[A-Z]{2}[-.][0-9]{4,5}");

  if (!inId) return null;

  const returnValue = familyRE.exec(inId);
  return returnValue && returnValue[0];
};

export const decodeWaiverNumber = (inId) => {
  // amendments can have parents that are initials or renewals
  // initial if no R section or R00
  // renewal if R section has a number
  //const waiverRegex = new RegExp("^[A-Z]{2}[.][0-9]{4,5}");
  if (!inId) return null;

  // clean user entered errors, if possible
  const waiverNumber = inId.replace(".R.", ".R");

  const waiverRegex = new RegExp(
    "([A-Z]{2}[.-]\\d{2,5})(\\.R?(\\d{2})(\\.M?(\\d{2}))?)?"
  );

  const results = waiverRegex.exec(waiverNumber);
  if (!results) return null;

  const [, family, , renewal, maybeAppK, amendment] = results;

  const isAppK = maybeAppK === "." + amendment;

  return { family, renewal, amendment, isAppK };
};

export const getParentWaiver = (inId) => {
  const results = decodeWaiverNumber(inId);
  if (!(results && results.family && results.renewal))
    return ["Unknown", ONEMAC_TYPE.WAIVER_INITIAL];
  const { family, renewal } = results;

  if (renewal === "00") return [family + ".R00.00", ONEMAC_TYPE.WAIVER_INITIAL];
  const renewalNumber = family + ".R" + renewal + ".00";
  return [renewalNumber, ONEMAC_TYPE.WAIVER_RENEWAL];
};

export const getWaiverTypeFromNumber = (myId) => {
  const results = decodeWaiverNumber(myId);
  if (!results) return ONEMAC_TYPE.WAIVER_INITIAL;
  const { renewal, amendment, isAppK } = results;

  if (amendment && amendment !== "00") {
    return isAppK ? ONEMAC_TYPE.WAIVER_APP_K : ONEMAC_TYPE.WAIVER_AMENDMENT;
  }
  if (renewal === "00") return ONEMAC_TYPE.WAIVER_INITIAL;
  return ONEMAC_TYPE.WAIVER_RENEWAL;
};
