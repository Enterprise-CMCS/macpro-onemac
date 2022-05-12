import dynamoDb from "../libs/dynamodb-lib";
import updateParent from "./updateParent";

jest.mock("../libs/dynamodb-lib");
dynamoDb.update.mockResolvedValue({});

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

    expect(updateParent(testData)).resolves.toBe({});
  });
});
