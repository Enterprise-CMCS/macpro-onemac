import { RESPONSE_CODE } from "cmscommonlib";
import { main } from "./disableRaiWithdraw";
import { validateSubmission } from "./validateSubmission";
import dynamoDb from "../libs/dynamodb-lib";
import { getUser } from "../getUser";

jest.mock("./validateSubmission");
jest.mock("../getUser");
jest.mock("../libs/dynamodb-lib");

const expectedResponse = {
  body: '"yup!"',
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

const testDoneBy = {
  roleList: [
    { role: "systemadmin", status: "active", territory: "N/A" },
    { role: "statesubmitter", status: "active", territory: "MD" },
  ],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const testUnauthUser = {
  roleList: [],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const eventBody = {
  componentId: "VA-11-0200",
  territory: "VA",
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
  proposedEffectiveDate: "2022-01-01",
  attachments: [
    {
      contentType: "image/png",
      filename: "myfile.png",
      s3Key: "path/in/s3",
      title: "Other",
      url: "https://www.notasite.gov",
    },
  ],
  waiverAuthority: "me",
  parentType: "medicaidspa",
  submissionTimestamp: 1673563667053,
  adminChanges: [
    {
      changeTimestamp: 1673563667053,
      changeMade: "This is the change made",
      changeReason: "This is the change reason",
    },
  ],
};

const GSIQueryReturn = {
  Items: [
    {
      pk: "MD-22-2200-KG",
      sk: "OneMAC#1673709577000",
      additionalInformation: "Here is the official RAI Response",
      attachments: [
        {
          contentType: "image/png",
          filename: "Screenshot 2023-03-31 at 4.46.08 PM.png",
          s3Key: "1689347857918/Screenshot 2023-03-31 at 4.46.08 PM.png",
          title: "RAI Response",
          url: "https://uploads-oy2-22413-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Abecb694d-f091-42c5-a7b5-d9a974b1c9f6/1689347857918/Screenshot%202023-03-31%20at%204.46.08%20PM.png",
        },
      ],
      clockEndTimestamp: 1697123859496,
      componentId: "MD-22-2200-KG",
      componentType: "medicaidsparai",
      currentStatus: "RAI Response Withdraw Enabled",
      eventTimestamp: 1673709577000,
      GSI1pk: "OneMAC#submitmedicaidsparai",
      GSI1sk: "MD-22-2200-KG",
      parentId: "MD-22-2200-KG",
      parentType: "medicaidspa",
      submissionTimestamp: 1673709577000,
      submitterEmail: "statesubmitter@nightwatch.test",
      submitterName: "StateSubmitter Nightwatch",
      territory: "MD",
      transmittalNumberWarningMessage: "",
    },
  ],
};

const packageUpdated = {
  Items: [
    {
      pk: "MD-22-2200-KG",
      sk: "Package",
      additionalInformation: "faking the event to enable the status",
      adminChanges: [],
      approvedEffectiveDate: "-- --",
      attachments: [
        {
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          filename: "excel.xlsx",
          s3Key: "1672290671436/excel.xlsx",
          title: "CMS Form 179",
          url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1672290671436/excel.xlsx",
        },
        {
          contentType: "text/plain",
          filename: "textnotes.txt",
          s3Key: "1672290671438/textnotes.txt",
          title: "SPA Pages",
          url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1672290671438/textnotes.txt",
        },
      ],
      clockEndTimestamp: 1680063073531,
      componentId: "MD-22-2200-KG",
      componentType: "medicaidspa",
      cpocName: "Chester Tester",
      currentStatus: "Formal RAI Response - Withdrawal Requested",
      description: "package to test RAI withdrawing",
      GSI1pk: "OneMAC#spa",
      GSI1sk: "MD-22-2200-KG",
      lastEventTimestamp: 1690210488371,
      proposedEffectiveDate: "-- --",
      raiResponses: [
        {
          additionalInformation: "standard widget",
          attachments: [
            {
              contentType: "image/png",
              filename: "Screenshot 2023-03-31 at 4.46.08 PM.png",
              s3Key: "1690210487909/Screenshot 2023-03-31 at 4.46.08 PM.png",
              title: "Supporting Documentation",
              url: "https://uploads-oy2-24562-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A952f55fb-36e1-425e-97e9-a1f1d0317daf/1690210487909/Screenshot%202023-03-31%20at%204.46.08%20PM.png",
            },
          ],
          currentStatus: "Formal RAI Response - Withdrawal Requested",
          eventTimestamp: 1690210488371,
          submissionTimestamp: 1690210488371,
        },
        {
          additionalInformation: "Here is the official RAI Response",
          attachments: [
            {
              contentType: "image/png",
              filename: "Screenshot 2023-03-31 at 4.46.08 PM.png",
              s3Key: "1689347857918/Screenshot 2023-03-31 at 4.46.08 PM.png",
              title: "RAI Response",
              url: "https://uploads-oy2-22413-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Abecb694d-f091-42c5-a7b5-d9a974b1c9f6/1689347857918/Screenshot%202023-03-31%20at%204.46.08%20PM.png",
            },
          ],
          currentStatus: "Submitted",
          eventTimestamp: 1673709577000,
          submissionTimestamp: 1673709577000,
        },
      ],
      reviewTeam: [
        "Lester Tester",
        "Super Tester",
        "Jimmy Tester",
        "Lester2 Tester",
        "Super2 Tester",
        "Jimmy2 Tester",
      ],
      subject: "OneMac Connection test",
      submissionTimestamp: 1675091977000,
      submitterEmail: "statesubmitter@nightwatch.test",
      submitterName: "Statesubmitter Nightwatch",
      waiverExtensions: [],
      withdrawalRequests: [],
    },
  ],
};

const invalidEventBody = {
  transmittalNumber: "VA-1117", //transmittal number is invalid format
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
  proposedEffectiveDate: "2022-01-01",
  uploads: [
    {
      contentType: "image/png",
      filename: "myfile.png",
      s3Key: "path/in/s3",
      title: "Other",
      url: "https://www.notasite.gov",
    },
  ],
  waiverAuthority: "me",
};

const testEventNoParse = {
  body: `{this should not parse!!!!!`,
};

const testEvent = {
  body: JSON.stringify(eventBody),
  requestContext: {
    identity: {
      cognitoIdentityId: "1234",
    },
  },
};

const invalidTestEvent = {
  body: JSON.stringify(invalidEventBody),
  requestContext: {
    identity: {
      cognitoIdentityId: "1234",
    },
  },
};

beforeEach(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);
  validateSubmission.mockReturnValue(false);
  dynamoDb.query.mockResolvedValue(GSIQueryReturn);
  dynamoDb.put.mockResolvedValue();
  dynamoDb.get.mockResolvedValue(packageUpdated);
});

it("catches a badly parsed event", async () => {
  const response = await main(testEventNoParse);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMISSION_FAILED),
  });
});

it("returns error code for validation error", async () => {
  validateSubmission.mockReturnValue(true);
  const response = await main(invalidTestEvent);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.VALIDATION_ERROR),
  });
});

it("returns error code for user not found", async () => {
  getUser.mockResolvedValue({});
  const response = await main(testEvent);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.USER_NOT_FOUND),
  });
});

it("returns error code for unauthorized user", async () => {
  getUser.mockResolvedValue(testUnauthUser);
  const response = await main(testEvent);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.USER_NOT_AUTHORIZED),
  });
});

it("returns system error if query fails", async () => {
  dynamoDb.query.mockResolvedValue({});
  const response = await main(testEvent);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.SYSTEM_ERROR),
  });
});

it("returns system error if put fails", async () => {
  dynamoDb.put.mockRejectedValue("error");
  const response = await main(testEvent);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.SYSTEM_ERROR),
  });
});

it("returns system error if get fails", async () => {
  dynamoDb.get.mockRejectedValue("error");
  const response = await main(testEvent);
  expect(response).toEqual({
    ...expectedResponse,
    body: JSON.stringify(RESPONSE_CODE.RAI_RESPONSE_WITHDRAW_DISABLE_SUCCESS),
  });
});
