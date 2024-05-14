import { medicaidSPA } from "cmscommonlib";
import {
  initialSubmissionType,
  subsequentSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { defaultEventMapping } from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const medicaidSPABuildConfig = {
  ...medicaidSPA,
  eventTypeMap: {
    submitmedicaidspa: initialSubmissionType,
    submitmedicaidspasubsequent: subsequentSubmissionType,
    submitmedicaidsparai: formalRAIResponseType,
    submitmedicaidspawithdraw: packageType,
    submitrairesponsewithdraw: formalRAIResponseType,
  },
  eventActionMap: {
    submitmedicaidspa: submitAction,
    submitmedicaidsparai: submitAction,
    submitmedicaidspawithdraw: withdrawalRequestedAction,
    submitrairesponsewithdraw: withdrawalRequestedAction,
  },
  eventMap: defaultEventMapping,
};

export const buildMedicaidSpa = async (packageId) =>
  buildAnyPackage(packageId, medicaidSPABuildConfig);
