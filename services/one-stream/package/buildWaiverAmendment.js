import { waiverAmendment } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildWaiverAmendment = async (packageId) =>
  buildAnyPackage(packageId, waiverAmendment);
