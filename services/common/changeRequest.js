import { ROUTES } from "./routes.js";

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

export const LABEL = {
  [TYPE.CHIP_SPA]: "CHIP SPA",
  [TYPE.SPA]: "Medicaid SPA",
  [TYPE.WAIVER_BASE]: "1915(b) Base Waiver",
  [TYPE.WAIVER_RENEWAL]: "1915(b) Waiver Renewal",
  [TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
  [TYPE.WAIVER_EXTENSION]: "1915(b) Temporary Extension",
  [TYPE.WAIVER_AMENDMENT]: "1915(b) Amendment",
  [TYPE.WAIVER_RAI]: "1915(b) RAI Response",
};

export const correspondingRAILink = {
  [TYPE.CHIP_SPA]: ROUTES.CHIP_SPA_RAI,
  [TYPE.SPA]: ROUTES.SPA_RAI,
  [TYPE.WAIVER]: ROUTES.WAIVER_RAI,
  [TYPE.WAIVER_BASE]: ROUTES.WAIVER_RAI,
  [TYPE.WAIVER_RENEWAL]: ROUTES.WAIVER_RAI,
  [TYPE.WAIVER_AMENDMENT]: ROUTES.WAIVER_RAI,
};

const commonSubheaderMessage =
  "Once you submit this form, a confirmation email is sent to you and to CMS. CMS will use this content to review your package, and you will not be able to edit this form. If CMS needs any additional information, they will follow up by email.<b> If you leave this page, you will lose your progress on this form.</b>";

const raiSubheaderMessage =
  commonSubheaderMessage +
  "<br><br>" +
  "<b>Please note:</b> Formal RAI Response selection should only be used when submitting a response to a Formal RAI that would impact the clock.  If this submission is in response to informal questions and is not clock related, the state should be forwarding to the review team via email.";

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
      idFieldHint: [{ text: "Must follow the format SS-YY-NNNN-xxxx" }],
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
    raiLink: ROUTES.CHIP_SPA_RAI,
  },

  [TYPE.CHIP_SPA_RAI]: {
    pageTitle: "Respond to Formal CHIP SPA RAI",
    readOnlyPageTitle: "Formal CHIP SPA RAI Response Details",
    subheaderMessage: {
      __html: raiSubheaderMessage,
    },
    detailsHeader: "Formal CHIP SPA RAI",
    readOnlyDetailsHeader: "CHIP SPA RAI",
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
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFieldHint: [
        { text: "Please use the exact CHIP SPA ID sent with the RAI" },
      ],
      idFormat: "the Number format sent with the RAI",
      idRegex: "(^[A-Z]{2})",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "warn",
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
      idFieldHint: [
        { text: "Must follow the format SS-YY-NNNN-xxxx" },
        {
          text: "Reminder - CMS recommends that all SPA numbers start with the year in which the package is submitted.",
          className: "field-hint-major",
        },
      ],
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
    raiLink: ROUTES.SPA_RAI,
  },

  [TYPE.SPA_RAI]: {
    pageTitle: "Respond to Formal Medicaid SPA RAI",
    readOnlyPageTitle: "Medicaid SPA RAI Details",
    subheaderMessage: {
      __html: raiSubheaderMessage,
    },
    detailsHeader: "Formal Medicaid SPA RAI",
    readOnlyDetailsHeader: "Medicaid SPA RAI",
    requiredUploads: ["RAI Response"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "spa",
      idLabel: "SPA ID",
      idFieldHint: [
        { text: "Please use the exact Medicaid SPA ID sent with the RAI" },
      ],
      idFormat: "the Number format sent with the RAI",
      idRegex: "(^[A-Z]{2})",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "warn",
        },
      ],
      idFAQLink: ROUTES.FAQ_SPA_ID,
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
      idFieldHint: [
        { text: "Must follow the format required by the Action Type" },
      ],
      idFormat: "the Action Type.  Please select an Action Type first.",
      idRegex: "^[A-Z]{2}[-][0-9]{2}[.]R[0-9]{2}[.][0-9]{2}$",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    newTransmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idFieldHint: [
        {
          text: "Must be a new base number with the format SS-####.R00.00 or SS-#####.R00.00",
        },
      ],
      idFormat: "SS-####.R00.00 or SS-#####.R00.00",
      idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R00[.]00$",
      idFAQLink: ROUTES.FAQ_BASE_1915B_WAIVER_ID,
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    amendmentTransmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idFieldHint: [
        { text: "Must follow the format SS-####.R##.## or SS-#####.R##.##" },
      ],
      idFormat: "SS-####.R##.## or SS-#####.R##.##",
      idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.](0[1-9]|[1-9][0-9])$",
      idFAQLink: ROUTES.FAQ_1915B_WAIVER_AMENDMENT_ID,
      idExistValidations: [
        // Want the base or renewal waiver number to exist
        {
          idMustExist: true,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}",
          existenceAppend: ".00",
        },
        // DON'T want the entire Waiver number with amendment portion to exist
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    renewalTransmittalNumber: {
      ...waiverBaseTransmittalNumber,
      idFieldHint: [
        { text: "Must follow the format SS-####.R##.00 or SS-#####.R##.00" },
      ],
      idFormat: "SS-####.R##.00 or SS-#####.R##.00",
      idRegex: "^[A-Z]{2}[-][0-9]{4,5}[.]R(0[1-9]|[1-9][0-9])[.]00$",
      idFAQLink: ROUTES.FAQ_1915B_WAIVER_RENEWAL_ID,
      idExistValidations: [
        // Want the base waiver number to exist
        {
          idMustExist: true,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[-][0-9]{4,5}",
          existenceAppend: ".R00.00",
        },
        // DON'T want the entire Waiver number with renewal portion to exist
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
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
      idFAQLink: ROUTES.FAQ_WAIVER_APP_K_ID,
      idFieldHint: [
        {
          text: "Must follow the format SS-####.R##.## or SS-#####.R##.## (use R00 for waivers without renewals)",
        },
      ],
      idFormat: "SS-####.R##.## or SS-#####.R##.##",
      idRegex: "(^[A-Z]{2}[-][0-9]{4,5}[.]R[0-9]{2}[.][0-9]{2}$)",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "warn",
          existenceRegex: "^[A-Z]{2}[-][0-9]{4,5}",
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
    detailsHeader: "Temporary Extension Request",
    requiredUploads: ["Waiver Extension Request"],
    optionalUploads: ["Other"],

    transmittalNumber: {
      idType: "waiver",
      idLabel: "Waiver Number",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idFieldHint: [
        {
          text: "Please enter the waiver number used on your initial submission",
        },
      ],
      idFormat: "the Number format used on the initial submission",
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
      idFieldHint: [
        { text: "Please use the exact Waiver Number sent with the RAI" },
      ],
      idFormat: "the Number format sent with the RAI",
      idRegex: "(^[A-Z]{2})",
      idExistValidations: [
        {
          idMustExist: true,
          errorLevel: "warn",
        },
      ],
    },
  },
};

CONFIG[TYPE.WAIVER_RENEWAL] = CONFIG[TYPE.WAIVER];
