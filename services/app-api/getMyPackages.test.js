import { main } from "./getMyPackages";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  getActiveTerritories,
  getUserRoleObj,
} from "cmscommonlib";
import { getUser } from "./getUser";

jest.mock("./getUser");
jest.mock("cmscommonlib");
jest.mock("./libs/dynamodb-lib");

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.SUBMISSION_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testUserEvent = {
  queryStringParameters: {
    email: "testEmail",
    group: "spa",
  },
};

const testDoneBy = {
  roleList: [
    { role: "statesubmitter", status: "active", territory: "VA" },
    { role: "statesubmitter", status: "active", territory: "MD" },
  ],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const testDoneByAll = {
  roleList: [{ role: "helpdesk", status: "active", territory: "N/A" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);

  getUserRoleObj.mockImplementation(() => {
    return { canAccessDashboard: true };
  });

  getActiveTerritories.mockImplementation(() => {
    return ["VA"];
  });

  dynamoDb.query.mockResolvedValue({
    Items: [
      {
        componentType: "waivernew",
        componentId: "VA.1117",
        submissionId: "9c5c8b70-53a6-11ec-b5bc-c9173b9fa278",
        currentStatus: "Package In Review",
        submitterId: "us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5",
        submitterName: "Angie Active",
        submissionTimestamp: 1638473560098,
        submitterEmail: "statesubmitteractive@cms.hhs.local",
      },
      {
        componentType: "spa",
        componentId: "VA-45-5913",
        submissionId: "cb9978d0-5dfb-11ec-a7a2-c5995198046c",
        currentStatus: "Disapproved",
        submitterId: "us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b",
        submitterName: "Statesubmitter Nightwatch",
        submissionTimestamp: 1639609658284,
        submitterEmail: "statesubmitter@nightwatch.test",
      },
      {
        componentType: "chipspa",
        componentId: "VA-33-2244-CHIP",
        submissionId: "41103ac0-61aa-11ec-af2f-49cb8bfb8860",
        currentStatus: "Submitted",
        submitterId: "us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5",
        submitterName: "Angie Active",
        submissionTimestamp: 1640014441278,
        submitterEmail: "statesubmitteractive@cms.hhs.local",
      },
    ],
    Count: 3,
    ScannedCount: 3,
  });
});

it(`returns an error if no user email is sent`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_FOUND);
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

it(`returns an error if user has wrong access`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_AUTHORIZED);

  getUserRoleObj.mockImplementationOnce(() => {
    return { canAccessDashboard: false };
  });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns the list of packages`, async () => {
  expectedResponse.body =
    '[{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"Package In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"}]';

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`handles the helpdesk user`, async () => {
  getUser.mockResolvedValueOnce(testDoneByAll);

  expectedResponse.body =
    '[{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"Package In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"}]';

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
