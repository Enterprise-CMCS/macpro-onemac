import dynamoDb from "../libs/dynamodb-lib";

export default async function updateComponent({
  packageId: updatePk,
  ...updateData
}) {
  const changeData = {
    componentType: updateData.componentType,
    submitterName: updateData.submitterName,
    componentTimestamp: updateData.submissionTimestamp,
    componentId: updateData.componentId,
  };

  const updateComponentParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: updatePk,
      sk: updateData.parentType,
    },
    ConditionExpression: "pk = :pkVal AND sk = :skVal",
    UpdateExpression:
      "SET changeHistory = list_append(:newChange, if_not_exists(changeHistory, :emptyList))",
    ExpressionAttributeValues: {
      ":pkVal": updatePk,
      ":skVal": updateData.parentType,
      ":newChange": [changeData],
      ":emptyList": [],
    },
    ReturnValues: "ALL_NEW",
  };

  // only update clock if new Clock is sent
  if (updateData.clockEndTimestamp) {
    updateComponentParams.ExpressionAttributeValues[":newClockEnd"] =
      updateData.clockEndTimestamp;
    updateComponentParams.UpdateExpression +=
      ", currentClockEnd = :newClockEnd";
  }

  // only update status if new Status is sent
  if (updateData.currentStatus) {
    updateComponentParams.ExpressionAttributeValues[":newStatus"] =
      updateData.currentStatus;
    updateComponentParams.UpdateExpression += ",currentStatus = :newStatus";
  }

  // up the number in the component count for this component
  if (updateData.componentType) {
    updateComponentParams.ExpressionAttributeNames = {
      "#componentTypeName": updateData.componentType,
    };
    updateComponentParams.ExpressionAttributeValues[":thiscomponent"] = [
      changeData,
    ];
    updateComponentParams.UpdateExpression +=
      ", #componentTypeName = list_append(if_not_exists(#componentTypeName,:emptyList), :thiscomponent)";
  }

  // add the attachments to the list of attachments for the package
  if (updateData.attachments) {
    updateComponentParams.ExpressionAttributeValues[":newAttachments"] =
      updateData.attachments;
    updateComponentParams.UpdateExpression +=
      ", attachments = list_append(if_not_exists(attachments,:emptyList), :newAttachments)";
  }

  try {
    const { Attributes } = await dynamoDb.update(updateComponentParams);
    return Attributes;
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      console.log(
        `component is not (yet) a oneMAC component:  ${error.message}`
      );
    } else {
      console.log(`Error happened updating DB:  ${error.message}`);
      console.log("update parameters tried: ", updateComponentParams);
      // throw error;
    }
  }
}
