import { buildMedicaidSpa } from "./package/buildMedicaidSpa";
import { buildChipSpa } from "./package/buildChipSpa";
import { buildInitialWaiver } from "./package/buildInitialWaiver";
import { buildWaiverRenewal } from "./package/buildWaiverRenewal";
import { buildWaiverAmendment } from "./package/buildWaiverAmendment";
import { buildWaiverAppendixK } from "./package/buildWaiverAppendixK";

export const main = async (eventBatch) => {
  console.log("One Stream event: ", eventBatch);

  await Promise.all(
    eventBatch.Records.map(async (event) => {
      console.log(
        `Processing eventName: ${event.eventName} and dynamodb object: `,
        event.dynamodb
      );
      if (event.eventName === "REMOVE") return;
      const inSK = event.dynamodb.NewImage.sk.S;
      console.log("the string value for sk: ", inSK);
      if (
        event.eventName === "INSERT" &&
        event.dynamodb.NewImage.sk.S.substring(0, 6) === "OneMAC"
      ) {
        if (event.dynamodb.NewImage.componentType.S === "medicaidspa") {
          console.log("is a medicaidspa!");
          await buildMedicaidSpa(event.dynamodb.NewImage.pk.S);
        } else if (
          event.dynamodb.NewImage.componentType.S === "medicaidsparai"
        ) {
          console.log("is a medicaidspa rai!");
          await buildMedicaidSpa(event.dynamodb.NewImage.parentId.S);
        } else if (event.dynamodb.NewImage.componentType.S === "chipspa") {
          console.log("is a chipspa!");
          await buildChipSpa(event.dynamodb.NewImage.pk.S);
        } else if (event.dynamodb.NewImage.componentType.S === "chipsparai") {
          console.log("is a chipspa rai!");
          await buildChipSpa(event.dynamodb.NewImage.parentId.S);
        } else if (event.dynamodb.NewImage.componentType.S === "waivernew") {
          console.log("is a waivernew!");
          await buildInitialWaiver(event.dynamodb.NewImage.pk.S);
        } else if (event.dynamodb.NewImage.componentType.S === "waiverrai") {
          console.log("is a waiver rai!");
          if (event.dynamodb.NewImage.parentType.S === "waivernew")
            await buildInitialWaiver(event.dynamodb.NewImage.parentId.S);
          else if (event.dynamodb.NewImage.parentType.S === "waiverrenewal")
            await buildWaiverRenewal(event.dynamodb.NewImage.parentId.S);
          else if (event.dynamodb.NewImage.parentType.S === "waiverAmendment")
            await buildWaiverAmendment(event.dynamodb.NewImage.parentId.S);
        } else if (
          event.dynamodb.NewImage.componentType.S === "waiverrenewal"
        ) {
          console.log("is a waiverrenewal!");
          await buildWaiverRenewal(event.dynamodb.NewImage.pk.S);
        } else if (
          event.dynamodb.NewImage.componentType.S === "waiveramendment"
        ) {
          console.log("is a waiveramendment");
          await buildWaiverAmendment(event.dynamodb.NewImage.pk.S);
        } else if (event.dynamodb.NewImage.componentType.S === "waiverappk") {
          console.log("is a waiverappk");
          await buildWaiverAppendixK(event.dynamodb.NewImage.pk.S);
        } else if (
          event.dynamodb.NewImage.componentType.S === "waiverappkrai"
        ) {
          console.log("is a waiverappk rai");
          await buildWaiverAppendixK(event.dynamodb.NewImage.parentId.S);
        } else {
          console.log("This is a: ", event.dynamodb.NewImage.componentType.S);
        }
      } else {
        console.log(`skipping ${event.eventName} of: `, event.dynamodb);
      }
    })
  );
};
