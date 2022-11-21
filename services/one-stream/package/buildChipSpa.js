import { chipSPA } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildChipSpa = async (packageId) =>
  buildAnyPackage(packageId, chipSPA);
