import { ONEMAC_TYPE } from "cmscommonlib/workflow";

import { buildMedicaidSpa } from "./package/buildMedicaidSpa";
import { buildChipSpa } from "./package/buildChipSpa";
import { buildInitialWaiver } from "./package/buildInitialWaiver";
import { buildWaiverRenewal } from "./package/buildWaiverRenewal";
import { buildWaiverAmendment } from "./package/buildWaiverAmendment";
import { buildWaiverAppendixK } from "./package/buildWaiverAppendixK";
import { buildWaiverExtension } from "./package/buildWaiverExtension";

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
      const newEventData = event.dynamodb.NewImage;
      const inPK = newEventData.pk.S;
      const inSK = newEventData.sk.S;
      let packageType = newEventData.componentType.S;

      // stream doesn't trigger on package updates
      if (inSK === "Package") return;

      console.log("pk: %s sk: %s", inPK, inSK);
      if (event.eventName === "INSERT" || event.eventName === "MODIFY") {
        const [eventSource] = inSK.split("#");
        switch (eventSource) {
          case "OneMAC":
            console.log(
              "processing a %s %s ",
              eventSource,
              newEventData.componentType.S
            );
            // waiverrai components influence parentType
            if (packageType === ONEMAC_TYPE.WAIVER_RAI)
              packageType = newEventData?.parentType?.S;
            switch (packageType) {
              case ONEMAC_TYPE.MEDICAID_SPA:
              case ONEMAC_TYPE.MEDICAID_SPA_RAI:
                await buildMedicaidSpa(inPK);
                break;
              case ONEMAC_TYPE.CHIP_SPA:
              case ONEMAC_TYPE.CHIP_SPA_RAI:
                await buildChipSpa(inPK);
                break;
              case ONEMAC_TYPE.WAIVER_INITIAL:
                await buildInitialWaiver(inPK);
                break;
              case ONEMAC_TYPE.WAIVER_AMENDMENT:
                await buildWaiverAmendment(inPK);
                break;
              case ONEMAC_TYPE.WAIVER_RENEWAL:
                await buildWaiverRenewal(inPK);
                break;
              case ONEMAC_TYPE.WAIVER_EXTENSION:
                await buildWaiverExtension(inPK);
                break;
              case ONEMAC_TYPE.WAIVER_APP_K:
              case ONEMAC_TYPE.WAIVER_APP_K_RAI:
                await buildWaiverAppendixK(inPK);
                break;
              default:
                console.log("type not handled");
                break;
            }
            break;
          case "SEATool":
            break;
          default:
            console.log("source %s unknown", eventSource);
            break;
        }
      } else {
        console.log(`skipping %s of: `, event.eventName, event.dynamodb);
      }
    })
  );
};
