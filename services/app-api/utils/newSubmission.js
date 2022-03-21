import { ChangeRequest, Validate, Workflow } from "cmscommonlib";

import dynamoDb from "../libs/dynamodb-lib";
import updateComponent from "./updateComponent";

export default async function newSubmission(inData) {
  const idInfo = Validate.decodeId(inData.componentId, inData.componentType);

  let newSk = inData.componentType;
  switch (inData.componentType) {
    case ChangeRequest.TYPE.WAIVER_RAI:
    case ChangeRequest.TYPE.SPA_RAI:
    case ChangeRequest.TYPE.CHIP_SPA_RAI:
      newSk += `#${inData.submissionTimestamp}`;
  }

  const data = {
    pk: idInfo.componentId,
    sk: newSk,
    ...inData,
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
    Item: data,
  };

  return dynamoDb
    .put(params)
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
