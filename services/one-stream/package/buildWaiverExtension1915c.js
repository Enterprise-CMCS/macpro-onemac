import { waiverTemporaryExtension1915c } from "cmscommonlib";
import { defaultWaiverExtensionEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverTemporaryExtension1915cBuildConfig = {
  ...waiverTemporaryExtension1915c,
  eventMap: defaultWaiverExtensionEventMapping,
};

export const buildWaiverExtension1915c = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtension1915cBuildConfig);
