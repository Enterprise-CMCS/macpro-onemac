import { ROUTES } from "./routes";

export const PACKAGE_GROUP = {
  SPA: "spa",
  WAIVER: "waiver",
};

export const TYPE = {
  CHIP_SPA: "chipspa",
  CHIP_SPA_RAI: "chipsparai",
  SPA: "spa",
  SPA_RAI: "sparai",
  WAIVER: "waiver",
  WAIVER_BASE: "waivernew",
  WAIVER_AMENDMENT: "waiveramendment",
  WAIVER_RENEWAL: "waiverrenewal",
  WAIVER_RAI: "waiverrai",
  WAIVER_EXTENSION: "waiverextension",
  WAIVER_APP_K: "waiverappk",
};

export const MY_PACKAGE_GROUP = {
  [TYPE.CHIP_SPA]: PACKAGE_GROUP.SPA,
  [TYPE.SPA]: PACKAGE_GROUP.SPA,
  [TYPE.WAIVER]: PACKAGE_GROUP.WAIVER,
  [TYPE.WAIVER_BASE]: PACKAGE_GROUP.WAIVER,
  [TYPE.WAIVER_RENEWAL]: PACKAGE_GROUP.WAIVER,
};

export const ONEMAC_STATUS = {
  UNSUBMITTED: "Unsubmitted",
  SUBMITTED: "Submitted",
  IN_REVIEW: "Package In Review",
  RAI_ISSUED: "RAI Issued",
  APPROVED: "Package Approved",
  DISAPPROVED: "Package Disapproved",
  WITHDRAWN: "Package Withdrawn",
  TERMINATED: "Waiver Terminated",
  PAUSED: "Review Paused, Off the Clock",
};

export const PACKAGE_ACTION = {
  RESPOND_TO_RAI: "Respond to RAI",
  WITHDRAW: "Withdraw Package",
};

export const correspondingRAILink = {
  [TYPE.CHIP_SPA]: ROUTES.CHIP_SPA_RAI,
  [TYPE.SPA]: ROUTES.SPA_RAI,
  [TYPE.WAIVER]: ROUTES.WAIVER_RAI,
  [TYPE.WAIVER_BASE]: ROUTES.WAIVER_RAI,
};

export const getBaseWaiverId = (inId) => {
  const baseRE = new RegExp("^[A-Z]{2}[.][0-9]{4,5}");

  if (!inId) return null;

  // SEA Tool sometimes uses hyphens in Waiver Numbers
  const waiverNumber = inId.replace("-", ".");

  const returnValue = baseRE.exec(waiverNumber);
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
  if (!results) return ["FakeID", TYPE.WAIVER_BASE];
  const { family, renewal } = results;

  if (renewal === "00") return [family, TYPE.WAIVER_BASE];
  const renewalNumber = family + ".R" + renewal;
  return [renewalNumber, TYPE.WAIVER_RENEWAL];
};

export const getWaiverRAIParent = (inId) => {
  const results = decodeWaiverNumber(inId);
  if (!results) return TYPE.WAIVER_BASE;
  const { renewal, amendment } = results;

  if (amendment) return TYPE.WAIVER_AMENDMENT;
  if (!amendment && renewal && renewal !== "00") return TYPE.WAIVER_RENEWAL;
  return TYPE.WAIVER_BASE;
};

export const decodeId = (inId, inType) => {
  const returnInfo = {
    packageId: inId,
    parentType: TYPE.SPA,
    componentId: inId,
    componentType: inType,
    isNewPackage: true,
  };
  switch (inType) {
    case TYPE.CHIP_SPA_RAI:
      returnInfo.parentType = TYPE.CHIP_SPA;
    // falls through
    case TYPE.SPA_RAI:
      returnInfo.isNewPackage = false;
      break;
    case TYPE.WAIVER_RAI:
    case TYPE.WAIVER_EXTENSION:
      returnInfo.parentType = getWaiverRAIParent(inId);
      returnInfo.isNewPackage = false;
      break;
    case TYPE.WAIVER_AMENDMENT:
    case TYPE.WAIVER_APP_K:
      [returnInfo.packageId, returnInfo.parentType] = getParentPackage(inId);
      returnInfo.isNewPackage = false;
      break;
    case TYPE.WAIVER:
    case TYPE.WAIVER_BASE:
    case TYPE.WAIVER_RENEWAL:
      returnInfo.parentType = inType;
      break;
  }
  return returnInfo;
};

