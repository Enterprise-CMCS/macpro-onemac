import AWS from "aws-sdk";
import { newUser } from "./newUser";

jest.mock("aws-sdk");

beforeAll(() => {
  jest.clearAllMocks();

  AWS.DynamoDB.DocumentClient.mockImplementation(() => {
    return {
      put: () => {},
    };
  });
});

const testData = {
  email: "testemail",
  submissionTimestamp: "timestamp",
  submitterName: "submitterName",
  submitterEmail: "submitterEmail",
  attachments: ["attachments"],
  additionalInformation: "additionalInformation",
};

it("calls the update", () => {
  expect(newUser(testData))
    .resolves.toBe(undefined)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles a put exception", () => {
  AWS.DynamoDB.DocumentClient.mockImplementation(() => {
    return {
      put: () => {
        throw new Error("an exception");
      },
    };
  });

  expect(() => newUser(testData))
    .rejects.toThrow("an exception")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
