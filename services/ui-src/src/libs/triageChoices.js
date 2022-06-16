import { ONEMAC_ROUTES } from "cmscommonlib";

export const choicesFromRoute = {
  [ONEMAC_ROUTES.TRIAGE_GROUP]: {
    heading: "Submission Type",
    intro: "Select a Submission Type.",
    choices: [
      {
        title: "State Plan Amendment (SPA)",
        description:
          "Submit a new Medicaid & CHIP State Plan Amendments or RAI",
        linkTo: ONEMAC_ROUTES.TRIAGE_SPA,
      },
      {
        title: "Waiver Action",
        description:
          "Submit Waivers, Amendments, Renewals, RAI, or Temp. Extension",
        linkTo: ONEMAC_ROUTES.TRIAGE_WAIVER,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_SPA]: {
    heading: "SPA Type",
    intro: "Select a SPA type to start your submission.",
    choices: [
      {
        title: "Medicaid SPA",
        description: "Submit a new Medicaid State Plan Amendment",
        linkTo: ONEMAC_ROUTES.MEDICAID_SPA,
      },
      {
        title: "CHIP SPA",
        description: "Submit a new CHIP State Plan Amendment",
        linkTo: ONEMAC_ROUTES.CHIP_SPA,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER]: {
    heading: "Waiver Action Type",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "Base Waiver",
        description: "Create a new Base Waiver",
        linkTo: ONEMAC_ROUTES.BASE_WAIVER,
      },
      {
        title: "Request Temporary Extension",
        description: "Submit for 1915(b) and 1915(c)",
        linkTo: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      },
    ],
  },
};
