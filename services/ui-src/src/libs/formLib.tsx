import { ROUTES, Workflow } from "cmscommonlib";

type SelectOption = { label: string; value: string };

type OneMACIDInfo = {
  idLabel: string;
  idFormat: string;
  idHintText: string[];
  idFAQLink: string;
  idExistValidations: {
    existenceRegex?: RegExp;
    idMustExist?: boolean;
    errorLevel: string;
  }[];
};

export enum COMPONENT_ACTION {
  RESPOND_TO_RAI = "Respond to RAI",
  WITHDRAW = "Withdraw",
}

type WaiverFormInfo = {
  waiverAuthority: { optionsList: SelectOption[] };
  proposedEffectiveDate: { fieldName: string };
};

export type OneMACFormInfo = {
  pageTitle: string;
  addlIntroJSX?: string;
  detailsHeader?: string;
  transmittalNumber: OneMACIDInfo;
  requiredUploads: unknown;
  optionalUploads: unknown;
  actionsByStatus: Record<string, COMPONENT_ACTION[]>;
  raiLink: string;
  landingPage: string;
} & Partial<WaiverFormInfo>;

const defaultWaiverAuthority = {
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
};

export const FORM = {
  [ROUTES.BASE_WAIVER]: {
    type: Workflow.ONEMAC_TYPE.WAIVER_BASE,
    actionType: "new",
    pageTitle: "Base Waiver Submission",
    detailsHeader: "Base Waiver",
    addlIntroJSX: "",
    requiredUploads: [],
    optionalUploads: [
      "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
      "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
      "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
      "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
      "Tribal Consultation (Initial, Renewal, Amendment)",
      "Other",
    ],

    waiverAuthority: defaultWaiverAuthority,
    transmittalNumber: {
      idType: "waiver",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idLabel: "Base Waiver Number",
      idHintText: [
        "Must be a new base number with the format SS.####.R00.00 or SS.#####.R00.00",
      ],
      idFormat: "SS.####.R00.00 or SS.#####.R00.00",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },

    proposedEffectiveDate: {
      fieldName: "proposedEffectiveDate",
    },

    actionsByStatus: Workflow.defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
    landingPage: ROUTES.PACKAGE_LIST_WAIVER,
  },
  [ROUTES.TEMPORARY_EXTENSION]: {
    type: Workflow.ONEMAC_TYPE.WAIVER_EXTENSION,
    actionType: "",
    pageTitle: "Request a Temporary Extension",
    detailsHeader: "Temporary Extension Request",
    requiredUploads: ["Waiver Extension Request"],
    optionalUploads: ["Other"],
    transmittalNumber: {
      idType: "waiver",
      idFAQLink: ROUTES.FAQ_WAIVER_ID,
      idLabel: "Temporary Extension Request Number",
      idHintText: [
        "Must be a waiver extension request number with the format SS.####.R##.TE## or SS.#####.R##.TE##",
      ],
      idFormat: "SS.####.R##.TE## or SS.#####.R##.TE##",
      idExistValidations: [
        {
          idMustExist: false,
          errorLevel: "error",
        },
      ],
    },
    actionsByStatus: Workflow.defaultActionsByStatus,
    raiLink: ROUTES.WAIVER_RAI,
    landingPage: ROUTES.PACKAGE_LIST_WAIVER,
  },
};
