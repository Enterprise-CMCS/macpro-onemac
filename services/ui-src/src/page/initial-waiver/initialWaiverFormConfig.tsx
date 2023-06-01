import { ROUTES, ONEMAC_ROUTES } from "cmscommonlib";
import { defaultAttachmentInstructionsJSX } from "../../libs/formLib";

const initialWaiverIdFormat: string = "SS-####.R00.00 or SS-#####.R00.00";

export const initialWaiverFormConfig = {
  pageTitle: "1915(b) Initial Waiver Submission",
  detailsHeader: "Initial Waiver",
  idFAQLink: ROUTES.FAQ_INITIAL_1915B_WAIVER_ID,
  idFormat: initialWaiverIdFormat,
  idFieldHint: [
    {
      text:
        "Must be a new initial number with the format " + initialWaiverIdFormat,
    },
  ],
  userProvidedIdSection: 0,
  postPendId: ".R00.00",
  proposedEffectiveDate: true,
  attachmentIntroJSX: defaultAttachmentInstructionsJSX(
    ROUTES.FAQ_ATTACHMENTS_WAIVER_B
  ),
  landingPage: ONEMAC_ROUTES.PACKAGE_LIST_WAIVER,
};
