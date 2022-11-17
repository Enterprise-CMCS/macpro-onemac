export const main = async (eventBatch) => {
  console.log("One Stream event: ", eventBatch);
  eventBatch.Records.map((event) => {
    if (
      event.eventName === "INSERT" &&
      event.dynamodb.NewImage.sk.substring(0, 6) === "OneMAC"
    ) {
      console.log(
        `Processing eventName: ${event.eventName} and dynamodb object: `,
        event.dynamodb
      );

      // const oneParams = {};
      // updateWithVersion(oneParams);
    } else {
      console.log(`skipping ${event.eventName} of: `, event.dynamodb);
    }
  });
};
