import dynamoDb from "../libs/dynamodb-lib";

export default async function updateParent(childData) {
  const childSummaryData = {
    componentId: childData.componentId,
    displayId: childData.componentId,
    territory: childData.territory,
    componentType: childData.componentType,
    currentStatus: childData.currentStatus,
    clockEndTimestamp: childData.clockEndTimestamp,
    submissionTimestamp: childData.submissionTimestamp,
    submitterName: childData.submitterName,
    submitterEmail: childData.submitterEmail,
  };

  const updateSk = `v0#${childData.parentType}`;

  const updateParentParams = {
    TableName: process.env.oneMacTableName,
    ReturnValues: "UPDATED_NEW",
    Key: {
      pk: childData.parentId,
      sk: updateSk,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval, ",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
      ":emptyList": [],
      ":pkVal": childData.parentId,
      ":skVal": updateSk,
    },
  };

  updateParentParams.ExpressionAttributeNames = {
    "#childTypeName": childData.componentType,
    "#childList": "children",
  };
  updateParentParams.ExpressionAttributeValues[":childcomponent"] = [
    childSummaryData,
  ];
  updateParentParams.UpdateExpression +=
    ", #childTypeName = list_append(if_not_exists(#childTypeName,:emptyList), :childcomponent), #childList = list_append(if_not_exists(#childList,:emptyList), :childcomponent)";

  try {
    console.log("updateParentParams: ", updateParentParams);
    const result = await dynamoDb.update(updateParentParams);
    console.log("Result is: ", result);
    try {
      const latestVersion = result["Attributes"]["Latest"];
      const putsk = updateSk.replace("v0#", "v" + latestVersion + "#");
      const putParams = {
        TableName: process.env.oneMacTableName,
        Item: {
          pk: childData.parentId,
          sk: putsk,
          ...result.Attributes,
        },
      };
      await dynamoDb.put(putParams);

      // remove GSI
      const gsiParams = {
        TableName: process.env.oneMacTableName,
        Key: {
          pk: childData.parentId,
          sk: putsk,
        },
      };
      gsiParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk";

      await dynamoDb.update(gsiParams);
    } catch (error) {
      console.log(`Error:  ${error.message}`);
    }

    return result.Attributes;
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      console.log(
        `component is not (yet) a oneMAC component:  ${error.message}`
      );
    } else {
      console.log(`Error happened updating DB:  ${error.message}`);
      console.log("update parameters tried: ", updateParentParams);
      // throw error;
    }
  }
}
