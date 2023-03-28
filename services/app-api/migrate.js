import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

/**
 * Perform data migrations
 */

const migrateTE = async () => {
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

  console.log("migrateTE complete");
};

const migrateRaiTimestamp = async () => {
  // Setup query params to get all package waivers and spas
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk IN (:pk1, :pk2)",
    ExpressionAttributeValues: {
      ":pk1": "OneMAC#waiver",
      ":pk2": "OneMAC#spa",
    },
  };
  const promiseItems = [];

  do {
    const results = await dynamoDb.query(params);
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
        }
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
      promiseItems.push(updateParam);
    }
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  await Promise.all(
    promiseItems.map(async (anUpdate) => {
      console.log("updating: ", anUpdate);
      await dynamoDb.update(anUpdate);
    })
  );

  console.log("migrateRaiTimestamp complete");
};

export const main = handler(async () => {
  await migrateTE();
  await migrateRaiTimestamp();
  return "Done";
});
