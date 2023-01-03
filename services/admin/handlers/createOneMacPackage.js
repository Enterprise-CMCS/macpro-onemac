import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

const validateCreateOneMacPackageEvent = (item) => {
  if (
    !item.componentId ||
    !item.componentType ||
    !item.submissionTimestamp ||
    isNaN(item.submissionTimestamp)
  )
    return false;
  return true;
};

export const createOneMacPackage = async (item) => {
  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      pk: item.componentId,
      sk: `OneMAC#${item.submissionTimestamp}`,
      GSI1pk: `OneMAC#create${item.componentType}`,
      GSI1sk: item.componentId,
      eventTimestamp: item.submissionTimestamp,
      componentId: item.componentId,
      componentType: item.componentType,
      submissionTimestamp: item.submissionTimestamp,
      attachments: [],
      currentStatus: "Submitted",
      proposedEffectiveDate: "none",
      additionalInformation: item.additionalInformation,
      originallyFrom: `createOneMacPackage Lambda`,
      convertTimestamp: Date.now(),
    },
  };

  try {
    await dynamoDb.put(putParams).promise();
  } catch (e) {
    console.log("%s error received: ", item.componentId, e);
  }
};

export const main = async (event) => {
  if (validateCreateOneMacPackageEvent(event)) {
    createOneMacPackage(event);
    return "Created: " + JSON.stringify(event);
  } else return "Event failed validation: " + JSON.stringify(event);
};
