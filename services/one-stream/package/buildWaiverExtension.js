import { waiverTemporaryExtension } from "cmscommonlib";
import {
  defaultRnAWaiverEventMapping,
  defaultRnAWaiverInitialSubmissionMap,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverTemporaryExtensionBuildConfig = {
  ...waiverTemporaryExtension,
  eventMap: {
    ...defaultRnAWaiverEventMapping,
    submit: {
      ...defaultRnAWaiverInitialSubmissionMap,
      packageAttributes: [
        ...defaultRnAWaiverInitialSubmissionMap.packageAttributes,
        "temporaryExtensionType",
      ],
    },
  },
};
export const buildWaiverExtension = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtensionBuildConfig);
