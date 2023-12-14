import { medicaidSPA } from "cmscommonlib";
import { defaultEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const medicaidSPABuildConfig = {
  ...medicaidSPA,
  eventMap: defaultEventMapping,
};

export const buildMedicaidSpa = async (packageId) =>
  buildAnyPackage(packageId, medicaidSPABuildConfig);
