import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

const convertDateToSeaToolTimestamp = (date) => {
  return new Date(date).getTime();
};

const validateCreateOneMacPackageEvent = (item) => {
  if (!item.componentId || !item.componentType || !item.submissionDate)
    return false;
  return true;
};

export const createOneMacPackage = async (item) => {
  const submissionTimestamp = convertDateToSeaToolTimestamp(
    item.submissionDate
  );
  const [month, day, year] = item.proposedEffectiveDate.split("/"); // 2023-01-03
  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      pk: item.componentId,
      sk: `OneMAC#${submissionTimestamp}`,
      GSI1pk: `OneMAC#create${item.componentType}`,
      GSI1sk: item.componentId,
      eventTimestamp: submissionTimestamp,
      componentId: item.componentId,
      componentType: item.componentType,
      territory: item.territory,
      waiverAuthority: item.waiverAuthority,
      submissionTimestamp,
      attachments: [],
      currentStatus: "Submitted",
      proposedEffectiveDate: year + "-" + month + "-" + day,
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
    try {
      await createOneMacPackage(event);
      return "Created: " + JSON.stringify(event);
    } catch (e) {
      console.log(
        "%s Create failed: ",
        event.componentId,
        JSON.stringify(event)
      );
    }
  } else return "Event failed validation: " + JSON.stringify(event);
};
