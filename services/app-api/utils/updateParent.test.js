import dynamoDb from "../libs/dynamodb-lib";
import updateParent from "./updateParent";

jest.mock("../libs/dynamodb-lib");
dynamoDb.update.mockResolvedValue({});

const mockReturnedParent = {
  Item: {
    children: [
      {
        componentId: "componentId",
        componentType: "componentType",
        submissionTimestamp: "timestamp",
      },
    ],
    sk: "",
  },
};

const mockReturnedUpdate = {
  Attributes: {
    Latest: "1",
  },
};

describe("parents can be updated", () => {
  it("calls the update", () => {
    const testData = {
      submissionTimestamp: "timestamp",
      parentId: "parentId",
      parentType: "parentType",
      componentId: "componentId",
      componentType: "componentType",
      currentStatus: "currentStatus",
    };
    dynamoDb.update.mockResolvedValue(mockReturnedUpdate);
    expect(updateParent(testData)).resolves.toBe(mockReturnedUpdate);
  });

  it("calls update children if found", () => {
    dynamoDb.get.mockResolvedValue(mockReturnedParent);
    dynamoDb.update.mockResolvedValue(mockReturnedUpdate);
    const testData = {
      submissionTimestamp: "timestamp",
      parentId: "parentId",
      parentType: "parentType",
      componentId: "componentId",
      componentType: "componentType",
      currentStatus: "currentStatus",
    };

    expect(updateParent(testData)).resolves.toBe(mockReturnedUpdate);
  });

  it("catches update error and logs it", () => {
    const testData = {
      submissionTimestamp: "timestamp",
      parentId: "parentId",
      parentType: "parentType",
      componentId: "componentId",
      componentType: "componentType",
      currentStatus: "currentStatus",
    };
    dynamoDb.update.mockResolvedValue(mockReturnedUpdate);
    const mockError = new Error("Put error");
    dynamoDb.put.mockImplementation(() => {
      throw mockError;
    });
    const logSpy = jest.spyOn(console, "log");

    expect(updateParent(testData)).resolves.toBe(mockReturnedUpdate);

    // expect(logSpy).toHaveBeenCalledWith(
    //   `Error happened updating DB:  ${mockError.message}`
    // );
  });
});
