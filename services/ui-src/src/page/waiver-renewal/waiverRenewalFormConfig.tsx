import { defaultAttachmentInstructionsJSX } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES } from "cmscommonlib";

export const waiverRenewalIdFormat: string =
  "SS-####.R##.00 or SS-#####.R##.00";

export const waiverRenewalFormConfig = {
  pageTitle: "Renew a 1915(b) Waiver",
  detailsHeader: "1915(b) Waiver Renewal",
  idFAQLink: ROUTES.FAQ_1915B_WAIVER_RENEWAL_ID,
  idFormat: waiverRenewalIdFormat,
  idFieldHint: [
    {
      text:
        "The Waiver Number must be in the format of " +
        waiverRenewalIdFormat +
        ". For renewals, the “R##” starts with ‘R01’ and ascends.",
    },
  ],
  idAdditionalErrorMessage: [
    "For renewals, the “R##” starts with ‘01’ and ascends.",
  ],
  proposedEffectiveDate: true,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentLabel: "Existing Waiver Number to Renew",
  parentFieldHint: [
    {
      text: "Enter the existing waiver number in the format it was approved, using a dash after the two character state abbreviation.",
    },
  ],
  parentNotFoundMessage:
    "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation.",
  validateParentAPI: "validateParentOfWaiverRenewal",
};

export default waiverRenewalFormConfig;
