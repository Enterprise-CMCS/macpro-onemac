import dynamoDb from "../libs/dynamodb-lib";

const topLevelUpdates = [
  "clockEndTimestamp",
  "expirationTimestamp",
  "currentStatus",
  "lastModifiedName",
  "lastModifiedEmail",
  "lastModifiedTimestamp",
];

export default async function updateComponent(updateData, config) {
  const changeData = {
    pk: updateData.componentId,
    sk: `v0#${updateData.componentType}`,
    lastModifiedName: updateData.submitterName,
    lastModifiedEmail: updateData.submitterEmail,
    lastModifiedTimestamp: updateData.submissionTimestamp,
  };

  if (config.allowMultiplesWithSameId)
    changeData.sk += `#${changeData.submissionTimestamp}`;

  const updateComponentParams = {
    TableName: process.env.oneMacTableName,
    ReturnValues: "UPDATED_NEW",
    Key: {
      pk: changeData.pk,
      sk: changeData.sk,
    },
    ConditionExpression: "pk = :pkVal", // so update fails if component does not exist
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
      ":pkVal": changeData.pk,
    },
  };

  topLevelUpdates.forEach((attributeName) => {
    if (updateData[attributeName]) {
      const newLabel = `:new${attributeName}`;
      updateComponentParams.ExpressionAttributeValues[newLabel] =
        updateData[attributeName];
      if (Array.isArray(updateData[attributeName])) {
        updateComponentParams.UpdateExpression += `, ${attributeName} = list_append(if_not_exists(${attributeName},:emptyList), ${newLabel})`;
        updateComponentParams.ExpressionAttributeValues[":emptyList"] = [];
      } else
        updateComponentParams.UpdateExpression += `, ${attributeName} = ${newLabel}`;
    }
  });

  try {
    console.log("updateParams: ", updateComponentParams);
    const result = await dynamoDb.update(updateComponentParams);
    console.log("Result is: ", result);
    const latestVersion = result["Attributes"]["Latest"];
    const putsk = changeData.sk.replace("v0#", "v" + latestVersion + "#");
    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: changeData.pk,
        sk: putsk,
        ...result.Attributes,
      },
    };
    await dynamoDb.put(putParams);

    // remove GSI
    const gsiParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: changeData.pk,
        sk: putsk,
      },
    };
    gsiParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk";

    await dynamoDb.update(gsiParams);

    return result.Attributes;
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
