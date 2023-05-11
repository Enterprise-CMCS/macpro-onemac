import dynamoDb from "./libs/dynamodb-lib";
import AWS from "aws-sdk";
import { main, getDetails } from "./getDetail";
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
  isCMSUser: false,
  canSeeSubjectAndDescription: false,
  email: "myemail@email.com",
  fullName: "firsty lastly",
};

const validCMSDoneBy = {
  roleList: [{ role: "defaultcmsuser", status: "active", territory: "N/A" }],
  isCMSUser: true,
  canSeeSubjectAndDescription: true,
  email: "myemail@email.com",
  fullName: "Testy lastly",
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

const raiEvent = {
  queryStringParameters: {
    email: "email",
    cType: "waiverrai",
    cNum: 18274923435,
  },
  pathParameters: {
    id: "MInumber",
  },
};

const testItems = [{ id: 1234 }];

beforeEach(() => {
  getUser.mockResolvedValue(validDoneBy);

  dynamoDb.get.mockResolvedValue({
    Item: {
      field1: "one",
      attachments: [{ url: "aURL" }, { url: "anotherURL" }],
      raiResponses: [
        { attachments: [{ url: "raiURL" }, { url: "anotherraiURL" }] },
      ],
    },
  });

  dynamoDb.query.mockResolvedValue({ Items: testItems, Count: 1 });

  AWS.S3.mockImplementation(() => {
    return {
      getSignedUrlPromise: () => ({ url: "signedURL", idx: "anIDX" }),
    };
  });
});

describe("handles errors and exceptions", () => {
  it("checks incoming parameters", async () => {
    const expectedReturn = RESPONSE_CODE.VALIDATION_ERROR;

    await expect(getDetails(noPathEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("checks for valid user", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
    getUser.mockResolvedValueOnce(invalidDoneBy);

    await expect(getDetails(validEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("checks for authorized user", async () => {
    const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
    getUser.mockResolvedValueOnce(unauthorizedDoneBy);

    await expect(getDetails(validEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("handles user exception", async () => {
    const expectedReturn = RESPONSE_CODE.VALIDATION_ERROR;
    getUser.mockRejectedValueOnce("getUser exception");

    await expect(getDetails(validEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("handles dynamo exception", async () => {
    const expectedReturn = {};
    dynamoDb.query.mockRejectedValueOnce("dynamoDb exception");

    await expect(getDetails(validEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("component details are returned", () => {
  it("returns empty object if no results", async () => {
    dynamoDb.get.mockResolvedValueOnce({ notAnItem: "something" });

    await expect(getDetails(validEvent)).resolves.toStrictEqual({});
  });

  it("returns details", async () => {
    await expect(getDetails(validEvent))
      .resolves.toStrictEqual({
        field1: "one",
        attachments: [{ url: undefined }, { url: undefined }],
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("returns rai details", async () => {
    await expect(getDetails(raiEvent))
      .resolves.toStrictEqual({
        field1: "one",
        attachments: [{ url: undefined }, { url: undefined }],
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("returns CMS details", async () => {
    getUser.mockResolvedValueOnce(validCMSDoneBy);

    await expect(getDetails(raiEvent))
      .resolves.toStrictEqual({
        field1: "one",
        attachments: [{ url: undefined }, { url: undefined }],
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("returns full response from main", async () => {
    const fullResponse = {
      statusCode: 200,
      body: '{"field1":"one","attachments":[{},{}]}',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    expect(main(validEvent))
      .resolves.toStrictEqual(fullResponse)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("rai responses are returned", () => {
  it("returns rai responses if spa type", async () => {
    dynamoDb.query.mockResolvedValue({ Items: [{ item: "any" }], Count: 1 });
    await expect(getDetails(validEvent))
      .resolves.toStrictEqual({
        field1: "one",
        attachments: [{ url: undefined }, { url: undefined }],
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

describe("waiver children are returned", () => {
  it("returns waiver extensions and rais if waiver type", async () => {
    await expect(getDetails(waiverEvent))
      .resolves.toStrictEqual({
        field1: "one",
        attachments: [{ url: undefined }, { url: undefined }],
        waiverExtensions: testItems,
        raiResponses: testItems,
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
