import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const resetIds = [
  "MD-22-0018",
  "MD-22-0019",
  "MD-22-0020",
  "MD-22-0021",
  "MD-22-0022",
  "MD-22-0023",
  "MD.12896",
  "MD.12958",
  "MD.38430",
  "MD.33463.R00.00",
  "MD.39253.R00.00",
  "MD.33463.R00.TE00",
  "MD.33463.R00.TE01",
];

/**
 * Reset test Data
 */

export const main = handler(async (event) => {
  console.log("resetData was called with event: ", event);

  const promiseItems = [];
  resetIds.forEach(async (id) => {
    const qParams = {
      TableName: process.env.oneMacTableName,
      KeyConditionExpression: "pk = :inPk",
      ExpressionAttributeValues: {
        ":inPk": id,
      },
      ProjectionExpression: "pk,sk",
    };

    const results = await dynamoDb.query(qParams);

    for (const item of results.Items) {
      promiseItems.push({
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
      });
    }
  });

  await Promise.all(
    promiseItems.map(async (deleteParams) => {
      try {
        console.log(`Update Params are ${JSON.stringify(deleteParams)}`);

        const result = await dynamoDb.delete(deleteParams);
        console.log("The deleted record: ", result);
      } catch (e) {
        console.log("delete error: ", e.message);
      }
    })
  );

  return "Done";
});
