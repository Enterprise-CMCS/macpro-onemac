import { waiverRenewal } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildWaiverRenewal = async (packageId) =>
  buildAnyPackage(packageId, waiverRenewal);
