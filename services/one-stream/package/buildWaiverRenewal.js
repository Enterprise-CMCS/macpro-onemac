import { waiverRenewal } from "cmscommonlib";
import { defaultRnAWaiverEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverRenewalBuildConfig = {
  ...waiverRenewal,
  eventMap: defaultRnAWaiverEventMapping,
};

export const buildWaiverRenewal = async (packageId) =>
  buildAnyPackage(packageId, waiverRenewalBuildConfig);
