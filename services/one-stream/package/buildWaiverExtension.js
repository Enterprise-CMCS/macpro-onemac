import { waiverTemporaryExtension } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildWaiverExtension = async (packageId) =>
  buildAnyPackage(packageId, waiverTemporaryExtension);
