import dynamoDb from "../libs/dynamodb-lib";
import newSubmission from "./newSubmission";

jest.mock("cmscommonlib", () => ({
  decodeId: () => {
    return {
      packageId: "MI-11-1112",
      parentType: "spa",
      componentId: "MI-11-1111",
      componentType: "spa",
      isNewPackage: true,
    };
  },
}));

jest.mock("../libs/dynamodb-lib");
dynamoDb.put.mockResolvedValue({});

describe("submissions are properly captured into the database", () => {
  it("recognizes a new Package", () => {
    const testData = {
      submissionTimestamp: "timestamp",
      submissionId: "submissionid",
      submitterId: "submitterId",
      submitterName: "submitterName",
      submitterEmail: "submitterEmail",
      attachments: "attachments",
      additionalInformation: "additionalInformation",
    };

    expect(newSubmission(testData)).resolves.toBe("Compnent is a Package.");
  });
});
