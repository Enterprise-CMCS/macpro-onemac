import { waiverAppendixK } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverAppendixKBuildConfig = {
  ...waiverAppendixK,
  eventTypeMap: {
    submitwaiverappk: initialSubmissionType,
    submitwaiverappkrai: formalRAIResponseType,
    submitwaiverappkwithdraw: packageType,
    withdrawrai: formalRAIResponseType,
  },
  eventActionMap: {
    submitwaiverappk: submitAction,
    submitwaiverappkrai: submitAction,
    submitwaiverappkwithdraw: withdrawalRequestedAction,
    withdrawrai: withdrawalRequestedAction,
  },
};

export const buildWaiverAppendixK = async (packageId) =>
  buildAnyPackage(packageId, waiverAppendixKBuildConfig);
