import { waiverTemporaryExtension1915b } from "cmscommonlib";
import { defaultWaiverExtensionEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverTemporaryExtension1915bBuildConfig = {
  ...waiverTemporaryExtension1915b,
  eventMap: defaultWaiverExtensionEventMapping,
};

export const buildWaiverExtension1915b = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtension1915bBuildConfig);
