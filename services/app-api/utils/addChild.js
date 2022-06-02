import updateWithVersion from "./updateWithVersion";

export default async function addChild(childData) {
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

  const updateParentParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: childData.parentId,
      sk: childData.parentType,
    },
    ConditionExpression: "attribute_exists(pk)",
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
      ":emptyList": [],
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
    return updateWithVersion(updateParentParams);
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
