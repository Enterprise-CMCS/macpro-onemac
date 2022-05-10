import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const createVersionedComponent = async (oldData) => {
  const baseItem = {
    pk: oldData.pk,
    componentType: oldData.componentType,
    additionalInformation: oldData.additionalInformation,
    attachments: oldData.attachments,
    componentId: oldData.componentId,
    currentStatus: oldData.currentStatus,
    submissionTimestamp: oldData.submissionTimestamp,
    submissionId: oldData.submissionId,
    submitterId: oldData.submitterId,
    submitterName: oldData.submitterName,
    submitterEmail: oldData.submitterEmail.toLowerCase(),
    Latest: 1,
  };

  if (oldData.parentId) baseItem.parentId = oldData.parentId;
  if (oldData.parentType) baseItem.parentType = oldData.parentType;
  if (oldData.clockEndTimestamp)
    baseItem.clockEndTimestamp = oldData.clockEndTimestamp;
  if (oldData.expirationTimestamp)
    baseItem.expirationTimestamp = oldData.expirationTimestamp;
  if (oldData.children) baseItem.children = oldData.children;
  if (oldData.waiverAuthority)
    baseItem.waiverAuthority = oldData.waiverAuthority;

  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      ...baseItem,
      sk: `v0#${oldData.sk}`,
      GSI1pk: oldData.GSI1pk,
      GSI1sk: oldData.GSI1sk,
    },
  };
  console.log("Put params: ", putParams);
  await dynamoDb.put(putParams);

  // make the v1 item also
  putParams.Item = {
    ...baseItem,
    sk: `v1#${oldData.sk}`,
  };

  await dynamoDb.put(putParams);
};

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
    ProjectionExpression: "pk, sk, children",
  };

  const promiseItems = [];
  // SPA group
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      // console.log("item is: ", item);
      //console.log("item slice is: ", item.sk.slice(0, 2));
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

  // Waiver group
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      //console.log("item is: ", item);
      //console.log("item slice is: ", item.sk.slice(0, 2));
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

      // if there are children, have to migrate those as well
      if (item.children) {
        console.log("Children are: ", item.children);
        for (const child of item.children) {
          let childSk = child.componentType;
          // start by removing the GSI and returning the item
          if (child.componentType === "waiverrai") {
            childSk += `#${child.submissionTimestamp}`;
          }
          promiseItems.push({
            TableName: process.env.oneMacTableName,
            Key: {
              pk: child.componentId,
              sk: childSk,
            },
            ConditionExpression: "attribute_exists(pk)",
            UpdateExpression: "SET fromMigration = :dummy",
            ExpressionAttributeValues: {
              ":dummy": "yes",
            },
            ReturnValues: "ALL_OLD",
          });
        }
      }
    }

    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  await Promise.all(
    promiseItems.map(async (updateParams) => {
      try {
        console.log(`Update Params are ${JSON.stringify(updateParams)}`);

        const result = await dynamoDb.update(updateParams);
        console.log("The updated record: ", result);
        if (result) createVersionedComponent(result.Attributes);
      } catch (e) {
        console.log("update error: ", e.message);
      }
    })
  );

  return "Done";
});
