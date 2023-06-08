import { defaultAttachmentInstructionsJSX } from "../../libs/formLib";
import { ROUTES, ONEMAC_ROUTES } from "cmscommonlib";

const waiverAmendmentIdFormat: string = "SS-####.R##.## or SS-#####.R##.##";

export const waiverAmendmentFormConfig = {
  pageTitle: "Amend a 1915(b) Waiver",
  detailsHeader: "1915(b) Waiver Amendment Request",
  idFAQLink: ROUTES.FAQ_1915B_WAIVER_AMENDMENT_ID,
  idFormat: waiverAmendmentIdFormat,
  idFieldHint: [
    {
      text:
        "The Waiver Number must be in the format of " +
        waiverAmendmentIdFormat +
        ".",
    },
    {
      text: "For amendments, the last two digits start with ‘01’ and ascends.",
    },
  ],
  idAdditionalErrorMessage: [
    "For amendments, the last two digits start with ‘01’ and ascends.",
  ],
  proposedEffectiveDate: true,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
  parentLabel: "Existing Waiver Number to Amend",
  parentFieldHint: [
    {
      text: "Enter the existing waiver number you are seeking to amend in the format it was approved, using a dash after the two character state abbreviation.",
    },
  ],
  parentNotFoundMessage:
    "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation.",
  validateParentAPI: "validateParentOfWaiverAmendment",
};
