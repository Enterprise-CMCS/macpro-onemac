// import dynamoDb from "../libs/dynamodb-lib";
import updateWithVersion from "./updateWithVersion";
import updateParent from "../utils/updateParent";

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
    lastModifiedName: updateData.submitterName,
    lastModifiedEmail: updateData.submitterEmail,
    lastModifiedTimestamp: updateData.submissionTimestamp,
  };

  const updateComponentParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: updateData.componentId,
      sk: `${updateData.componentType}${
        config.allowMultiplesWithSameId && `#${updateData.submissionTimestamp}`
      }`,
    },
    ConditionExpression: "attribute_exists(pk)", // so update fails if component does not exist
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
    },
  };

  topLevelUpdates.forEach((attributeName) => {
    if (changeData[attributeName]) {
      const newLabel = `:new${attributeName}`;
      updateComponentParams.ExpressionAttributeValues[newLabel] =
        changeData[attributeName];
      updateComponentParams.UpdateExpression += `, ${attributeName} = ${newLabel}`;
    }
  });

  try {
    const updateResults = await updateWithVersion(updateComponentParams);

    if (updateResults.parentId) await updateParent(updateResults);
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      console.log(
        `component is not (yet) a oneMAC component:  ${error.message}`
      );
    } else {
      console.log("Error is: ", JSON.stringify(error, null, 2));
      console.log(`Error happened updating DB:  ${error.message}`);
      console.log("update parameters tried: ", updateComponentParams);
      // throw error;
    }
  }
}
