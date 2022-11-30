import { Workflow } from "cmscommonlib";

import { buildMedicaidSpa } from "./package/buildMedicaidSpa";
import { buildChipSpa } from "./package/buildChipSpa";
import { buildInitialWaiver } from "./package/buildInitialWaiver";
import { buildWaiverRenewal } from "./package/buildWaiverRenewal";
import { buildWaiverAmendment } from "./package/buildWaiverAmendment";
import { buildWaiverAppendixK } from "./package/buildWaiverAppendixK";
import { buildWaiverExtension } from "./package/buildWaiverExtension";

const BUILD_PACKAGE_CALL = {
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: buildChipSpa,
  [Workflow.ONEMAC_TYPE.CHIP_SPA_RAI]: buildChipSpa,
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]: buildMedicaidSpa,
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA_RAI]: buildMedicaidSpa,
  [Workflow.ONEMAC_TYPE.WAIVER_INITIAL]: buildInitialWaiver,
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: buildWaiverRenewal,
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K]: buildWaiverAppendixK,
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K_RAI]: buildWaiverAppendixK,
  [Workflow.ONEMAC_TYPE.WAIVER_EXTENSION]: buildWaiverExtension,
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]: buildWaiverAmendment,
};
export const main = async (eventBatch) => {
  console.log("One Stream event: ", eventBatch);

  await Promise.all(
    eventBatch.Records.map(async (event) => {
      console.log(
        `Processing eventName: %s and dynamodb object: `,
        event.eventName,
        event.dynamodb
      );
      if (event.eventName === "REMOVE") return;
      if (event.eventName === "INSERT" || event.eventName === "MODIFY") {
        const newEventData = event.dynamodb.NewImage;
        const inPK = newEventData.pk.S;
        const inSK = newEventData.sk.S;
        const packageToBuild = {
          type: newEventData.componentType.S,
          id: inPK,
        };

        console.log("pk: %s sk: %s", inPK, inSK);

        const [eventSource] = inSK.split("#");
        switch (eventSource) {
          case "Package":
            packageToBuild.type = newEventData?.parentType?.S;
            packageToBuild.id = newEventData?.parentId?.S;
            break;
          case "OneMAC":
            // for all but Waiver RAIs, the type maps to the build
            if (packageToBuild.type === Workflow.ONEMAC_TYPE.WAIVER_RAI)
              packageToBuild.type = newEventData?.parentType?.S;
            // switch (packageType) {
            //   case ONEMAC_TYPE.MEDICAID_SPA:
            //   case ONEMAC_TYPE.MEDICAID_SPA_RAI:
            //     await buildMedicaidSpa(inPK);
            //     break;
            //   case ONEMAC_TYPE.CHIP_SPA:
            //   case ONEMAC_TYPE.CHIP_SPA_RAI:
            //     await buildChipSpa(inPK);
            //     break;
            //   case ONEMAC_TYPE.WAIVER_INITIAL:
            //     await buildInitialWaiver(inPK);
            //     break;
            //   case ONEMAC_TYPE.WAIVER_AMENDMENT:
            //     await buildWaiverAmendment(inPK);
            //     break;
            //   case ONEMAC_TYPE.WAIVER_RENEWAL:
            //     await buildWaiverRenewal(inPK);
            //     break;
            //   case ONEMAC_TYPE.WAIVER_EXTENSION:
            //     await buildWaiverExtension(inPK);
            //     break;
            //   case ONEMAC_TYPE.WAIVER_APP_K:
            //   case ONEMAC_TYPE.WAIVER_APP_K_RAI:
            //     await buildWaiverAppendixK(inPK);
            //     break;
            //   default:
            //     console.log("type not handled");
            //     break;
            // }
            break;
          case "SEATool":
            break;
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
        if (typeof BUILD_PACKAGE_CALL[packageToBuild.type] === "function")
          await BUILD_PACKAGE_CALL[packageToBuild.type](packageToBuild.id);
        else console.log(`%s has no build package function??`, inPK);
      } else {
        console.log(`skipping %s of: `, event.eventName, event.dynamodb);
      }
    })
  );
};
