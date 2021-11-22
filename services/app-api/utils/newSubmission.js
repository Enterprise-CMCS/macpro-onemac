import { decodeId } from "cmscommonlib/update-lib";

import dynamoDb from "../libs/dynamodb-lib";
import updateComponent from "./updateComponent";

export default async function newSubmission(inData) {
  console.log("inData: ", inData);
  const idInfo = decodeId(inData.componentId, inData.componentType);

  console.log("idInfo is: ", idInfo);
  const data = {
    pk: idInfo.componentId,
    sk: idInfo.componentType,
    packageId: idInfo.packageId,
    ...inData,
    changeHistory: [inData],
  };

  if (inData.waiverAuthority) data.waiverAuthority = inData.waiverAuthority;

  // use the scarce index for anything marked as a package.
  if (idInfo.isNewPackage) {
    data.GSI1pk = "OneMAC";
    data.GSI1sk = data.pk;
  } else {
    data.sk += `#${inData.submissionTimestamp}`;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("params is: ", params);
  return dynamoDb
    .put(params)
    .then(() => {
      if (!idInfo.isNewPackage) {
        data.currentStatus = `${data.componentType} Submitted`;
        data.parentType = idInfo.parentType;
        return updateComponent(data);
      } else {
        return "Compnent is a Package.";
      }
    })
    .catch((error) => {
      console.log("newSubmission put error is: ", error);
      throw error;
    });
}
