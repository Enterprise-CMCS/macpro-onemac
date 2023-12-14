import { initialWaiver } from "cmscommonlib";
import { defaultWaiverEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const initialWaiverBuildConfig = {
  ...initialWaiver,
  eventMap: defaultWaiverEventMapping,
};

export const buildInitialWaiver = async (packageId) =>
  buildAnyPackage(packageId, initialWaiverBuildConfig);
