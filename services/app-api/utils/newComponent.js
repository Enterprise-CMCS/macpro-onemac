import dynamoDb from "../libs/dynamodb-lib";
import { decodeId } from "./decodeId";

export default async function newComponent(newData) {
  const idInfo = decodeId(newData.packageId);
  /* {
    packageId: newData.packageId,
    componentId: newData.packageId,
    componentType: newData.componentType,
  }; */

  const data = {
    pk: idInfo.componentId,
    sk: idInfo.componentType,
    packageId: idInfo.packageId,
    componentId: idInfo.componentId,
    componentType: idInfo.componentType,
    currentStatus: newData.status,
    submissionTimestamp: newData.submissionTimestamp,
    submissionId: newData.submissionId,
    submitterId: newData.submitterId,
    submitterName: newData.submitterName,
    submitterEmail: newData.submitterEmail,
    attachments: newData.attachments,
    additionalInformation: newData.additionalInformation,
  };

  const params = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("params is: ", params);
  try {
    await dynamoDb.put(params);
  } catch (error) {
    console.log("newCompnent put error is: ", error);
    throw error;
  }

  return "Success - newComponent";
}
