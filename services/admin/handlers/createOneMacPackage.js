import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

const TYPE_MAP = {
  "Medicaid SPA": "medicaidspa",
  "CHIP SPA": "chipspa",
  "1915(b) Amendment": "waiveramendment",
  "1915(b) Renewal": "waiverrenewal",
  "1915(b) Initial Waiver": "waivernew",
  "1915(c)": "waiverappk",
};

const convertDateToSeaToolTimestamp = (date) => {
  return new Date(date + " 7:00:00 AM").getTime();
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
  const theID = item.componentId.toUpperCase();
  if (!item.territory)
    item.territory = item.componentId.toString().substring(0, 2);
  const putParams = {
    TableName: process.env.oneMacTableName,
    Item: {
      pk: theID,
      sk: `OneMAC#${submissionTimestamp}`,
      GSI1pk: `OneMAC#create${TYPE_MAP[item.componentType]}`,
      GSI1sk: theID,
      eventTimestamp: submissionTimestamp,
      componentId: theID,
      componentType: TYPE_MAP[item.componentType],
      territory: item.territory,
      submissionTimestamp,
      attachments: [],
      currentStatus: "Submitted",
      originallyFrom: `createOneMacPackage Lambda`,
      convertTimestamp: Date.now(),
    },
  };

  if (item.waiverAuthority)
    putParams.Item.waiverAuthority = item.waiverAuthority;
  if (item.additionalInformation)
    putParams.Item.additionalInformation = item.additionalInformation;

  try {
    await dynamoDb.put(putParams).promise();
  } catch (e) {
    console.log("%s error received: ", theID, e);
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
        JSON.stringify(event),
        e
      );
    }
  } else return "Event failed validation: " + JSON.stringify(event);
};
