import { ONEMAC_TYPE } from "./workflow.js";

// const defaultSPARegex =
//   "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)";

export const ONEMAC_ID_REGEX = {
  [ONEMAC_TYPE.WAIVER_BASE]: "^[A-Z]{2}[.][0-9]{4,5}[.]R00.00$",
  [ONEMAC_TYPE.WAIVER_EXTENSION]:
    "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}.TE[0-9]{2}$",
};

export const ID_EXISTS_REGEX = {
  [ONEMAC_TYPE.WAIVER_BASE]: "^[A-Z]{2}[.][0-9]{4,5}[.]R00.00$",
  [ONEMAC_TYPE.WAIVER_EXTENSION]:
    "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}.TE[0-9]{2}$",
};

export const getWaiverFamily = (inId) => {
  const familyRE = new RegExp("^[A-Z]{2}[.][0-9]{4,5}");

  if (!inId) return null;

  // SEA Tool sometimes uses hyphens in Waiver Numbers
  const waiverNumber = inId.replace("-", ".");

  const returnValue = familyRE.exec(waiverNumber);
  return returnValue && returnValue[0];
};

export const decodeWaiverNumber = (inId) => {
  // amendments can have parents that are bases or renewals
  // base if no R section or R00
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

  const [, family, , renewal, , amendment] = results;

  return { family, renewal, amendment };
};

export const getParentWaiver = (inId) => {
  const results = decodeWaiverNumber(inId);
  if (!results) return ["FakeID", ONEMAC_TYPE.WAIVER_BASE];
  const { family, renewal } = results;

  if (renewal === "00") return [family + ".R00.00", ONEMAC_TYPE.WAIVER_BASE];
  const renewalNumber = family + ".R" + renewal + ".00";
  return [renewalNumber, ONEMAC_TYPE.WAIVER_RENEWAL];
};
