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

  const normalizedNow = Date.now();

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
      convertTimestamp: normalizedNow,
      adminChanges: [
        {
          changeTimestamp: normalizedNow,
          changeMade: `${theID} added to OneMAC. Package not originally submitted in OneMAC.`,
          changeReason: item?.setChangeReason
            ? item.setChangeReason
            : "Per request from CMS, this package was added to OneMAC.",
          changeType: "Package Added",
        },
      ],
    },
  };

  if (item.copyAttachmentsFrom) {
    const getParams = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: item.copyAttachmentsFrom,
        sk: "Package",
      },
    };
    try {
      const result = await dynamoDb.get(getParams).promise();
      putParams.Item.attachments = [...result.Item.attachments];
      putParams.Item.adminChanges[0].changeMade +=
        " - with attachments copied from " + item.copyAttachmentsFrom;
    } catch (e) {
      console.log("%s error received: ", theID, e);
    }
  } else {
    putParams.Item.adminChanges[0].changeMade +=
      " At this time, the attachments for this package are unavailable in this system. Contact your CPOC to verify the initial submission documents.";
  }

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
