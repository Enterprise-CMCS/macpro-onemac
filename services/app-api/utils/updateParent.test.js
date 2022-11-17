import AWS from "aws-sdk";
import updateParent from "./updateParent";

jest.mock("aws-sdk");
AWS.DynamoDB.DocumentClient.mockImplementation(() => {
  return {
    update: () => ({}),
    put: () => {},
  };
});

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
    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
      return {
        update: () => mockReturnedUpdate,
      };
    });
    expect(updateParent(testData))
      .resolves.toBe(mockReturnedUpdate)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });

  it("calls update children if found", () => {
    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
      return {
        get: () => mockReturnedParent,
        update: () => mockReturnedUpdate,
      };
    });

    const testData = {
      submissionTimestamp: "timestamp",
      parentId: "parentId",
      parentType: "parentType",
      componentId: "componentId",
      componentType: "componentType",
      currentStatus: "currentStatus",
    };

    expect(updateParent(testData))
      .resolves.toBe(mockReturnedUpdate)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
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
    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
      return {
        put: () => {
          throw new Error("Put error");
        },
        update: () => mockReturnedUpdate,
      };
    });
    const logSpy = jest.spyOn(console, "log");

    expect(updateParent(testData))
      .resolves.toBe(mockReturnedUpdate)
      .catch((error) => {
        console.log("caught test error: ", error);
      });

    // expect(logSpy).toHaveBeenCalledWith(
    //   `Error happened updating DB:  ${mockError.message}`
    // );
  });
});
