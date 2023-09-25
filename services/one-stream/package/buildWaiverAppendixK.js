import { waiverAppendixK } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
  subsequentSubmissionType,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverAppendixKBuildConfig = {
  ...waiverAppendixK,
  eventTypeMap: {
    submitwaiverappk: initialSubmissionType,
    submitwaiverappksubsequent: subsequentSubmissionType,
    submitwaiverappkrai: formalRAIResponseType,
    submitwaiverappkwithdraw: packageType,
    submitrairesponsewithdraw: formalRAIResponseType,
  },
  eventActionMap: {
    submitwaiverappk: submitAction,
    submitwaiverappkrai: submitAction,
    submitwaiverappkwithdraw: withdrawalRequestedAction,
    submitrairesponsewithdraw: withdrawalRequestedAction,
  },
};

export const buildWaiverAppendixK = async (packageId) =>
  buildAnyPackage(packageId, waiverAppendixKBuildConfig);
