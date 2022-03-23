import dynamoDb from "../libs/dynamodb-lib";
import { Validate } from "cmscommonlib";
import newSubmission from "./newSubmission";
import updateComponent from "./updateComponent";

jest.mock("../libs/dynamodb-lib");
dynamoDb.put.mockResolvedValue({});

jest.mock("./updateComponent");
updateComponent.mockImplementation(async () => {
  return { done: "done" };
});
jest.mock("cmscommonlib");

describe("submissions are properly captured into the database", () => {
  it("recognizes a new Package", () => {
    Validate.decodeId.mockReturnValueOnce({
      packageId: "MI-11-1112",
      parentType: "spa",
      componentId: "MI-11-1111",
      componentType: "spa",
      isNewPackage: true,
    });

    const testData = {
      submissionTimestamp: "timestamp",
      submissionId: "submissionid",
      submitterId: "submitterId",
      submitterName: "submitterName",
      submitterEmail: "submitterEmail",
      attachments: "attachments",
      additionalInformation: "additionalInformation",
    };

    expect(newSubmission(testData))
      .resolves.toStrictEqual("Compnent is a Package.")
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("recognizes a child Package", () => {
    Validate.decodeId.mockReturnValueOnce({
      packageId: "MI.1112",
      parentType: "waiver",
      componentId: "MI.1112.R00.M01",
      componentType: "waiveramendment",
      isNewPackage: false,
    });

    const testData = {
      submissionTimestamp: "timestamp",
      submissionId: "submissionid",
      submitterId: "submitterId",
      submitterName: "submitterName",
      submitterEmail: "submitterEmail",
      attachments: "attachments",
      additionalInformation: "additionalInformation",
    };

    expect(newSubmission(testData))
      .resolves.toStrictEqual({ done: "done" })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
