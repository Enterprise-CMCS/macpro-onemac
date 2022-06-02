import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
//import updateComponent from "./utils/updateComponent";

const statusConversion = {
  "Package In Review": "In Review",
  "Package Approved": "Approved",
  "Package Disapproved": "Disapproved",
  "Waiver Terminated": "Terminated",
};

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  // scan one table index as only indexed items need migration
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `OneMAC#spa`,
    },
    ExclusiveStartKey: null,
    ScanIndexForward: false,
    ProjectionExpression: "componentId, componentType, currentStatus",
  };

  // SPA group
  do {
    const results = await dynamoDb.query(params);

    for (const item of results.Items) {
      const newStatus = statusConversion[item.currentStatus];
      console.log("item is: ", item);
      console.log("newStatus is: ", newStatus);
      // skip if don't need to change status
      if (item.currentStatus === newStatus) continue;
      console.log("would update!");

      // const updateData = {
      //   submitterName: "Migrate Script",
      //   submitterEmail: "k.grue@theta-llc.com",
      //   submissionTimestamp: Date.now(),
      //   componentId: item.componentId,
      //   componentType: item.componentType,
      // };

      // const updateConfig = {
      //   newStatus,
      //   successResponseCode: "Migrated",

      // };
      // // otherwise, update the component with the new status
      // const updatedItem = await updateComponent(updateData, updateConfig);
    }
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  params.ExpressionAttributeValues = {
    ":gsi1pk": `OneMAC#waiver`,
  };

  // // Waiver group
  // do {
  //   const results = await dynamoDb.query(params);

  //   for (const item of results.Items) {
  //     //console.log("item is: ", item);
  //     //console.log("item slice is: ", item.sk.slice(0, 2));
  //     // if a one table entry in the index is NOT versioned, remove any GSI details
  //     if (item.sk.slice(0, 2) === "v0") continue;

  //     promiseItems.push({
  //       TableName: process.env.oneMacTableName,
  //       Key: {
  //         pk: item.pk,
  //         sk: item.sk,
  //       },
  //       UpdateExpression: "REMOVE GSI1pk, GSI1sk",
  //       ReturnValues: "ALL_OLD",
  //     });

  //     // if there are children, have to migrate those as well
  //     if (item.children) {
  //       console.log("Children are: ", item.children);
  //       for (const child of item.children) {
  //         let childSk = child.componentType;
  //         // start by removing the GSI and returning the item
  //         if (child.componentType.search(/rai/i) > -1) {
  //           childSk += `#${child.submissionTimestamp}`;
  //         }
  //         promiseItems.push({
  //           TableName: process.env.oneMacTableName,
  //           Key: {
  //             pk: child.componentId,
  //             sk: childSk,
  //           },
  //           ConditionExpression: "attribute_exists(pk)",
  //           UpdateExpression: "REMOVE GSI1pk, GSI1sk",
  //           ReturnValues: "ALL_OLD",
  //         });
  //       }
  //     }
  //   }

  //   params.ExclusiveStartKey = results.LastEvaluatedKey;
  // } while (params.ExclusiveStartKey);

  // await Promise.all(
  //   promiseItems.map(async (updateParams) => {
  //     try {
  //       console.log(`Update Params are ${JSON.stringify(updateParams)}`);

  //       const result = await dynamoDb.update(updateParams);
  //       console.log("The updated record: ", result);
  //       if (result) await createVersionedComponent(result.Attributes);
  //     } catch (e) {
  //       console.log("update error: ", e.message);
  //     }
  //   })
  // );

  return "Done";
});
