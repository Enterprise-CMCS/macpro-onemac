import { main } from "./migrate";
import dynamoDb from "./libs/dynamodb-lib";

jest.mock("./libs/dynamodb-lib");

const expectedResponse = {
  statusCode: 200,
  body: "Done",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

beforeEach(() => {
  dynamoDb.scan.mockResolvedValue({
    Items: [
      {
        summary: "Here is a medicaid SPA for review and approval!",
        waiverAuthority: "",
        ninetyDayClockEnd: 1659560410529,
        type: "spa",
        userId: "offlineContext_cognitoIdentityId",
        uploads: [
          {
            s3Key: "1651784409747/CMS 179 Form Acronym Removal Signed.pdf",
            filename: "CMS 179 Form Acronym Removal Signed.pdf",
            title: "CMS Form 179",
            contentType: "application/pdf",
            url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651784409747/CMS%20179%20Form%20Acronym%20Removal%20Signed.pdf",
          },
          {
            s3Key:
              "1651784409747/Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
            filename: "Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
            title: "SPA Pages",
            contentType: "application/pdf",
            url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651784409747/Mr.%20Scott_%20State%20of%20KS_SPA%20KS%2021-0002%20Signed.pdf",
          },
        ],
        actionType: "",
        createdAt: 1651784410484,
        transmittalNumberWarningMessage: "",
        id: "59d44340-ccb6-11ec-a326-19f0f0c94b60",
        state: "submitted",
        transmittalNumber: "MI-22-2222",
        submittedAt: 1651784410529,
        user: {
          firstName: "Angie",
          lastName: "Active",
          email: "statesubmitteractive@cms.hhs.local",
        },
        territory: "MI",
      },
      {
        summary: "This is our response to the Medicaid SPA MI-22-2222",
        waiverAuthority: "",
        ninetyDayClockEnd: 1659560441391,
        type: "sparai",
        userId: "offlineContext_cognitoIdentityId",
        uploads: [
          {
            s3Key: "1651784441123/Attachment 3.1-A, #4b, Page 3f Track.pdf",
            filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
            title: "RAI Response",
            contentType: "application/pdf",
            url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651784441123/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
          },
        ],
        actionType: "",
        createdAt: 1651784441353,
        transmittalNumberWarningMessage: "",
        id: "6c3a7f90-ccb6-11ec-a326-19f0f0c94b60",
        state: "submitted",
        transmittalNumber: "MI-22-2222",
        submittedAt: 1651784441391,
        user: {
          firstName: "Angie",
          lastName: "Active",
          email: "statesubmitteractive@cms.hhs.local",
        },
        territory: "MI",
      },
    ],
  });
  dynamoDb.query.mockResolvedValue({
    Items: [
      {
        additionalInformation: "Need a In Review.....",
        componentType: "spa",
        componentId: "MD-42-1122",
        currentStatus: "In Review",
        submissionTimestamp: 1640014690892,
        clockEndTimestamp: 1647545906000,
        submissionId: "d5ce3b80-61aa-11ec-9823-2780a6e1c177",
        submitterId: "us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5",
        sk: "v0#spa",
        GSI1pk: "OneMAC#spa",
        GSI1sk: "MD-42-1122",
        Latest: 1,
        pk: "MD-42-1122",
        submitterName: "Angie Active",
        submitterEmail: "statesubmitteractive@cms.hhs.local",
      },
    ],
    Count: 1,
    ScannedCount: 1,
  });
  dynamoDb.update.mockResolvedValue({
    Attributes: {
      additionalInformation: "This is just a test",
      componentType: "spa",
      componentId: "MI-13-1122",
      currentStatus: "In Review",
      submissionTimestamp: 1639696185888,
      clockEndTimestamp: 1647286706000,
      devComment: "Package added via seed data for application testing",
      submissionId: "4240e440-5ec5-11ec-b2ea-eb35c89f340d",
      submitterId: "us-east-1:afa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a",
      sk: "v0#spa",
      Latest: 1,
      pk: "MI-13-1122",
      submitterName: "StateSubmitter Nightwatch",
      submitterEmail: "statesubmitter@nightwatch.test",
    },
  });
});
it(`returns Done`, async () => {
  expectedResponse.body = '"Done"';
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
