/**
 * Routing Control Shared List
 *
 */

import { ONEMAC_TYPE } from "./workflow.js";

export const ROUTES = {
  CHIP_SPA: "/chipspa",
  CHIP_SPA_RAI: "/chipsparai",
  DASHBOARD: "/dashboard",
  DETAIL: "/detail",
  USER_MANAGEMENT: "/usermanagement",
  FAQ: "/FAQ",
  FAQ_TOP: "/FAQ/#top",
  FAQ_SPA_ID: "/FAQ#spa-id-format",
  FAQ_WAIVER_ID: "/FAQ#waiver-id-format",
  FAQ_BASE_1915B_WAIVER_ID: "/FAQ#base-waiver-id-format",
  FAQ_WAIVER_APP_K_ID: "/FAQ#waiver-c-id",
  HOME: "/",
  PROFILE: "/profile",
  METRICS: "/metrics",
  NEW_SUBMISSION_SELECTION: "/new",
  DEVLOGIN: "/devlogin",
  SIGNUP: "/signup",
  STATE_SIGNUP: "/signup/state",
  REVIEWER_SIGNUP: "/signup/cmsreviewer",
  NEW_SPA: "/newspa",
  SPA: "/spa",
  SPA_RAI: "/sparai",
  NEW_WAIVER: "/newwaiver",
  WAIVER: "/waiver",
  WAIVER_RAI: "/waiverrai",
  WAIVER_EXTENSION: "/waiverextension",
  WAIVER_APP_K: "/waiverappk",
  ATTACHMENT_LANDING: "/legacy-attachments",
};

export const ONEMAC_ROUTES = {
  PACKAGE_LIST: "/packagelist",
  PACKAGE_LIST_SPA: "/packagelist?startTab=spa",
  PACKAGE_LIST_WAIVER: "/packagelist?startTab=waiver",
  TRIAGE_GROUP: "/choices",
  TRIAGE_SPA: "/choices/spa",
  TRIAGE_WAIVER: "/choices/waiver",
  MEDICAID_SPA: "/medicaid-spa",
  MEDICAID_SPA_DETAIL: "/detail/medicaid-spa",
  MEDICAID_SPA_RAI: "/medicaid-spa-rai",
  CHIP_SPA: "/chip-spa",
  CHIP_SPA_DETAIL: "/detail/chip-spa",
  CHIP_SPA_RAI: "/chip-spa-rai",
  BASE_WAIVER: "/base-waiver",
  BASE_WAIVER_DETAIL: "/detail/base-waiver",
  WAIVER_RENEWAL: "/waiver-renewal",
  WAIVER_AMENDMENT: "/waiver-amendment",
  WAIVER_AMENDMENT_DETAIL: "/detail/waiver-amendment",
  APPENDIX_K_AMENDMENT: "/appendix-k-amendment",
  TEMPORARY_EXTENSION: "/temporary-extension",
  TEMPORARY_EXTENSION_DETAIL: "/detail/temporary-extension",
};

export const TYPE_TO_DETAIL_ROUTE = {
  [ONEMAC_TYPE.CHIP_SPA]: ONEMAC_ROUTES.CHIP_SPA_DETAIL,
  [ONEMAC_TYPE.CHIP_SPA_RAI]: "",
  [ONEMAC_TYPE.MEDICAID_SPA]: ONEMAC_ROUTES.MEDICAID_SPA_DETAIL,
  [ONEMAC_TYPE.MEDICAID_SPA_RAI]: "",
  [ONEMAC_TYPE.WAIVER]: ONEMAC_ROUTES.BASE_WAIVER_DETAIL,
  [ONEMAC_TYPE.WAIVER_RAI]: "",
  [ONEMAC_TYPE.WAIVER_BASE]: ONEMAC_ROUTES.BASE_WAIVER_DETAIL,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: "",
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: ONEMAC_ROUTES.WAIVER_AMENDMENT_DETAIL,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL,
  [ONEMAC_TYPE.WAIVER_APP_K]: "",
};
