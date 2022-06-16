import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const typeConversion = {
  spa: "medicaidspa",
  sparai: "medicaidsparai",
};

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  // only have to do SPAs at least
  const oneparams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `OneMAC#spa`,
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
  };

  const onePromiseItems = [];
  // SPA group
  do {
    const results = await dynamoDb.query(oneparams);
    for (const item of results.Items) {
      if (!typeConversion[item.componentType]) continue;

      onePromiseItems.push({
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        ReturnValues: "ALL_NEW",
        UpdateExpression: "REMOVE GSI1pk, GSI1sk",
      });
    }
    oneparams.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (oneparams.ExclusiveStartKey);

  console.log("onePromiseItems: ", onePromiseItems);

  await Promise.all(
    onePromiseItems.map(async (anUpdate) => {
      console.log("update is: ", anUpdate);
      const result = await dynamoDb.update(anUpdate);
      console.log("result is: ", result);
      const newSk = result["Attributes"]["sk"].replace(
        result["Attributes"]["componentType"],
        typeConversion[result["Attributes"]["componentType"]]
      );

      const putParams = {
        TableName: process.env.oneMacTableName,
        Item: {
          ...result.Attributes,
          //        pk: result["Attributes"]["pk"],
          sk: newSk,
          componentType: typeConversion[result["Attributes"]["componentType"]],
          GSI1pk: "OneMAC#spa",
          GSI1sk: result["Attributes"]["pk"],
        },
      };
      console.log("now the put params: ", putParams);
      await dynamoDb.put(putParams);
    })
  );

  return "Done";
});
