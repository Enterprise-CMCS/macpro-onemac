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

  await Promise.all(
    resetIds.map(async (id) => {
      console.log("Checking for id: ", id);
      const qParams = {
        TableName: process.env.oneMacTableName,
        KeyConditionExpression: "pk = :inPk",
        ExpressionAttributeValues: {
          ":inPk": id,
        },
        ProjectionExpression: "pk,sk",
      };
      try {
        const results = await dynamoDb.query(qParams);
        console.log("Found these results in One Table: ", results);
        for (const item of results.Items) {
          promiseItems.push({
            TableName: process.env.oneMacTableName,
            Key: {
              pk: item.pk,
              sk: item.sk,
            },
          });
        }
      } catch (e) {
        console.log("query error: ", e.message);
      }

      // scan changeRequest table
      const scanparams = {
        TableName: process.env.tableName,
        // ProjectionExpression: "userId,id,transmittalNumber",
        ExclusiveStartKey: null,
      };
      try {
        do {
          const newresults = await dynamoDb.scan(scanparams);
          console.log("a page of scans");
          for (const item of newresults.Items) {
            if (item.transmittalNumber !== id) continue;
            console.log("Found an entry with id: ", id);
            promiseItems.push({
              TableName: process.env.tableName,
              Key: {
                userId: item.userId,
                id: item.id,
              },
            });
          }
          scanparams.ExclusiveStartKey = newresults.LastEvaluatedKey;
        } while (scanparams.ExclusiveStartKey);
      } catch (e) {
        console.log("scan error: ", e.message);
      }
    })
  );

  await Promise.all(
    promiseItems.map(async (deleteParams) => {
      try {
        console.log(`Delete Params are ${JSON.stringify(deleteParams)}`);

        const result = await dynamoDb.delete(deleteParams);
        console.log("The deleted record: ", result);
      } catch (e) {
        console.log("delete error: ", e.message);
      }
    })
  );

  return "Done";
});
