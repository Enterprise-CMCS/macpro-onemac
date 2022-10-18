import { ONEMAC_ROUTES } from "cmscommonlib";

export const choicesFromRoute = {
  [ONEMAC_ROUTES.TRIAGE_GROUP]: {
    heading: "Submission Type",
    intro: "Select a Submission Type.",
    choices: [
      {
        title: "State Plan Amendment (SPA)",
        description: "Submit a new Medicaid or CHIP State Plan Amendment",
        linkTo: ONEMAC_ROUTES.TRIAGE_SPA,
      },
      {
        title: "Waiver Action",
        description:
          "Submit Waivers, Amendments, Renewals, or Temp. Extensions",
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
        title: "1915(b) Initial Waiver",
        description: "Create a new 1915(b) initial waiver",
        linkTo: ONEMAC_ROUTES.INITIAL_WAIVER,
      },
      {
        title: "1915(b) Waiver Renewal",
        description: "Renew an existing 1915(b) waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_RENEWAL,
      },
      {
        title: "1915(b) Waiver Amendment",
        description: "Amend an existing 1915(b) waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_AMENDMENT,
      },
      {
        title: "1915(c) Appendix K Amendment",
        description: "Create a 1915(c) Appendix K amendment",
        linkTo: ONEMAC_ROUTES.APPENDIX_K_AMENDMENT,
      },
      {
        title: "Request Temporary Extension",
        description: "Submit for 1915(b) and 1915(c)",
        linkTo: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      },
    ],
  },
};
