/**
 * Routing Control Shared List
 *
 */

import { ONEMAC_TYPE } from "./workflow.js";

export const ROUTES = {
  CHIP_SPA: "/chipspa",
  CHIP_SPA_RAI: "/chipsparai",
  DASHBOARD: "/submissions",
  DETAIL: "/detail",
  USER_MANAGEMENT: "/usermanagement",
  FAQ: "/FAQ",
  FAQ_TOP: "/FAQ/#top",
  FAQ_SPA_ID: "/FAQ#spa-id-format",
  FAQ_INITIAL_1915B_WAIVER_ID: "/FAQ#initial-waiver-id-format",
  FAQ_1915B_WAIVER_RENEWAL_ID: "/FAQ#waiver-renewal-id-format",
  FAQ_1915B_WAIVER_AMENDMENT_ID: "/FAQ#waiver-amendment-id-format",
  FAQ_WAIVER_APP_K_ID: "/FAQ#waiver-c-id",
  FAQ_WAIVER_EXTENSION_ID: "/FAQ#waiver-extension-id-format",
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
  PACKAGE_LIST: "/dashboard",
  PACKAGE_LIST_SPA: "/dashboard?startTab=spa",
  PACKAGE_LIST_WAIVER: "/dashboard?startTab=waiver",
  TRIAGE_GROUP: "/choices",
  TRIAGE_SPA: "/choices/spa",
  TRIAGE_WAIVER: "/choices/waiver",
  MEDICAID_SPA: "/medicaid-spa",
  MEDICAID_SPA_DETAIL: "/detail/medicaid-spa",
  MEDICAID_SPA_RAI: "/medicaid-spa-rai",
  MEDICAID_SPA_WITHDRAW: "/medicaid-spa-withdraw",
  CHIP_SPA: "/chip-spa",
  CHIP_SPA_DETAIL: "/detail/chip-spa",
  CHIP_SPA_RAI: "/chip-spa-rai",
  CHIP_SPA_WITHDRAW: "/chip-spa-withdraw",
  INITIAL_WAIVER: "/initial-waiver",
  INITIAL_WAIVER_DETAIL: "/detail/initial-waiver",
  INITIAL_WAIVER_WITHDRAW: "/initial-waiver-withdraw",
  WAIVER_RENEWAL: "/waiver-renewal",
  WAIVER_RENEWAL_DETAIL: "/detail/waiver-renewal",
  WAIVER_RENEWAL_WITHDRAW: "/waiver-renewal-withdraw",
  WAIVER_AMENDMENT: "/waiver-amendment",
  WAIVER_AMENDMENT_DETAIL: "/detail/waiver-amendment",
  WAIVER_AMENDMENT_WITHDRAW: "/waiver-amendment-withdraw",
  WAIVER_APP_K: "/waiver-app-k",
  WAIVER_APP_K_DETAIL: "/detail/waiver-app-k",
  WAIVER_APP_K_RAI: "/waiver-app-k-rai",
  WAIVER_APP_K_WITHDRAW: "/waiver-app-k-withdraw",
  WAIVER_RAI: "/waiver-rai",
  APPENDIX_K_AMENDMENT: "/appendix-k-amendment",
  APPENDIX_K_AMENDMENT_WITHDRAW: "/appendix-k-amendment-withdraw",
  TEMPORARY_EXTENSION: "/temporary-extension",
  TEMPORARY_EXTENSION_DETAIL: "/detail/temporary-extension",
  FORMS_DESCRIBE: "/forms-describe",
  EVENT: "/event",
};

export const TYPE_TO_DETAIL_ROUTE = {
  [ONEMAC_TYPE.CHIP_SPA]: ONEMAC_ROUTES.CHIP_SPA_DETAIL,
  [ONEMAC_TYPE.CHIP_SPA_RAI]: "",
  [ONEMAC_TYPE.MEDICAID_SPA]: ONEMAC_ROUTES.MEDICAID_SPA_DETAIL,
  [ONEMAC_TYPE.MEDICAID_SPA_RAI]: "",
  [ONEMAC_TYPE.WAIVER]: ONEMAC_ROUTES.INITIAL_WAIVER_DETAIL,
  [ONEMAC_TYPE.WAIVER_RAI]: "",
  [ONEMAC_TYPE.WAIVER_INITIAL]: ONEMAC_ROUTES.INITIAL_WAIVER_DETAIL,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: ONEMAC_ROUTES.WAIVER_RENEWAL_DETAIL,
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: ONEMAC_ROUTES.WAIVER_AMENDMENT_DETAIL,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL,
  [ONEMAC_TYPE.WAIVER_APP_K]: ONEMAC_ROUTES.WAIVER_APP_K_DETAIL,
};
