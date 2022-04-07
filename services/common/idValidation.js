import { ONEMAC_TYPE } from "./workflow";

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

export const getParentPackage = (inId) => {
  const results = decodeWaiverNumber(inId);
  if (!results) return ["FakeID", ONEMAC_TYPE.WAIVER_BASE];
  const { family, renewal } = results;

  if (renewal === "00") return [family + ".R00.00", ONEMAC_TYPE.WAIVER_BASE];
  const renewalNumber = family + ".R" + renewal;
  return [renewalNumber, ONEMAC_TYPE.WAIVER_RENEWAL];
};

export const getWaiverRAIParent = (inId) => {
  const results = decodeWaiverNumber(inId);
  if (!results) return ONEMAC_TYPE.WAIVER_BASE;
  const { renewal, amendment } = results;

  if (amendment) return ONEMAC_TYPE.WAIVER_AMENDMENT;
  if (!amendment && renewal && renewal !== "00")
    return ONEMAC_TYPE.WAIVER_RENEWAL;
  return ONEMAC_TYPE.WAIVER_BASE;
};

export const decodeId = (inId, inType) => {
  const returnInfo = {
    packageId: inId,
    parentType: ONEMAC_TYPE.SPA,
    componentId: inId,
    componentType: inType,
    isNewPackage: true,
  };
  const posTE = inId.search(".TE");

  switch (inType) {
    case ONEMAC_TYPE.CHIP_SPA_RAI:
      returnInfo.parentType = ONEMAC_TYPE.CHIP_SPA;
    // falls through
    case ONEMAC_TYPE.SPA_RAI:
      returnInfo.isNewPackage = false;
      break;
    case ONEMAC_TYPE.WAIVER_RAI:
    case ONEMAC_TYPE.WAIVER_EXTENSION:
      if (posTE > 0)
        [returnInfo.packageId, returnInfo.parentType] = getParentPackage(inId);
      else returnInfo.parentType = getWaiverRAIParent(inId);
      returnInfo.isNewPackage = false;
      break;
    case ONEMAC_TYPE.WAIVER_AMENDMENT:
    case ONEMAC_TYPE.WAIVER_APP_K:
      [returnInfo.packageId, returnInfo.parentType] = getParentPackage(inId);
      returnInfo.isNewPackage = false;
      break;
    case ONEMAC_TYPE.WAIVER:
    case ONEMAC_TYPE.WAIVER_BASE:
    case ONEMAC_TYPE.WAIVER_RENEWAL:
      returnInfo.parentType = inType;
      break;
  }
  return returnInfo;
};
