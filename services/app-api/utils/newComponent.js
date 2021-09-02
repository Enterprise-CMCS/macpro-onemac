import dynamoDb from "../libs/dynamodb-lib";

export default async function newComponent(newData) {
  const data = {
    pk: newData.packageId,
    sk: newData.componentType,
    componentId: newData.componentId,
    componentType: newData.componentType,
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
