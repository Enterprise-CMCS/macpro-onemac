import { waiverRenewal } from "cmscommonlib";
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

const waiverRenewalBuildConfig = {
  ...waiverRenewal,
  eventTypeMap: {
    submitwaiverrenewal: initialSubmissionType,
    submitwaiverrenewalsubsequent: subsequentSubmissionType,
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
  eventMap: defaultRnAWaiverEventMapping,
};

export const buildWaiverRenewal = async (packageId) =>
  buildAnyPackage(packageId, waiverRenewalBuildConfig);
