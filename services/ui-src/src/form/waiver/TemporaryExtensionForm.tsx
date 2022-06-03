import React, { FC } from "react";
import OneMACForm from "../OneMACForm";
import { OneMACFormInfo } from "../../libs/formLib";
import { Workflow, ROUTES } from "cmscommonlib";

const temporaryExtensionFormInfo: OneMACFormInfo = {
  type: Workflow.ONEMAC_TYPE.WAIVER_EXTENSION,
  actionType: "",
  pageTitle: "Request a Temporary Extension",
  detailsHeader: "Temporary Extension Request",
  requiredUploads: [{ title: "Waiver Extension Request" }],
  optionalUploads: [{ title: "Other" }],
  transmittalNumber: {
    idType: "waiver",
    idFAQLink: ROUTES.FAQ_WAIVER_ID,
    idLabel: "Temporary Extension Request Number",
    idFieldHint: [
      {
        text: "Must be a waiver extension request number with the format SS.####.R##.TE## or SS.#####.R##.TE##",
      },
    ],
    idFormat: "SS.####.R##.TE## or SS.#####.R##.TE##",
    idRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R[0-9]{2}.TE[0-9]{2}$",
    idExistValidations: [
      {
        idMustExist: false,
        errorLevel: "error",
      },
    ],
  },
  actionsByStatus: Workflow.defaultActionsByStatus,
  raiLink: ROUTES.WAIVER_RAI,
  landingPage: ROUTES.PACKAGE_LIST_WAIVER,
};

const TemporaryExtensionForm: FC = () => {
  return <OneMACForm formInfo={temporaryExtensionFormInfo} />;
};

export default TemporaryExtensionForm;
