import { waiverAppendixK } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

export const buildWaiverAppendixK = async (packageId) =>
  buildAnyPackage(packageId, waiverAppendixK);
