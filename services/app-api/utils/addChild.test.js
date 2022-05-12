import dynamoDb from "../libs/dynamodb-lib";
import addChild from "./addChild";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.update.mockImplementation(() => {
    return { Attributes: { Latest: 2 } };
  });
  dynamoDb.put.mockImplementation(() => {});
});

const testChild = {
  componentId: "testID",
  territory: "ZZ",
  componentType: "Whatever",
  currentStatus: "statusy",
  submissionTimestamp: 1647112961,
  submitterName: "Submitter Name",
  submitterEmail: "submitter@email.com",
  parentId: "theParentComponent",
};

it("runs without crashing", async () => {
  const expectedReturn = { Latest: 2 };
  expect(addChild(testChild))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("notices when the parent component doesn't exist", async () => {
  const expectedReturn = { Latest: 2 };
  dynamoDb.update.mockImplementation(() => {
    throw new Error({
      code: "ConditionalCheckFailedException",
      message: "an error",
    });
  });
  expect(addChild(testChild))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("notices other errors", async () => {
  const expectedReturn = { Latest: 2 };
  dynamoDb.update.mockImplementation(() => {
    throw new Error({
      code: "NOTConditionalCheckFailedException",
      message: "an error",
    });
  });
  expect(addChild(testChild))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("notices smaller errors", async () => {
  const expectedReturn = undefined;
  dynamoDb.put.mockImplementation(() => {
    throw new Error("an error");
  });
  expect(addChild(testChild))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
