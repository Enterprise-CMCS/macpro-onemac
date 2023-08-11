import { initialWaiver } from "cmscommonlib";
import {
  initialSubmissionType,
  formalRAIResponseType,
  packageType,
  submitAction,
  withdrawalRequestedAction,
} from "../lib/default-lib";
import { buildAnyPackage } from "./buildAnyPackage";

const initialWaiverBuildConfig = {
  ...initialWaiver,
  eventTypeMap: {
    submitwaivernew: initialSubmissionType,
    submitwaiverrai: formalRAIResponseType,
    submitwaivernewwithdraw: packageType,
    submitrairesponsewithdraw: formalRAIResponseType,
  },
  eventActionMap: {
    submitwaivernew: submitAction,
    submitwaiverrai: submitAction,
    submitwaivernewwithdraw: withdrawalRequestedAction,
    submitrairesponsewithdraw: withdrawalRequestedAction,
  },
};

export const buildInitialWaiver = async (packageId) =>
  buildAnyPackage(packageId, initialWaiverBuildConfig);
