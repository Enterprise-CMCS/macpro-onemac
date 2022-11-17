import { RESPONSE_CODE } from "cmscommonlib";

const responseItem = {
  transmittalNumber: "MI.7778.R11",
  uploads: [
    {
      s3Key: "aKey",
      url: "Signed URL",
    },
    {
      s3Key: "anotherKey",
      url: "Signed URL",
    },
  ],
};

const expectedResponse = {
  statusCode: 200,
  body: JSON.stringify(responseItem),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testGetEvent = {
  pathParameters: {
    userId: "testUserId",
    id: "testId",
  },
};

beforeEach(() => jest.resetModules());

it("returns the submission", async () => {
  jest.mock("aws-sdk", () => ({
    S3: () => ({
      getSignedUrlPromise: () => "Signed URL",
    }),
    DynamoDB: {
      DocumentClient: () => ({
        get: () => ({
          promise: () => ({
            Item: {
              transmittalNumber: "MI.7778.R11",
              uploads: [{ s3Key: "aKey" }, { s3Key: "anotherKey" }],
            },
          }),
        }),
      }),
    },
  }));

  const { main } = require("./get");
  expect(main(testGetEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("throws an error if no item", async () => {
  jest.mock("aws-sdk", () => ({
    S3: () => ({
      getSignedUrlPromise: () => "Signed URL",
    }),
    DynamoDB: {
      DocumentClient: () => ({
        get: () => ({
          promise: () => ({
            notAnItem: {},
          }),
        }),
      }),
    },
  }));
  const exceptionResponse = {
    statusCode: 500,
    body: '{"error":"Item not found."}',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  const { main } = require("./get");

  expect(main(testGetEvent))
    .resolves.toStrictEqual(exceptionResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("throws an error if can't get signed URLs", async () => {
  jest.mock("aws-sdk", () => ({
    S3: () => ({
      getSignedUrlPromise: () => {
        throw "no URL";
      },
    }),
    DynamoDB: {
      DocumentClient: () => ({
        get: () => ({
          promise: () => ({
            Item: {
              transmittalNumber: "MI.7778.R11",
              uploads: [{ s3Key: "aKey" }, { s3Key: "anotherKey" }],
            },
          }),
        }),
      }),
    },
  }));

  const exceptionResponse = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.DATA_RETRIEVAL_ERROR),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  const { main } = require("./get");

  expect(main(testGetEvent))
    .resolves.toStrictEqual(exceptionResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
