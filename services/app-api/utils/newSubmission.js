import { Validate, Workflow } from "cmscommonlib";

import dynamoDb from "../libs/dynamodb-lib";
import updateComponent from "./updateComponent";

const topLevelAttributes = [
  "componentId",
  "componentType",
  "submissionTimestamp",
  "proposedEffectiveDate",
  "currentStatus",
  "attachments",
  "additionalInformation",
  "submissionId",
  "submitterName",
  "submitterEmail",
  "submitterId",
  "waiverAuthority",
  "GSI1pk",
  "GSI1sk",
  "parentId",
  "parentType",
];

export default async function newSubmission(newData) {
  const pk = newData.componentId;
  const sk = `v0#${newData.componentType}#${newData.submissionTimestamp}`;

  if (
    Workflow.MY_PACKAGE_GROUP[newData.componentType] === newData.componentType
  ) {
    newData.GSI1pk = `OneMAC#${
      Workflow.MY_PACKAGE_GROUP[newData.componentType]
    }`;
    newData.GSI1sk = pk;
  } else {
    [newData.parentId, newData.parentType] = Validate.getParentPackage(
      newData.componentId
    );
    newData.GSI1pk = newData.parentId;
    newData.GSI1sk = newData.componentType;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    ReturnValues: "UPDATED_NEW",
    Key: {
      pk,
      sk,
    },
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval",
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
    },
  };

  topLevelAttributes.forEach((attributeName) => {
    if (newData[attributeName]) {
      const label = `:${attributeName}`;
      params.ExpressionAttributeValues[label] = newData[attributeName];
      if (Array.isArray(newData[attributeName]))
        params.UpdateExpression += `, ${attributeName} = list_append(if_not_exists(${attributeName},:emptyList), ${label})`;
      else params.UpdateExpression += `, ${attributeName} = ${label}`;
    }
  });

  console.log("params in newSubmission are: ", JSON.stringify(params, null, 2));
  return dynamoDb
    .update(params)
    .then((response) => {
      const latestVersion = response["Attributes"]["Latest"];
      const putsk = sk.replace("v0", "v" + latestVersion);
      const putParams = {
        TableName: process.env.oneMacTableName,
        Item: {
          sk: putsk,
          componentId: newData.componentId,
          componentType: newData.componentType,
          submissionTimestamp: newData.submissionTimestamp,
          proposedEffectiveDate: newData.proposedEffectiveDate,
          currentStatus: newData.currentStatus,
          attachments: newData.attachments,
          additionalInformation: newData.additionalInformation,
          submissionId: newData.submissionId,
          submitterName: newData.submitterName,
          submitterEmail: newData.submitterEmail,
          submitterId: newData.submitterId,
        },
      };
      dynamoDb.put(putParams);
    })
    .then(() => {
      if (newData.parentId) {
        const parentToUpdate = {
          componentId: newData.parentId,
          componentType: newData.parentType,
          attachments: newData.attachments,
          newChild: newData,
        };
        return updateComponent(parentToUpdate);
      } else {
        return "Compnent is a Package.";
      }
    })
    .catch((error) => {
      console.log("newSubmission put error is: ", error);
      throw error;
    });
}
