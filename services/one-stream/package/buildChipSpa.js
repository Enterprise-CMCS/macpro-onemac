import { chipSPA } from "cmscommonlib";
import { defaultEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const chipSPABuildConfig = {
  ...chipSPA,
  eventMap: defaultEventMapping,
};

export const buildChipSpa = async (packageId) =>
  buildAnyPackage(packageId, chipSPABuildConfig);
