import { initialWaiver } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildInitialWaiver = async (packageId) =>
  buildAnyPackage(packageId, initialWaiver);
