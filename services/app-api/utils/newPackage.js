import dynamoDb from "../libs/dynamodb-lib";

export default async function newPackage(newData) {
  const data = {
    pk: newData.packageId,
    sk: newData.packageType,
    packageId: newData.packageId,
    packageType: newData.packageType,
    currentStatus: newData.packageStatus,
    submissionTimestamp: newData.submissionTimestamp,
    submissionId: newData.submissionId,
    submitterId: newData.submitterId,
    submitterName: newData.submitterName,
    submitterEmail: newData.submitterEmail,
    currentClockEnd: newData.clockEndTimestamp,
    attachments: newData.attachments,
    changeHistory: [newData],
  };

  if (data.packageType === "spa" || data.packageType === "chipspa") {
    data.GSI1pk = "OneMAC";
    data.GSI1sk = newData.packageId;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("params is: ", params);
  try {
    await dynamoDb.put(params);
  } catch (error) {
    console.log("newPackage put error is: ", error);
    throw error;
  }

  return "Success - newPackage";
}
