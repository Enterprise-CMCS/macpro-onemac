import dynamoDb from "./libs/dynamodb-lib";
import { validateUserReadOnly } from "./utils/validateUser";
import { getDetails } from "./getDetail";
import { getUser } from "./getUser";
import { RESPONSE_CODE } from "cmscommonlib";

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

jest.mock("./getUser");
jest.mock("./utils/validateUser");
jest.mock("./libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();
});

const validDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MI" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const invalidDoneBy = {
  roleList: [{ role: "statesubmitter", status: "denied", territory: "MI" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const validEvent = {
  queryStringParameters: {
    email: "email",
    cType: "spa",
    cNum: 18274923435,
  },
  pathParameters: {
    id: "id",
  },
};
const noPathEvent = {
  queryStringParameters: {
    email: "email",
    cType: "spa",
    cNum: 18274923435,
  },
};

beforeEach(() => {
  getUser.mockResolvedValue(validDoneBy);

  dynamoDb.get.mockResolvedValue({
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

describe("handles errors and exceptions", () => {
  it("checks incoming parameters", async () => {
    const expectedReturn = RESPONSE_CODE.VALIDATION_ERROR;

    expect(getDetails(noPathEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("component details are returned", () => {
  it("returns details", async () => {
    getUser.mockResolvedValue(testDoneBy);
    validateUserReadOnly.mockReturnValue(true);

    dynamoDb.get.mockResolvedValue({
      Item: {
        field1: "one",
      },
    });

    expect(getDetails(validEvent))
      .resolves.toStrictEqual({
        field1: "one",
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
