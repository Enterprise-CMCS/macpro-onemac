import { buildMedicaidSpa } from "./package/buildMedicaidSpa";
import { buildChipSpa } from "./package/buildChipSpa";

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
        } else {
          console.log("This is a: ", event.dynamodb.NewImage.componentType.S);
        }
      } else {
        console.log(`skipping ${event.eventName} of: `, event.dynamodb);
      }
    })
  );
};
