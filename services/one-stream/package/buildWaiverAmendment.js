import { waiverAmendment } from "cmscommonlib";
import { defaultRnAWaiverEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const waiverAmendmentBuildConfig = {
  ...waiverAmendment,
  eventMap: defaultRnAWaiverEventMapping,
};

export const buildWaiverAmendment = async (packageId) =>
  buildAnyPackage(packageId, waiverAmendmentBuildConfig);
