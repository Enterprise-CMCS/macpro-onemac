import { waiverTemporaryExtension1915b } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildWaiverExtension1915b = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtension1915b);