const commonSubheaderMessage =
  "Once you submit this form, a confirmation email is sent to you and to CMS. CMS will use this content to review your package, and you will not be able to edit this form. If CMS needs any additional information, they will follow up by email.<b> If you leave this page, you will lose your progress on this form.</b>";

const waiverBaseTransmittalNumber = {
  idType: "waiver",
  idLabel: "Waiver Number",
  idFAQLink: ROUTES.FAQ_WAIVER_ID,
};

const defaultActionsByStatus = {
  [ONEMAC_STATUS.UNSUBMITTED]: [],
  [ONEMAC_STATUS.SUBMITTED]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.IN_REVIEW]: [PACKAGE_ACTION.WITHDRAW],
  [ONEMAC_STATUS.RAI_ISSUED]: [
    PACKAGE_ACTION.WITHDRAW,
    PACKAGE_ACTION.RESPOND_TO_RAI,
  ],
  [ONEMAC_STATUS.APPROVED]: [],
  [ONEMAC_STATUS.DISAPPROVED]: [],
  [ONEMAC_STATUS.WITHDRAWN]: [],
  [ONEMAC_STATUS.TERMINATED]: [],
};

export const CONFIG = {
  [TYPE.CHIP_SPA]: {
    pageTitle: "Submit New CHIP SPA",
    readOnlyPageTitle: "CHIP SPA Submission Details",
    detailsHeader: "CHIP SPA",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    requiredUploads: [
      "Current State Plan",
      "Amended State Plan Language",
      "Cover Letter",
    ],
    optionalUploads: [
      "Budget Documents",
      "Public Notice",
      "Tribal Consultation",
      "Other",
    ],
    transmittalNumber: {
      idType: "chipspa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    actionsByStatus: defaultActionsByStatus,
    raiLink: ROUTES.CHIP_SPA_RAI,
  },

  [TYPE.CHIP_SPA_RAI]: {
    pageTitle: "Respond to CHIP SPA RAI",
    readOnlyPageTitle: "CHIP SPA RAI Response Details",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    detailsHeader: "CHIP SPA RAI",
    requiredUploads: [
      "Revised Amended State Plan Language",
      "Official RAI Response",
    ],
    optionalUploads: [
      "Budget Documents",
      "Public Notice",
      "Tribal Consultation",
      "Other",
    ],
    transmittalNumber: {
      idType: "chipspa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "error",
        },
      ],
    },
  },

  [TYPE.SPA]: {
    pageTitle: "Submit New Medicaid SPA",
    readOnlyPageTitle: "Medicaid SPA Submission Details",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    detailsHeader: "Medicaid SPA",
    requiredUploads: [
      { title: "CMS Form 179", allowMultiple: false },
      "SPA Pages",
    ],
    optionalUploads: [
      "Cover Letter",
      "Document Demonstrating Good-Faith Tribal Engagement",
      "Existing State Plan Page(s)",
      "Public Notice",
      "Standard Funding Questions (SFQs)",
      "Tribal Consultation",
      "Other",
    ],
    transmittalNumber: {
      idType: "spa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    actionsByStatus: defaultActionsByStatus,
    raiLink: ROUTES.SPA_RAI,
  },

  [TYPE.SPA_RAI]: {
    pageTitle: "Respond to Medicaid SPA RAI",
    readOnlyPageTitle: "Medicaid SPA RAI Response Details",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    detailsHeader: "Medicaid SPA RAI",
    requiredUploads: ["RAI Response"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "spa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "error",
        },
      ],
    },
  },

  [TYPE.WAIVER]: {
    pageTitle: "Submit New Waiver Action",
    readOnlyPageTitle: "Waiver Action Details",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    detailsHeader: "Waiver Action",
    requiredUploads: [],
    optionalUploads: [
      "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
      "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
      "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
      "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
      "Tribal Consultation (Initial, Renewal, Amendment)",
      "Other",
    ],

    actionType: {
      fieldName: "actionType",
      errorMessage: "Please select the Action Type.",
      optionsList: [
        { label: "-- select an action type --", value: "" },
        { label: "New waiver", value: "new" },
        { label: "Waiver amendment", value: "amendment" },
        {
          label: "Request for waiver renewal",
          value: "renewal",
        },
      ],
    },
    waiverAuthority: {
      fieldName: "waiverAuthority",
      errorMessage: "Please select the Waiver Authority.",
      optionsList: [
        { label: "-- select a waiver authority --", value: "" },
        {
          label: "1915(b)(4) FFS Selective Contracting waivers",
          value: "1915(b)(4)",
        },
        { label: "All other 1915(b) Waivers", value: "1915(b)" },
      ],
    },
    transmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idHintText: "Must follow the format required by the Action Type",
      idFormat: "the Action Type.  Please select an Action Type first.",
      idRegex: "^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    newTransmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idHintText:
        "Must be a new base number with the format SS.#### or SS.#####",
      idFormat: "SS.#### or SS.#####",
      idRegex: "^[A-Z]{2}[.][0-9]{4,5}$",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    amendmentTransmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idHintText: "Must follow the format SS.####.R##.M## or SS.#####.R##.M##",
      idFormat: "SS.####.R##.M## or SS.#####.R##.M##",
      idRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.]M[0-9]{2}$",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}",
        },
      ],
    },
    renewalTransmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idHintText: "Must follow the format SS.####.R## or SS.#####.R##",
      idFormat: "SS.####.R## or SS.#####.R##",
      idRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}$",
      idExistValidations: [
        // Want the base waiver number to exist
        {
          idMustExist: true,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[.][0-9]{4,5}",
        },
        // DON'T want the entire Waiver number with renewal portion to exist
        {
          idMustExist: false,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}",
        },
      ],
    },
    actionsByStatus: defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
  },

  [TYPE.WAIVER_APP_K]: {
    pageTitle: "Submit 1915(c) Appendix K Amendment",
    readOnlyPageTitle: "1915(c) Appendix K Amendment",
    subheaderMessage: {
      __html:
        commonSubheaderMessage +
        "If your Appendix K submission is for more than one waiver number, please enter one of the applicable waiver numbers. You do not need to create multiple submissions.",
    },
    detailsHeader: "1915(c) Appendix K Amendment",
    requiredUploads: ["1915(c) Appendix K Amendment Waiver Template"],
    optionalUploads: ["Other"],
    transmittalNumber: {
      idType: "waiverappk",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idHintText:
        "Must follow the format SS.####.R##.## or SS.#####.R##.## (use R00 for waivers without renewals)",
      idFormat: "SS.####.R##.## or SS.#####.R##.##",
      idRegex: "(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.][0-9]{2}$)",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[.][0-9]{4,5}",
        },
      ],
    },
  },

  [TYPE.WAIVER_EXTENSION]: {
    pageTitle: "Request Waiver Temporary Extension",
    readOnlyPageTitle: "Waiver Temporary Extension Request Details",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    detailsHeader: "Request Temporary Extension",
    requiredUploads: ["Waiver Extension Request"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "waiver",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idHintText: "Must follow the format SS.#### or SS.#####",
      idFormat: "SS.#### or SS.#####",
      idRegex: "(^[A-Z]{2}[.-][0-9]{4,5}$)",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "error",
        },
      ],
    },
  },

  [TYPE.WAIVER_RAI]: {
    pageTitle: "Respond to Waiver RAI",
    readOnlyPageTitle: "Waiver RAI Response Details",
    subheaderMessage: {
      __html: commonSubheaderMessage,
    },
    detailsHeader: "Waiver RAI",
    requiredUploads: ["Waiver RAI Response"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "waiver",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idHintText: "Please use the exact Waiver Number sent with the RAI",
      idFormat: "the Number format sent with the RAI",
      idRegex:
        "(^[A-Z]{2}[.-][0-9]{4,5}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}$)|(^[A-Z]{2}[.-][0-9]{4,5}[.]R[0-9]{2}[.]M?[0-9]{2}$)",
      idExistValidations: [
        {
          idMustExist: true,
        },
      ],
    },
  },
};

CONFIG[TYPE.WAIVER_BASE] = CONFIG[TYPE.WAIVER];
CONFIG[TYPE.WAIVER_RENEWAL] = CONFIG[TYPE.WAIVER];
