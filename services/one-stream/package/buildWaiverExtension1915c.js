import { waiverTemporaryExtension1915c } from "cmscommonlib";
import { initialSubmissionType, submitAction } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverTemporaryExtension1915cBuildConfig = {
  ...waiverTemporaryExtension1915c,
  eventTypeMap: {
    submitwaiverextensionc: initialSubmissionType,
  },
  eventActionMap: {
    submitwaiverextensionc: submitAction,
  },
};

export const buildWaiverExtension1915c = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtension1915cBuildConfig);
