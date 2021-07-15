import { ROUTES } from "./routes";

export const TYPE = {
  CHIP_SPA: "chipspa",
  CHIP_SPA_RAI: "chipsparai",
  SPA: "spa",
  SPA_RAI: "sparai",
  WAIVER: "waiver",
  WAIVER_RAI: "waiverrai",
  WAIVER_EXTENSION: "waiverextension",
  WAIVER_APP_K: "waiverappk",
};

const commonSubheaderMessage = {
  __html:
    "Once you submit this form, a confirmation email is sent to you and to CMS. CMS will use this content to review your package, and you will not be able to edit this form. If CMS needs any additional information, they will follow up by email.<b> If you leave this page, you will lose your progress on this form.</b>",
};

const waiverBaseTransmittalNumber = {
  idType: "waiver",
  idLabel: "Waiver Number",
  idFAQLink: ROUTES.FAQ_WAIVER_ID,
};

export const CONFIG = {
  [TYPE.CHIP_SPA]: {
    pageTitle: "Submit New CHIP SPA",
    readOnlyPageTitle: "CHIP SPA Submission Details",
    detailsHeader: "CHIP SPA",
    subheaderMessage: commonSubheaderMessage,
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
  },

  [TYPE.CHIP_SPA_RAI]: {
    pageTitle: "Respond to CHIP SPA RAI",
    readOnlyPageTitle: "CHIP SPA RAI Response Details",
    subheaderMessage: commonSubheaderMessage,
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
    subheaderMessage: commonSubheaderMessage,
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
  },

  [TYPE.SPA_RAI]: {
    pageTitle: "Respond to Medicaid SPA RAI",
    readOnlyPageTitle: "Medicaid SPA RAI Response Details",
    subheaderMessage: commonSubheaderMessage,
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
    subheaderMessage: commonSubheaderMessage,
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
        { label: "New waiver", value: "new" },
        { label: "Waiver amendment", value: "amendment" },
        {
          label: "Request for waiver renewal",
          value: "renewal",
        },
      ],
      defaultItem: "an action type",
    },
    waiverAuthority: {
      fieldName: "waiverAuthority",
      errorMessage: "Please select the Waiver Authority.",
      optionsList: [
        {
          label: "1915(b)(4) FFS Selective Contracting waivers",
          value: "1915(b)(4)",
        },
        { label: "All other 1915(b) Waivers", value: "1915(b)" },
      ],
      defaultItem: "a waiver authority",
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
  },

  [TYPE.WAIVER_APP_K]: {
    pageTitle: "Submit 1915(c) Appendix K Amendment",
    readOnlyPageTitle: "1915(c) Appendix K Amendment",
    subheaderMessage:
      commonSubheaderMessage +
      "If your Appendix K submission is for more than one waiver number, please enter one of the applicable waiver numbers. You do not need to create multiple submissions.",
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
    subheaderMessage: commonSubheaderMessage,
    detailsHeader: "Request Temporary Extension",
    requiredUploads: ["Waiver Extension Request"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "waiver",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idHintText: "Must follow the format SS.#### or SS.#####",
      idFormat: "SS.#### or SS.#####",
      idRegex: "(^[A-Z]{2}[.][0-9]{4,5}$)",
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
    subheaderMessage: commonSubheaderMessage,
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
        "(^[A-Z]{2}[.][0-9]{4,5}$)|(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}$)|(^[A-Z]{2}[.][0-9]{4,5}[.]R[0-9]{2}[.]M[0-9]{2}$)",
      idExistValidations: [
        {
          idMustExist: true,
        },
      ],
    },
  },
};
