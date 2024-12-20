import { ONEMAC_ROUTES, ROUTES } from "cmscommonlib";

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
        linkTo: ONEMAC_ROUTES.TRIAGE_MEDICAID_SPA,
      },
      {
        title: "CHIP SPA",
        description: "Submit a new CHIP State Plan Amendment",
        linkTo: ONEMAC_ROUTES.TRIAGE_CHIP_SPA,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_MEDICAID_SPA]: {
    heading: "Medicaid SPA Type",
    intro: "Select a Medicaid SPA type to create your submission",
    choices: [
      {
        title:
          "Medicaid Eligibility, Enrollment, Administration, and Health Homes",
        description: "Redirects to the MACPro system",
        linkTo: ROUTES.MEDICAID_ELIGIBILITY_LANDING,
      },
      {
        title:
          "Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and Cost Sharing",
        description: "Redirects to MMDL submission system",
        linkTo: ROUTES.ABP_LANDING,
      },
      {
        title: "All Other Medicaid SPA Submissions",
        description: "Create a new Medicaid State Plan Amendment",
        linkTo: ONEMAC_ROUTES.MEDICAID_SPA,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_CHIP_SPA]: {
    heading: "CHIP SPA Type",
    intro: "Select a CHIP SPA type to create your submission",
    choices: [
      {
        title: "CHIP Eligibility",
        description: "Redirects to MMDL submission system",
        linkTo: ROUTES.CHIP_ELIGIBILITY_LANDING,
      },
      {
        title: "All Other CHIP SPA Submissions",
        description: "Create a new Medicaid State Plan Amendment",
        linkTo: ONEMAC_ROUTES.CHIP_SPA,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER]: {
    heading: "Waiver Action Type",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "Request Temporary Extension",
        description: "Submit for 1915(b) or 1915(c)",
        linkTo: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      },
      {
        title: "1915(b) Waiver Actions",
        description: "Submit 1915(b) Waivers, Amendments, and Renewals",
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
    heading: "1915(b) Waiver Action Type",
    intro: "Select a 1915(b) Waiver type for your submission.",
    choices: [
      {
        title: "1915(b)(4) FFS Selective Contracting Waivers",
        description:
          "Submit 1915(b)(4) FFS Selective Contracting Waivers, Amendments, and Renewals",
        linkTo: ONEMAC_ROUTES.TRIAGE_WAIVER_B_4,
      },
      {
        title: "1915(b) Comprehensive (Capitated) Waiver Authority",
        description:
          "Submit 1915(b) Comprehensive (Capitated) Waivers, Amendments, and Renewals",
        strongText:
          "Not applicable for 1915(b)(4) FFS Selective Contracting Waiver actions",
        linkTo: ONEMAC_ROUTES.TRIAGE_WAIVER_B_OTHER,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER_B_4]: {
    heading: "1915(b)(4) FFS Selective Contracting Waiver Authority",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "1915(b)(4) FFS Selective Contracting New Initial Waiver",
        description:
          "Create a new 1915(b)(4) FFS Selective Contracting Initial Waiver",
        linkTo: ONEMAC_ROUTES.INITIAL_WAIVER_B_4,
      },
      {
        title: "1915(b)(4) FFS Selective Contracting Renewal Waiver",
        description:
          "Renew an existing 1915(b)(4) FFS Selective Contracting Waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_RENEWAL_B_4,
      },
      {
        title: "1915(b)(4) FFS Selective Contracting Waiver Amendment",
        description:
          "Amend an existing 1915(b)(4) FFS Selective Contracting Waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_AMENDMENT_B_4,
      },
    ],
  },
  [ONEMAC_ROUTES.TRIAGE_WAIVER_B_OTHER]: {
    heading: "1915(b) Comprehensive (Capitated) Waiver Authority",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "1915(b) Comprehensive (Capitated) New Initial Waiver",
        description:
          "Create a new 1915(b) Comprehensive (Capitated) Initial Waiver",
        linkTo: ONEMAC_ROUTES.INITIAL_WAIVER_B_OTHER,
      },
      {
        title: "1915(b) Comprehensive (Capitated) Renewal Waiver",
        description:
          "Renew an existing 1915(b) Comprehensive (Capitated) Waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_RENEWAL_B_OTHER,
      },
      {
        title: "1915(b) Comprehensive (Capitated) Waiver Amendment",
        description:
          "Amend an existing 1915(b) Comprehensive (Capitated) Waiver",
        linkTo: ONEMAC_ROUTES.WAIVER_AMENDMENT_B_OTHER,
      },
    ],
  },
};
