import { waiverAmendment } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverAmendmentBuildConfig = {
  ...waiverAmendment,
  eventTypeMap: {
    submitwaiveramendment: initialSubmissionType,
    submitwaiverrai: formalRAIResponseType,
    submitwaiveramendmentwithdraw: packageType,
    withdrawrai: formalRAIResponseType,
  },
  eventActionMap: {
    submitwaiveramendment: submitAction,
    submitwaiverrai: submitAction,
    submitwaiveramendmentwithdraw: withdrawalRequestedAction,
    withdrawrai: withdrawalRequestedAction,
  },
};

export const buildWaiverAmendment = async (packageId) =>
  buildAnyPackage(packageId, waiverAmendmentBuildConfig);
