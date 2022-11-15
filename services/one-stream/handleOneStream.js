export const main = async (eventBatch) => {
  console.log("One Stream event: ", eventBatch);
  eventBatch.Records.map((event) => {
    console.log(
      `eventName is ${event.eventName} and the dynamodb object: `,
      event.dynamodb
    );
  });
};
