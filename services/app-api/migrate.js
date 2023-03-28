import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

/**
 * Perform data migrations
 */

export const main = handler(async () => {
  // Setup query params to get all package waivers
  const oneparams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "OneMAC#waiver",
    },
  };
  const onePromiseItems = [];

  do {
    const results = await dynamoDb.query(oneparams);
    for (const item of results.Items) {
      //get latest rai response date
      const latestRaiResponseTimestamp = item.raiResponses?.reduce(
        (latestRaiResponseTimestamp, currentRaiResponse) => {
          if (
            currentRaiResponse.submissionTimestamp > latestRaiResponseTimestamp
          ) {
            latestRaiResponseTimestamp = currentRaiResponse.submissionTimestamp;
          }
          return latestRaiResponseTimestamp;
        },
        0
      );

      const updateParam = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression:
          "SET latestRaiResponseTimestamp = :latestRaiResponseTimestamp, auditArray = list_append(:newMessage, if_not_exists(auditArray,:emptyList))",
        ExpressionAttributeValues: {
          ":latestRaiResponseTimestamp": latestRaiResponseTimestamp,
          ":emptyList": [],
          ":newMessage": [
            `UPDATED ${Date.now()}: added latestRaiResponseTimestamp ${latestRaiResponseTimestamp}}`,
          ],
        },
      };
      onePromiseItems.push(updateParam);
    }
    oneparams.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (oneparams.ExclusiveStartKey);

  await Promise.all(
    onePromiseItems.map(async (anUpdate) => {
      console.log("updating: ", anUpdate);
      await dynamoDb.update(anUpdate);
    })
  );

  return "Done";
});
