import { ONEMAC_TYPE } from "cmscommonlib/workflow";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const fixThese = [ONEMAC_TYPE.WAIVER_AMENDMENT, ONEMAC_TYPE.WAIVER_EXTENSION];
/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  // Scan it all... but really only need v0s
  const oneparams = {
    TableName: process.env.oneMacTableName,
    FilterExpression: "begins_with(sk, :begin)",
    ExpressionAttributeValues: {
      ":begin": "v0",
    },
  };
  const onePromiseItems = [];
  // SPA group
  do {
    const results = await dynamoDb.scan(oneparams);
    for (const item of results.Items) {
      // if the item does not need correcting, skip it
      if (!fixThese.includes(item.componentType)) continue;

      const updateParam = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression:
          "SET GSI1pk = :gsi1pk, GSI1sk = :gsi1sk, GSI2pk = :gsi2pk, GSI2sk = :gsi2sk",
        ExpressionAttributeValues: {
          ":gsi1pk": `OneMAC#waiver`,
          ":gsi1sk": item.pk,
          ":gsi2pk": item.parentId,
          ":gsi2sk": item.componentType,
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
