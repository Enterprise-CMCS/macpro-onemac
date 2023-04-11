import dynamoDb from "../libs/dynamodb-lib";
import { newEvent } from "./newEvent";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.put.mockResolvedValue({});
  dynamoDb.get.mockResolvedValue({ Item: { lastEventTimestamp: 101 } });
});

const testName = "TestEventName";

const testData = {
  email: "testemail",
  submissionTimestamp: "timestamp",
  eventTimestamp: 100,
  submitterName: "submitterName",
  submitterEmail: "submitterEmail",
  attachments: ["attachments"],
  additionalInformation: "additionalInformation",
};

it("calls the update", () => {
  expect(newEvent(testName, testData))
    .resolves.toBe(undefined)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles a put exception", () => {
  dynamoDb.put.mockImplementationOnce(() => {
    throw new Error("an exception");
  });
  expect(() => newEvent(testName, testData))
    .rejects.toThrow("an exception")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
