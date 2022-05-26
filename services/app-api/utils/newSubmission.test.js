import dynamoDb from "../libs/dynamodb-lib";
import newSubmission from "./newSubmission";
import addChild from "./addChild";

jest.mock("../libs/dynamodb-lib");
dynamoDb.put.mockResolvedValue({});
dynamoDb.update.mockResolvedValue({ Attributes: { Latest: 2 } });

jest.mock("./addChild");
addChild.mockImplementation(async () => {
  return { Latest: 2 };
});
jest.mock("cmscommonlib");

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
    const testConfig = {
      packageGroup: "group",
      componentType: "aType",
    };

    expect(newSubmission(testData, testConfig))
      .resolves.toStrictEqual("Component is Top Level.")
      .catch((error) => {
        console.log("caught test error 1: ", error);
      });
  });

  it("recognizes a child Package", () => {
    const testDataChild = {
      submissionTimestamp: "timestamp",
      submissionId: "submissionid",
      submitterId: "submitterId",
      submitterName: "submitterName",
      submitterEmail: "submitterEmail",
      attachments: "attachments",
      additionalInformation: "additionalInformation",
      parentId: "aParent",
      componentId: "compId",
    };
    const testConfigChild = {
      allowMultiplesWithSameId: true,
      componentType: "aType",
      getParentInfo: (id) => [id, "parentType"],
    };

    expect(newSubmission(testDataChild, testConfigChild))
      .resolves.toStrictEqual({ Latest: 2 })
      .catch((error) => {
        console.log("caught test error 2: ", error);
      });
  });
});

it("handles excpetions", () => {
  const testDataChild = {
    submissionTimestamp: "timestamp",
    submissionId: "submissionid",
    submitterId: "submitterId",
    submitterName: "submitterName",
    submitterEmail: "submitterEmail",
    attachments: "attachments",
    additionalInformation: "additionalInformation",
    parentId: "aParent",
    componentId: "compId",
  };
  const testConfigChild = {
    componentType: "aType",
    getParentInfo: (id) => [id, "parentType"],
  };
  dynamoDb.update.mockImplementation(() => {
    throw new Error("this error");
  });

  expect(newSubmission(testDataChild, testConfigChild))
    .rejects.toThrow("this error")
    .catch((error) => {
      console.log("caught test error 2: ", error);
    });
});
