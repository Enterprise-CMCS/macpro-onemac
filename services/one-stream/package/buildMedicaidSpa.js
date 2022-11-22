import { medicaidSPA } from "cmscommonlib";
import { buildAnyPackage } from "./buildAnyPackage";

// medicaidSPA.attributeConversions = {
//     "SEATool": {
//         "SPW_STATUS": "currentStatus",
//     }
// }

export const buildMedicaidSpa = async (packageId) =>
  buildAnyPackage(packageId, medicaidSPA);
