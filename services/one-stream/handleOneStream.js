import { Workflow } from "cmscommonlib";

import { buildMedicaidSpa } from "./package/buildMedicaidSpa";
import { buildChipSpa } from "./package/buildChipSpa";
import { buildInitialWaiver } from "./package/buildInitialWaiver";
import { buildWaiverRenewal } from "./package/buildWaiverRenewal";
import { buildWaiverAmendment } from "./package/buildWaiverAmendment";
import { buildWaiverAppendixK } from "./package/buildWaiverAppendixK";
import { buildWaiverExtension } from "./package/buildWaiverExtension";
import { buildWaiverExtension1915b } from "./package/buildWaiverExtension1915b";
import { buildWaiverExtension1915c } from "./package/buildWaiverExtension1915c";

const buildParentPackageTypes = [
  Workflow.ONEMAC_TYPE.WAIVER_RAI,
  Workflow.ONEMAC_TYPE.ENABLE_RAI_WITHDRAW,
  Workflow.ONEMAC_TYPE.DISABLE_RAI_WITHDRAW,
  Workflow.ONEMAC_TYPE.RAI_RESPONSE_WITHDRAW,
  Workflow.ONEMAC_TYPE.WAIVER_INITIAL_SUBSEQUENT_SUBMISSION,
  Workflow.ONEMAC_TYPE.WAIVER_RENEWAL_SUBSEQUENT_SUBMISSION,
  Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT_SUBSEQUENT_SUBMISSION,
  Workflow.ONEMAC_TYPE.WAIVER_APP_K_SUBSEQUENT_SUBMISSION,
  Workflow.ONEMAC_TYPE.MEDICAID_SPA_SUBSEQUENT_SUBMISSION,
  Workflow.ONEMAC_TYPE.CHIP_SPA_SUBSEQUENT_SUBMISSION,
];
export const main = async (eventBatch) => {
  console.log("One Stream event: ", eventBatch);

  await Promise.all(
    eventBatch.Records.map(async (event) => {
      let newEventData;
      if (event.eventName === "REMOVE") newEventData = event.dynamodb.OldImage;
      if (event.eventName === "INSERT" || event.eventName === "MODIFY")
        newEventData = event.dynamodb.NewImage;

      const inPK = newEventData.pk.S;
      const inSK = newEventData.sk.S;
      const packageToBuild = {
        type: "",
        id: inPK,
      };

      const [eventSource, , offset] = inSK.split("#");
      if (offset) {
        console.log("%s ignoring %s event: ", inPK, inSK, newEventData);
        return;
      }

      switch (eventSource) {
        case "Package":
          packageToBuild.type = newEventData?.parentType?.S;
          packageToBuild.id = newEventData?.parentId?.S;
          break;
        case "OneMAC":
          if (buildParentPackageTypes.includes(newEventData.componentType.S))
            packageToBuild.type = newEventData?.parentType?.S;
          else packageToBuild.type = newEventData.componentType.S;
          break;
        case "SEATool": {
          const [, topic] = newEventData.GSI1pk.S.split("#");
          let actionType;
          if (!newEventData.ACTIONTYPES.NULL)
            actionType = newEventData.ACTIONTYPES.L.map((oneType) =>
              newEventData.STATE_PLAN.M.ACTION_TYPE.N === oneType.M.ACTION_ID.N
                ? oneType.M.ACTION_NAME.S
                : null
            ).filter(Boolean)[0];

          switch (topic) {
            case "Medicaid_SPA":
              packageToBuild.type = Workflow.ONEMAC_TYPE.MEDICAID_SPA;
              break;
            case "CHIP_SPA":
              packageToBuild.type = Workflow.ONEMAC_TYPE.CHIP_SPA;
              break;
            case "1915b_waivers":
              if (actionType === "Renew")
                packageToBuild.type = Workflow.ONEMAC_TYPE.WAIVER_RENEWAL;
              else if (actionType === "Amend")
                packageToBuild.type = Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT;
              else if (actionType === "New")
                packageToBuild.type = Workflow.ONEMAC_TYPE.WAIVER_INITIAL;
              break;
            case "1915c_waivers":
              if (actionType === "Amend")
                packageToBuild.type = Workflow.ONEMAC_TYPE.WAIVER_APP_K;
              else if (actionType === "Renew")
                packageToBuild.type = Workflow.ONEMAC_TYPE.WAIVER_RENEWAL;
              else if (actionType === "New")
                packageToBuild.type = Workflow.ONEMAC_TYPE.WAIVER_INITIAL;
              break;
            default:
              break;
          }
          break;
        }
        default:
          console.log("source %s unknown", eventSource);
          packageToBuild.id = null;
          break;
      }
      if (!packageToBuild.type || !packageToBuild.id) {
        console.log(
          "%s did not map? source: %s packageToBuild: %s",
          inPK,
          eventSource,
          JSON.stringify(packageToBuild, null, 2)
        );
        return;
      }
      switch (packageToBuild.type) {
        case Workflow.ONEMAC_TYPE.CHIP_SPA:
        case Workflow.ONEMAC_TYPE.CHIP_SPA_RAI:
        case Workflow.ONEMAC_TYPE.CHIP_SPA_WITHDRAW:
          await buildChipSpa(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.MEDICAID_SPA:
        case Workflow.ONEMAC_TYPE.MEDICAID_SPA_RAI:
        case Workflow.ONEMAC_TYPE.MEDICAID_SPA_WITHDRAW:
          await buildMedicaidSpa(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_INITIAL:
        case Workflow.ONEMAC_TYPE.WAIVER_INITIAL_WITHDRAW:
          await buildInitialWaiver(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_RENEWAL:
        case Workflow.ONEMAC_TYPE.WAIVER_RENEWAL_WITHDRAW:
          await buildWaiverRenewal(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_APP_K:
        case Workflow.ONEMAC_TYPE.WAIVER_APP_K_RAI:
        case Workflow.ONEMAC_TYPE.WAIVER_APP_K_WITHDRAW:
          await buildWaiverAppendixK(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION:
          await buildWaiverExtension(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION_B:
          await buildWaiverExtension1915b(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION_C:
          await buildWaiverExtension1915c(packageToBuild.id);
          break;
        case Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT:
        case Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT_WITHDRAW:
          await buildWaiverAmendment(packageToBuild.id);
          break;
        default:
          console.log(
            `%s with type <%s> has no build package function??`,
            inPK,
            packageToBuild.type
          );
          break;
      }
    })
  );
};
