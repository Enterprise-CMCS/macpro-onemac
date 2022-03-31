import { ROUTES } from "cmscommonlib";

export const choicesFromRoute = {
  [ROUTES.TRIAGE_GROUP]: {
    heading: "Submission Type",
    intro: "Select a Submission Type.",
    choices: [
      {
        title: "State Plan Amendment (SPA)",
        description:
          "Submit a new Medicaid & CHIP State Plan Amendments or RAI",
        linkTo: ROUTES.TRIAGE_SPA,
      },
      {
        title: "Waiver Action",
        description:
          "Submit Waivers, Amendments, Renewals, RAI, or Temp. Extension",
        linkTo: ROUTES.TRIAGE_WAIVER,
      },
    ],
  },
  [ROUTES.TRIAGE_SPA]: {
    heading: "SPA Type",
    intro:
      "There are currently no SPA form options for package dashboard. Use Submission Dashboard and the SPA packages will appear.",
    choices: [
      {
        title: "Sample Choice Title",
        description: "Some dummy text to show what it looks like",
        linkTo: ROUTES.TRIAGE_GROUP,
      },
    ],
  },
  [ROUTES.TRIAGE_WAIVER]: {
    heading: "Waiver Action Type",
    intro: "Select a Waiver type to start your submission.",
    choices: [
      {
        title: "Base Waiver",
        description: "Create a new Base Waiver",
        linkTo: ROUTES.BASE_WAIVER,
      },
      {
        title: "Request Temporary Extension",
        description: "Submit for 1915(b) and 1915(c)",
        linkTo: ROUTES.TEMPORARY_EXTENSION,
      },
    ],
  },
};
