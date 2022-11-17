import AWS from "aws-sdk";
import newComponent from "./newComponent";

jest.mock("aws-sdk");
AWS.DynamoDB.DocumentClient.mockImplementation(() => {
  return {
    update: () => ({ Attributes: { Latest: 2 } }),
    put: () => {},
  };
});

jest.mock("cmscommonlib");

describe("submissions are properly captured into the database", () => {
  it("recognizes a new Package", () => {
    const testData = {
      submissionTimestamp: "timestamp",
      submitterName: "submitterName",
      submitterEmail: "submitterEmail",
      attachments: "attachments",
      additionalInformation: "additionalInformation",
    };
    const testConfig = {
      whichTab: "thisTab",
      componentType: "aType",
    };

    expect(newComponent(testData, testConfig))
      .resolves.toStrictEqual("Component is Top Level.")
      .catch((error) => {
        console.log("caught test error 1: ", error);
      });
  });

  it("recognizes a child Package", () => {
    const testDataChild = {
      submissionTimestamp: "timestamp",
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

    expect(newComponent(testDataChild, testConfigChild))
      .resolves.toStrictEqual({ Latest: 2 })
      .catch((error) => {
        console.log("caught test error 2: ", error);
      });
  });
});

it("handles excpetions", () => {
  const testDataChild = {
    submissionTimestamp: "timestamp",
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
  AWS.DynamoDB.DocumentClient.mockImplementation(() => {
    return {
      update: () => {
        throw new Error("this error");
      },
      put: () => {},
    };
  });

  expect(newComponent(testDataChild, testConfigChild))
    .rejects.toThrow("this error")
    .catch((error) => {
      console.log("caught test error 2: ", error);
    });
});
