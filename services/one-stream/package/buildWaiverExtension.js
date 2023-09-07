import { waiverTemporaryExtension } from "cmscommonlib";
import { initialSubmissionType, submitAction } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverTemporaryExtensionBuildConfig = {
  ...waiverTemporaryExtension,
  eventTypeMap: {
    submitwaiverextension: initialSubmissionType,
  },
  eventActionMap: {
    submitwaiverextension: submitAction,
  },
};
export const buildWaiverExtension = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtensionBuildConfig);
