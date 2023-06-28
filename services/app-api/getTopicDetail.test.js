import dynamoDb from "./libs/dynamodb-lib";
import { main, getTopicDetail } from "./getTopicDetail";
import { getUser } from "./getUser";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import { testEventItem, testEventList } from "./unit-test/testDataEvent";

jest.mock("./getUser");
jest.mock("./libs/dynamodb-lib");
jest.mock("aws-sdk");
jest.mock("cmscommonlib");

beforeAll(() => {
  jest.clearAllMocks();
});

const validDoneBy = {
  roleList: [{ role: "systemadmin", status: "active", territory: "NA" }],
  email: "myemail@email.com",
  fullName: "firsty lastly",
};

const unauthorizedDoneBy = {
  roleList: [{ role: "cmsroleapprover", status: "active", territory: "N/A" }],
  email: "myemail@email.com",
  fullName: "firsty lastly",
};

const invalidDoneBy = {
  roleList: [{ role: "statesubmitter", status: "denied", territory: "MI" }],
  email: "myemail@email.com",
  fullName: "firsty lastly",
};

const validParameters = {
  email: "email",
  id: "id",
  changedDate: "18274923435",
};

const validEvent = {
  queryStringParameters: validParameters,
};

const invalidEmailEvent = {};

const invalidDataEvent = {
  email: "email",
};

beforeEach(() => {
  getUser.mockResolvedValue(validDoneBy);

  getUserRoleObj.mockImplementation(() => {
    return { canAccessAdminTools: true };
  });

  dynamoDb.query.mockResolvedValue({ Items: testEventItem, Count: 1 });
});

describe("handles errors and exceptions", () => {
  it("checks incoming parameters", async () => {
    const expectedReturn = RESPONSE_CODE.DATA_MISSING;

    await expect(getTopicDetail(invalidDataEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("checks incoming parameters", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;

    await expect(getTopicDetail(invalidEmailEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("checks for valid user", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
    getUser.mockResolvedValueOnce(invalidDoneBy);

    await expect(getTopicDetail("email", "id", "12345"))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("checks for authorized user", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
    getUser.mockResolvedValueOnce(unauthorizedDoneBy);

    await expect(getTopicDetail(validParameters))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("handles user exception", async () => {
    const expectedReturn = RESPONSE_CODE.VALIDATION_ERROR;
    getUser.mockRejectedValueOnce("getUser exception");

    await expect(getTopicDetail(validParameters))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("handles dynamo exception", async () => {
    const expectedReturn = {};
    dynamoDb.query.mockRejectedValueOnce("dynamoDb exception");

    await expect(getTopicDetail(validParameters))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("event item is returned", () => {
  it("returns empty object if no results", async () => {
    dynamoDb.get.mockResolvedValueOnce({});

    await expect(getTopicDetail(validParameters))
      .resolves.toStrictEqual({})
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("returns full response from main", async () => {
    const fullResponse = testEventItem;
    expect(main(validEvent))
      .resolves.toStrictEqual(fullResponse)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
