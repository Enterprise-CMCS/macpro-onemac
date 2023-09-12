import { waiverRenewal } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverRenewalBuildConfig = {
  ...waiverRenewal,
  eventTypeMap: {
    submitwaiverrenewal: initialSubmissionType,
    submitwaiverrai: formalRAIResponseType,
    submitwaiverrenewalwithdraw: packageType,
    submitrairesponsewithdraw: formalRAIResponseType,
  },
  eventActionMap: {
    submitwaiverrenewal: submitAction,
    submitwaiverrai: submitAction,
    submitwaiverrenewalwithdraw: withdrawalRequestedAction,
    submitrairesponsewithdraw: withdrawalRequestedAction,
  },
};

export const buildWaiverRenewal = async (packageId) =>
  buildAnyPackage(packageId, waiverRenewalBuildConfig);
