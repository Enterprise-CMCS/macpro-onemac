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
    intro: "Select a Waiver Type to start your Submission.",
    choices: [
      {
        title: "Request Temporary Extension",
        description: "Submit for 1915(b) or 1915(c)",
        linkTo: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      },
      {
        title: "1915(b) Waiver Actions",
        description: "Submit 1915(b) Waivers, Amendments & Renewals",
        linkTo: ONEMAC_ROUTES.TRIAGE_WAIVER_B,
      },
      {
        title: "1915(c) Appendix K Amendment",
        description: "Create a 1915(c) Appendix K amendment",
        linkTo: ONEMAC_ROUTES.APPENDIX_K_AMENDMENT,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER_B]: {
    heading: "1915(b)(4) Waiver Action Type",
    intro: "Select a 1915(b) Waiver type for your submission.",
    choices: [
      {
        title: "1915(b)(4) FFS Selective Contracting waivers",
        description: "Submit 1915(b)(4) Waivers, Amendments, and Renewals",
        linkTo: ONEMAC_ROUTES.TRIAGE_WAIVER_B_4,
      },
      {
        title: "All Other 1915(b) Waiver Authority",
        description:
          "Submit 1915(b) Waivers, Amendments, and Renewals<br/><b>Not applicable for 1915(b)(4) waiver actions</b>",
        linkTo: ONEMAC_ROUTES.TRIAGE_WAIVER_B_OTHER,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER_B_4]: {
    heading: "1915(b)(4) Waiver Authority",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "1915(b)(4) New Initial Waiver",
        description: "Create a new 1915(b)(4) initial waiver",
        linkTo: ONEMAC_ROUTES.INITIAL_WAIVER_B_4,
      },
      {
        title: "1915(b)(4) Renewal Waiver",
        description: "Renew an existing 1915(b)(4) waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_RENEWAL_B_4,
      },
      {
        title: "1915(b)(4) Amendment",
        description: "Amend an existing 1915(b)(4) waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_AMENDMENT_B_4,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER_B_OTHER]: {
    heading: "All Other 1915(b) Waiver Authority",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "1915(b) Initial Waiver",
        description: "Create a new 1915(b) initial waiver",
        linkTo: ONEMAC_ROUTES.INITIAL_WAIVER_B_OTHER,
      },
      {
        title: "1915(b) Waiver Renewal",
        description: "Renew an existing 1915(b) waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_RENEWAL_B_OTHER,
      },
      {
        title: "1915(b) Waiver Amendment",
        description: "Amend an existing 1915(b) waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_AMENDMENT_B_OTHER,
      },
    ],
  },
};
