import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

/**
 * Perform data migrations
 */

export const main = handler(async () => {
  // Scan it all... but really only need v0s
  const oneparams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :tepk",
    ExpressionAttributeValues: {
      ":tepk": "OneMAC#submitwaiverextension",
    },
  };
  const onePromiseItems = [];

  do {
    const results = await dynamoDb.query(oneparams);
    for (const item of results.Items) {
      const updateParam = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression:
          "SET currentStatus = :newTEStatus, auditArray = list_append(:newMessage, if_not_exists(auditArray,:emptyList))",
        ExpressionAttributeValues: {
          ":newTEStatus": `TE Requested`,
          ":emptyList": [],
          ":newMessage": [
            `UPDATED ${Date.now()}: currentStatus changed from "Submitted" to "TE Requested"`,
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
