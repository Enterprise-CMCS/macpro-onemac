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
    submitmedicaidspawithdraw: packageType,
    withdrawrai: formalRAIResponseType,
  },
  eventActionMap: {
    submitmedicaidspa: submitAction,
    submitmedicaidsparai: submitAction,
    submitmedicaidspawithdraw: withdrawalRequestedAction,
    withdrawrai: withdrawalRequestedAction,
  },
};

export const buildMedicaidSpa = async (packageId) =>
  buildAnyPackage(packageId, medicaidSPABuildConfig);
