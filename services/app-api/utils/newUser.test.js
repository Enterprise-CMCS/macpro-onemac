import dynamoDb from "../libs/dynamodb-lib";
import { newUser } from "./newUser";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.put.mockResolvedValue({});
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
  dynamoDb.put.mockImplementationOnce(() => {
    throw new Error("an exception");
  });
  expect(() => newUser(testData))
    .rejects.toThrow("an exception")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
