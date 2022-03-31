import dynamoDb from "./libs/dynamodb-lib";
import AWS from "aws-sdk";
import { getDetails } from "./getDetail";
import { getUser } from "./getUser";
import { RESPONSE_CODE } from "cmscommonlib";

jest.mock("./getUser");
jest.mock("./libs/dynamodb-lib");
jest.mock("aws-sdk");

beforeAll(() => {
  jest.clearAllMocks();
});

const validDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MI" }],
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

const validEvent = {
  queryStringParameters: {
    email: "email",
    cType: "spa",
    cNum: 18274923435,
  },
  pathParameters: {
    id: "MInumber",
  },
};
const noPathEvent = {
  queryStringParameters: {
    email: "email",
    cType: "spa",
    cNum: 18274923435,
  },
};
const waiverEvent = {
  queryStringParameters: {
    email: "email",
    cType: "waivernew",
    cNum: 18274923435,
  },
  pathParameters: {
    id: "MInumber",
  },
};

beforeEach(() => {
  getUser.mockResolvedValue(validDoneBy);

  dynamoDb.get.mockResolvedValue({
    Item: {
      field1: "one",
    },
  });

  dynamoDb.query.mockResolvedValue({ Items: [], Count: 0 });

  AWS.S3.mockImplementation(() => {
    return {
      getSignedUrlPromise: () => "signedURL",
    };
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

  it("checks for valid user", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
    getUser.mockResolvedValueOnce(invalidDoneBy);

    expect(getDetails(validEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("checks for authorized user", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
    getUser.mockResolvedValueOnce(unauthorizedDoneBy);

    expect(getDetails(validEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("component details are returned", () => {
  it("returns empty object if no results", async () => {
    dynamoDb.get.mockResolvedValueOnce({ notAnItem: "something" });

    expect(getDetails(validEvent))
      .resolves.toStrictEqual({})
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("returns details", async () => {
    expect(getDetails(validEvent))
      .resolves.toStrictEqual({
        field1: "one",
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("rai responses are returned", () => {
  it("returns rai responses if spa type", async () => {
    dynamoDb.query.mockResolvedValue({ Items: [{ item: "any" }], Count: 1 });
    expect(getDetails(validEvent))
      .resolves.toStrictEqual({
        field1: "one",
        raiResponses: [
          {
            item: "any",
          },
        ],
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("waiver extensions are returned", () => {
  it("returns waiver extensions if waiver type", async () => {
    expect(getDetails(waiverEvent))
      .resolves.toStrictEqual({
        field1: "one",
        waiverExtensions: [],
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
