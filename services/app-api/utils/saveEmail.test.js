import dynamoDb from "../libs/dynamodb-lib";
import { saveEmail } from "./saveEmail";

jest.mock("../libs/dynamodb-lib");
const testInputs = {
  messageId: "a message id",
  eventName: "nameOfEvent",
  stateOrCMS: "who",
  data: {
    onevar: "someValue",
    componentId: "anID",
    eventTimestamp: 38383,
  },
};

describe("Email is considered saved", () => {
  it("returns the value from the put", () => {
    dynamoDb.put.mockResolvedValueOnce({ Count: 2 });

    expect(
      saveEmail("messageId", "eventName", "who", {
        componentId: "anID",
        eventTimestamp: 38383,
      })
    ).resolves.toStrictEqual({ Count: 2 });
  });
});
