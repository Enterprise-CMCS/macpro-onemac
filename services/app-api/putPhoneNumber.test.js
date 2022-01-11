import { main } from "./putPhoneNumber";

import { RESPONSE_CODE } from "cmscommonlib";
import dynamoDb from "./libs/dynamodb-lib";

jest.mock("./libs/dynamodb-lib");

dynamoDb.update.mockImplementation(() => {
  return true;
});

it("validation of input", async () => {
  const mockObject = {
    statusCode: 200,
    body: {},
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  const expectedResponse = {
    id: "statesubmitteractive@cms.hhs.local",
    statusCode: 200,
    body: RESPONSE_CODE.VALIDATION_ERROR,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  await expect(main(mockObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((e) => {
      RESPONSE_CODE.VALIDATION_ERROR, e;
    });
});

it("runs through validation of input and tries to update dynamoDb, exception", async () => {
  dynamoDb.update.mockImplementation(() => {
    throw "Error";
  });

  const mockObject = {
    statusCode: 200,
    body: JSON.stringify({
      id: "statesubmitteractive@cms.hhs.local",
      phoneNumber: "5558773444",
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  const expectedResponse = {
    statusCode: 200,
    body: RESPONSE_CODE.USER_SUBMISSION_FAILED,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  await expect(main(mockObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((e) => {
      RESPONSE_CODE.USER_SUBMISSION_FAILED, e;
    });
});

it("runs through validation of input and tries to update dynamoDb, success", async () => {
  dynamoDb.update.mockImplementation(() => {
    return "true";
  });

  const mockObject = {
    statusCode: 200,
    body: JSON.stringify({
      id: "statesubmitteractive@cms.hhs.local",
      phoneNumber: "5558773444",
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  const expectedResponse = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMITTED),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(mockObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((e) => {
      console.log("error", e);
    });
});
