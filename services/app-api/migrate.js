import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  // scan one table index as only indexed items need migration in this case
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `OneMAC#spa`,
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "pk, sk",
  };

  const promiseItems = [];
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      console.log("item is: ", item);
      console.log("item slice is: ", item.sk.slice(0, 2));
      // skip if this is already versioned
      if (item.sk.slice(0, 2) === "v0") continue;

      // otherwise, create a versioned copy

      // start by removing the GSI and returning the item
      promiseItems.push({
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression: "REMOVE GSI1pk, GSI1sk",
        ReturnValues: "ALL_OLD",
      });
    }

    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  params.ExpressionAttributeValues = {
    ":gsi1pk": `OneMAC#waiver`,
  };

  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      console.log("item is: ", item);
      console.log("item slice is: ", item.sk.slice(0, 2));
      // if a one table entry in the index is NOT versioned, remove any GSI details
      if (item.sk.slice(0, 2) === "v0") continue;

      promiseItems.push({
        TableName: process.env.oneMacTableName,
        Key: {
          pk: item.pk,
          sk: item.sk,
        },
        UpdateExpression: "REMOVE GSI1pk, GSI1sk",
        ReturnValues: "ALL_OLD",
      });
    }

    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  await Promise.all(
    promiseItems.map(async (updateParams) => {
      try {
        console.log(`Update Params are ${JSON.stringify(updateParams)}`);

        const result = await dynamoDb.update(updateParams);
        // console.log("The updated record: ", result);

        const baseItem = {
          pk: result.Attributes.pk,
          componentType: result.Attributes.componentType,
          additionalInformation: result.Attributes.additionalInformation,
          attachments: result.Attributes.attachments,
          componentId: result.Attributes.componentId,
          currentStatus: result.Attributes.currentStatus,
          submissionTimestamp: result.Attributes.submissionTimestamp,
          submissionId: result.Attributes.submissionId,
          submitterId: result.Attributes.submitterId,
          submitterName: result.Attributes.submitterName,
          submitterEmail: result.Attributes.submitterEmail.toLowerCase(),
          Latest: 1,
        };

        if (result.Attributes.parentId)
          baseItem.parentId = result.Attributes.parentId;
        if (result.Attributes.parentType)
          baseItem.parentType = result.Attributes.parentType;
        if (result.Attributes.clockEndTimestamp)
          baseItem.clockEndTimestamp = result.Attributes.clockEndTimestamp;
        if (result.Attributes.expirationTimestamp)
          baseItem.expirationTimestamp = result.Attributes.expirationTimestamp;
        if (result.Attributes.children)
          baseItem.children = result.Attributes.children;

        const putParams = {
          TableName: process.env.oneMacTableName,
          Item: {
            ...baseItem,
            sk: `v0#${result.Attributes.sk}`,
            GSI1pk: result.Attributes.GSI1pk,
            GSI1sk: result.Attributes.GSI1sk,
          },
        };
        console.log("Put params: ", putParams);
        await dynamoDb.put(putParams);

        // make the v1 item also
        putParams.Item = {
          ...baseItem,
          sk: `v1#${result.Attributes.sk}`,
        };

        await dynamoDb.put(putParams);

        // if there are children, have to migrate those as well
        if (result.Attributes.children) {
          console.log("Children are: ", result.Attributes.children);
          // for (const child of results.Attributes.children) {

          // }
        }
      } catch (e) {
        console.log("update error: ", e.message);
      }
    })
  );

  return "Done";
});
