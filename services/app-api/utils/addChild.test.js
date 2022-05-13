import addChild from "./addChild";
import updateWithVersion from "./updateWithVersion";

jest.mock("./updateWithVersion");

beforeAll(() => {
  jest.clearAllMocks();

  updateWithVersion.mockImplementation(() => {
    return { Latest: 2 };
  });
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
  updateWithVersion.mockImplementation(() => {
    const theError = new Error();
    theError.code = "ConditionalCheckFailedException";
    theError.message = "an error";
    throw theError;
  });

  expect(addChild(testChild))
    .resolves.toStrictEqual(undefined)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("notices other errors", async () => {
  const expectedReturn = { Latest: 2 };
  updateWithVersion.mockImplementation(() => {
    const theError = new Error();
    theError.code = "NOTConditionalCheckFailedException";
    theError.message = "an error";
    throw theError;
  });
  expect(addChild(testChild))
    .resolves.toStrictEqual(undefined)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
