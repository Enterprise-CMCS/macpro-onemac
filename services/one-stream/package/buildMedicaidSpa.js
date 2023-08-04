import { medicaidSPA } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const medicaidSPABuildConfig = {
  ...medicaidSPA,
  eventTypeMap: {
    submitmedicaidspa: initialSubmissionType,
    submitmedicaidsparai: formalRAIResponseType,
    withdrawmedicaidspa: packageType,
    withdrawrai: formalRAIResponseType,
  },
  eventActionMap: {
    submitchipspa: submitAction,
    submitchipsparai: submitAction,
    withdrawchipspa: withdrawalRequestedAction,
    withdrawrai: withdrawalRequestedAction,
  },
};

export const buildMedicaidSpa = async (packageId) =>
  buildAnyPackage(packageId, medicaidSPABuildConfig);
