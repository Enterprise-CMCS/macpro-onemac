import dynamoDb from "../libs/dynamodb-lib";
import updateComponent from "./updateComponent";

jest.mock("../libs/dynamodb-lib");
dynamoDb.update.mockResolvedValue({});

describe("components can be updated", () => {
  it("calls the update", () => {
    const testData = {
      submissionTimestamp: "timestamp",
      submissionId: "submissionid",
      submitterId: "submitterId",
      submitterName: "submitterName",
      submitterEmail: "submitterEmail",
      attachments: ["attachments"],
      additionalInformation: "additionalInformation",
    };

    expect(updateComponent(testData)).resolves.toBe({});
  });
});
