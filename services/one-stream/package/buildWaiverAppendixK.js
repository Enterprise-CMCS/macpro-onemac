import { waiverAppendixK } from "cmscommonlib";
import {
  defaultRnAWaiverEventMapping,
  defaultRnAWaiverInitialSubmissionMap,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverAppendixKBuildConfig = {
  ...waiverAppendixK,
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
