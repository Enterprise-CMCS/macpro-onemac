import { chipSPA } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const chipSPABuildConfig = {
  ...chipSPA,
  eventTypeMap: {
    submitchipspa: initialSubmissionType,
    submitchipsparai: formalRAIResponseType,
    withdrawchipspa: packageType,
    withdrawrai: formalRAIResponseType,
  },
  eventActionMap: {
    submitchipspa: submitAction,
    submitchipsparai: submitAction,
    withdrawchipspa: withdrawalRequestedAction,
    withdrawrai: withdrawalRequestedAction,
  },
};

export const buildChipSpa = async (packageId) =>
  buildAnyPackage(packageId, chipSPABuildConfig);
