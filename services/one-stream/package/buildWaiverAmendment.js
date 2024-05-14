import { waiverAmendment } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
  subsequentSubmissionType,
} from "../lib/default-lib";
import { defaultRnAWaiverEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverAmendmentBuildConfig = {
  ...waiverAmendment,
  eventTypeMap: {
    submitwaiveramendment: initialSubmissionType,
    submitwaiveramendmentsubsequent: subsequentSubmissionType,
    submitwaiverrai: formalRAIResponseType,
    submitwaiveramendmentwithdraw: packageType,
    submitrairesponsewithdraw: formalRAIResponseType,
  },
  eventActionMap: {
    submitwaiveramendment: submitAction,
    submitwaiverrai: submitAction,
    submitwaiveramendmentwithdraw: withdrawalRequestedAction,
    submitrairesponsewithdraw: withdrawalRequestedAction,
  },
  eventMap: defaultRnAWaiverEventMapping,
};

export const buildWaiverAmendment = async (packageId) =>
  buildAnyPackage(packageId, waiverAmendmentBuildConfig);
