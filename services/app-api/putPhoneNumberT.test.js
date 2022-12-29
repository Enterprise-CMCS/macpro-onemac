import { main } from "./putPhoneNumber";

import { RESPONSE_CODE } from "cmscommonlib";
import dynamoDb from "./libs/dynamodb-lib";

jest.mock("./libs/dynamodb-lib");

dynamoDb.update.mockImplementation(() => {
  return true;
});

const mockObject = {
  statusCode: 200,
  body: {
    id: "",
    phoneNumber: "",
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const expectedResponse = {
  statusCode: 200,
  body: {
    id: "",
    phoneNumber: "",
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

it("validation of input", () => {
  mockObject.body = {};
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.VALIDATION_ERROR);

  expect(main(mockObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((e) => {
      console.log("error test", e);
    });
});

it("runs through validation of input and tries to update dynamoDb, exception", () => {
  dynamoDb.update.mockImplementation(() => {
    throw "Error";
  });

  mockObject.body = JSON.stringify({
    id: "statesubmitteractive@cms.hhs.local",
    phoneNumber: "5558773444",
  });

  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_SUBMISSION_FAILED);

  expect(main(mockObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((e) => {
      console.log("error test", e);
    });
});

it("runs through validation of input and tries to update dynamoDb, success", () => {
  dynamoDb.update.mockImplementation(() => {
    return true;
  });

  mockObject.body = JSON.stringify({
    id: "statesubmitteractive@cms.hhs.local",
    phoneNumber: "5558773444",
  });

  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_SUBMITTED);

  expect(main(mockObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((e) => {
      console.log("error test", e);
    });
});
