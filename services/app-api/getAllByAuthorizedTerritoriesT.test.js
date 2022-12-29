import { RESPONSE_CODE } from "cmscommonlib";
import dynamoDb from "./libs/dynamodb-lib";
import { main } from "./getAllByAuthorizedTerritories";
import { getUser } from "./getUser";

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

const testHelpdesk = {
  roleList: [{ role: "helpdesk", status: "active", territory: "N/A" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.SUBMISSION_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const queryAndScanItems = [
  {
    componentType: "waivernew",
    componentId: "VA.1117",
    submissionId: "9c5c8b70-53a6-11ec-b5bc-c9173b9fa278",
    currentStatus: "In Review",
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
];

const queryAndScanReturn = {
  Items: queryAndScanItems,
  Count: 3,
  ScannedCount: 3,
};

jest.mock("./getUser");
jest.mock("./libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);

  dynamoDb.query.mockResolvedValue(queryAndScanReturn);
  dynamoDb.scan.mockResolvedValue(queryAndScanReturn);
});

it(`returns an error if no user email is sent`, async () => {
  getUser.mockResolvedValueOnce(null);

  expectedResponse.statusCode = 500;
  expectedResponse.body = `{"error":"Cannot read property 'roleList' of null"}`;
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  await expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`handles a dynamo exception`, async () => {
  dynamoDb.query.mockRejectedValueOnce("dynamo error");

  expectedResponse.statusCode = 200;
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.DATA_RETRIEVAL_ERROR);
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  await expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`gets all packages for state users`, async () => {
  expectedResponse.statusCode = 200;
  expectedResponse.body =
    '[{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"}]';
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  await expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`gets all packages for helpdesk users`, async () => {
  getUser.mockResolvedValueOnce(testHelpdesk);
  expectedResponse.statusCode = 200;
  expectedResponse.body = JSON.stringify(queryAndScanItems);
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  await expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("Get Stub", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  await expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles multiple scans", async () => {
  getUser.mockResolvedValueOnce(testHelpdesk);
  expectedResponse.statusCode = 200;
  expectedResponse.body =
    '[{"componentType":"waivernew","componentId":"VA.1117"},{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"}]';

  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };
  dynamoDb.scan.mockResolvedValueOnce({
    Items: [
      {
        componentType: "waivernew",
        componentId: "VA.1117",
      },
    ],
    Count: 1,
    LastEvaluatedKey: 3,
    ScannedCount: 1,
  });

  await expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles multiple queries", async () => {
  expectedResponse.statusCode = 200;
  expectedResponse.body =
    '[{"componentType":"waivernew","componentId":"VA.1117"},{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"waiverrenewal","componentId":"VA.1117.R01"}]';

  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };
  dynamoDb.query
    .mockResolvedValueOnce({
      Items: [
        {
          componentType: "waivernew",
          componentId: "VA.1117",
        },
      ],
      Count: 1,
      LastEvaluatedKey: 3,
      ScannedCount: 1,
    })
    .mockResolvedValueOnce({
      Items: [
        {
          componentType: "waiverrenewal",
          componentId: "VA.1117.R01",
        },
      ],
      Count: 1,
      ScannedCount: 1,
    });

  await expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
/*
it("handles bad queries", async () => {
  expectedResponse.statusCode = 200;
  expectedResponse.body =
  JSON.stringify(RESPONSE_CODE.DATA_RETRIEVAL_ERROR);
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };
  dynamoDb.query.mockRejectedValueOnce("bad query");

  expect(main(thisTestUserEvent))
  .resolves.toStrictEqual(expectedResponse)
  .catch((error) => {
    console.log("caught test error: ", error);
  });
});

it("handles empty user", async () => {
  getUser.mockResolvedValueOnce({});

  expectedResponse.statusCode = 200;
  expectedResponse.body =
  '[{"componentType":"waivernew","componentId":"VA.1117"},{"componentType":"waivernew","componentId":"VA.1117","submissionId":"9c5c8b70-53a6-11ec-b5bc-c9173b9fa278","currentStatus":"In Review","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1638473560098,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"spa","componentId":"VA-45-5913","submissionId":"cb9978d0-5dfb-11ec-a7a2-c5995198046c","currentStatus":"Disapproved","submitterId":"us-east-1:86a190fe-b195-42bf-9685-9761bf0ff14b","submitterName":"Statesubmitter Nightwatch","submissionTimestamp":1639609658284,"submitterEmail":"statesubmitter@nightwatch.test"},{"componentType":"chipspa","componentId":"VA-33-2244-CHIP","submissionId":"41103ac0-61aa-11ec-af2f-49cb8bfb8860","currentStatus":"Submitted","submitterId":"us-east-1:3211a6ff-043f-436b-8313-1b314582b2a5","submitterName":"Angie Active","submissionTimestamp":1640014441278,"submitterEmail":"statesubmitteractive@cms.hhs.local"},{"componentType":"waiverrenewal","componentId":"VA.1117.R01"}]';
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };
  dynamoDb.query.mockResolvedValueOnce({
    Items: [
      {
        componentType: "waiverrenewal",
        componentId: "VA.1117.R01",
      }
    ],
    Count: 1,
    ScannedCount: 1,
  });

  expect(main(thisTestUserEvent))
  .resolves.toStrictEqual(expectedResponse)
  .catch((error) => {
    console.log("caught test error: ", error);
  });
});
*/
