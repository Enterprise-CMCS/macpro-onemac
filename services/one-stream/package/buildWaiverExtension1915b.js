import { waiverTemporaryExtension1915b } from "cmscommonlib";
import { initialSubmissionType, submitAction } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverTemporaryExtension1915bBuildConfig = {
  ...waiverTemporaryExtension1915b,
  eventTypeMap: {
    submitwaiverextensionb: initialSubmissionType,
  },
  eventActionMap: {
    submitwaiverextensionb: submitAction,
  },
};

export const buildWaiverExtension1915b = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtension1915bBuildConfig);
