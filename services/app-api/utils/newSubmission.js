import { Validate, Workflow } from "cmscommonlib";

import dynamoDb from "../libs/dynamodb-lib";
import updateComponent from "./updateComponent";

export default async function newSubmission(inData) {
  const idInfo = Validate.decodeId(inData.componentId, inData.componentType);
  let newGSI = {};

  let newSk = "v0#" + inData.componentType;
  switch (inData.componentType) {
    case Workflow.ONEMAC_TYPE.WAIVER_RAI:
    case Workflow.ONEMAC_TYPE.SPA_RAI:
    case Workflow.ONEMAC_TYPE.CHIP_SPA_RAI:
      newSk += `#${inData.submissionTimestamp}`;
      break;
    case Workflow.ONEMAC_TYPE.WAIVER_EXTENSION:
    case Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT:
      newGSI = {
        GSI1pk: Validate.getParentPackage(inData.componentId)[0],
        GSI1sk: inData.componentType,
      };
      break;
  }

  const data = {
    pk: idInfo.componentId,
    sk: newSk,
    ...inData,
    ...newGSI,
    changeHistory: [inData],
  };

  if (inData.waiverAuthority) data.waiverAuthority = inData.waiverAuthority;

  // use the scarce index for anything marked as a package.
  if (idInfo.isNewPackage) {
    data.GSI1pk = `OneMAC#${Workflow.MY_PACKAGE_GROUP[data.sk]}`;
    data.GSI1sk = data.pk;
  } else {
    data.parentId = idInfo.packageId;
    data.parentType = idInfo.parentType;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    ReturnValues: "UPDATED_NEW",
    Key: {
      pk: idInfo.componentId,
      sk: newSk,
    },
    UpdateExpression:
      "SET Latest = if_not_exists(Latest, :defaultval) + :incrval, " +
      "#componentId = :componentId, #componentType = :componentType, #submissionTimestamp = :submissionTimestamp, " +
      "#currentStatus = :currentStatus, #attachments = :attachments, " +
      "#additionalInformation = :additionalInformation, #submissionId = :submissionId, #submitterName = :submitterName, " +
      "#submitterEmail = :submitterEmail, #submitterId = :submitterId",
    ExpressionAttributeNames: {
      "#componentId": "componentId",
      "#componentType": "componentType",
      "#submissionTimestamp": "submissionTimestamp",
      "#currentStatus": "currentStatus",
      "#attachments": "attachments",
      "#additionalInformation": "additionalInformation",
      "#submissionId": "submissionId",
      "#submitterName": "submitterName",
      "#submitterEmail": "submitterEmail",
      "#submitterId": "submitterId",
    },
    ExpressionAttributeValues: {
      ":defaultval": 0,
      ":incrval": 1,
      ":componentId": data.componentId,
      ":componentType": data.componentType,
      ":submissionTimestamp": data.submissionTimestamp,
      ":currentStatus": data.currentStatus,
      ":attachments": data.attachments,
      ":additionalInformation": data.additionalInformation,
      ":submissionId": data.submissionId,
      ":submitterName": data.submitterName,
      ":submitterEmail": data.submitterEmail,
      ":submitterId": data.submitterId,
    },
  };

  if (data.GSI1pk) {
    params.UpdateExpression += ", #GSI1pk = :GSI1pk, #GSI1sk = :GSI1sk";
    params.ExpressionAttributeNames["#GSI1pk"] = "GSI1pk";
    params.ExpressionAttributeNames["#GSI1sk"] = "GSI1sk";
    params.ExpressionAttributeValues[":GSI1pk"] = data.GSI1pk;
    params.ExpressionAttributeValues[":GSI1sk"] = data.GSI1sk;
  }
  if (data.parentId) {
    params.UpdateExpression +=
      ", #parentId = :parentId, #parentType = :parentType";
    params.ExpressionAttributeNames["#parentId"] = "parentId";
    params.ExpressionAttributeNames["#parentType"] = "parentType";
    params.ExpressionAttributeValues[":parentId"] = data.parentId;
    params.ExpressionAttributeValues[":parentType"] = data.parentType;
  }
  if (data.actionType) {
    params.UpdateExpression += ", #actionType = :actionType";
    params.ExpressionAttributeNames["#actionType"] = "actionType";
    params.ExpressionAttributeValues[":actionType"] = data.actionType;
  }
  if (data.proposedEffectiveDate) {
    params.UpdateExpression +=
      ", #proposedEffectiveDate = :proposedEffectiveDate";
    params.ExpressionAttributeNames["#proposedEffectiveDate"] =
      "proposedEffectiveDate";
    params.ExpressionAttributeValues[":proposedEffectiveDate"] =
      data.proposedEffectiveDate;
  }
  if (data.waiverAuthority) {
    params.UpdateExpression += ", #waiverAuthority = :waiverAuthority";
    params.ExpressionAttributeNames["#waiverAuthority"] = "waiverAuthority";
    params.ExpressionAttributeValues[":waiverAuthority"] = data.waiverAuthority;
  }

  console.log("params in newSubmission are: ", JSON.stringify(params, null, 2));
  return dynamoDb
    .update(params)
    .then((response) => {
      const latestVersion = response["Attributes"]["Latest"];
      const putsk = newSk.replace("v0", "v" + latestVersion);
      const putParams = {
        TableName: process.env.oneMacTableName,
        Item: {
          pk: data.pk,
          sk: putsk,
          ...data,
        },
      };
      dynamoDb.put(putParams);
    })
    .then(() => {
      if (!idInfo.isNewPackage) {
        const parentToUpdate = {
          componentId: data.parentId,
          componentType: data.parentType,
          attachments: data.attachments,
          newChild: data,
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
