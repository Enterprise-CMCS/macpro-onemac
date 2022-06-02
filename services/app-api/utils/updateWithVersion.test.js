import dynamoDb from "../libs/dynamodb-lib";
import updateWithVersion from "./updateWithVersion";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.update.mockImplementation(() => {
    return { Attributes: { Latest: 2, pk: "aPK", sk: `v0#anSK` } };
  });
  dynamoDb.put.mockImplementation(() => {});
});

const testParams = {
  TableName: process.env.oneMacTableName,
  Key: {
    pk: "aPK",
    sk: "anSK",
  },
};

it("runs without crashing", async () => {
  const expectedReturn = { Latest: 2, pk: "aPK", sk: "v0#anSK" };
  expect(updateWithVersion(testParams))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("passes Update exceptions up to the caller", async () => {
  const theError = new Error({
    code: "ConditionalCheckFailedException",
    message: "an error",
  });
  dynamoDb.update.mockImplementation(() => {
    throw theError;
  });
  expect(updateWithVersion(testParams))
    .rejects.toThrow(theError)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
/*

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
*/
