import { waiverAppendixK } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
  subsequentSubmissionType,
  defaultRnAWaiverEventMapping,
  defaultRnAWaiverInitialSubmissionMap,
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
  eventMap: {
    ...defaultRnAWaiverEventMapping,
    submit: {
      ...defaultRnAWaiverInitialSubmissionMap,
      packageAttributes: [
        ...defaultRnAWaiverInitialSubmissionMap.packageAttributes,
        "title",
      ],
    },
  },
};

export const buildWaiverAppendixK = async (packageId) =>
  buildAnyPackage(packageId, waiverAppendixKBuildConfig);
