import { main } from "./getTopic";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  getActiveTerritories,
  getUserRoleObj,
} from "cmscommonlib";
import { getUser } from "./getUser";
import { testEventList } from "./unit-test/testDataEvent";

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

const testTopicEvent = {
  queryStringParameters: {
    email: "myemail@email.com",
    topic: "Medicaid_SPA",
  },
};

const testDoneBy = {
  roleList: [{ role: "systemadmin", status: "active", territory: "NA" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);

  getUserRoleObj.mockImplementation(() => {
    return { canAccessAdminTools: true };
  });

  getActiveTerritories.mockImplementation(() => {
    return ["NA"];
  });

  dynamoDb.query.mockResolvedValue({
    Items: testEventList,
    Count: 1,
    ScannedCount: 1,
  });
});

it(`returns an error if no user email is sent`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_FOUND);
  const testTopicEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  expect(main(testTopicEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns an error if user has wrong access`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_AUTHORIZED);

  getUserRoleObj.mockImplementationOnce(() => {
    return { canAccessAdminTools: false };
  });

  expect(main(testTopicEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns the list of events`, async () => {
  expectedResponse.body = testEventList;

  expect(main(testTopicEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
