import dynamoDb from "../libs/dynamodb-lib";
import packageExists from "./packageExists";

jest.mock("../libs/dynamodb-lib");
const testID = "a TEST ID";

describe("ID is checked in one table", () => {
  it("true if the query returns more than 0 items", () => {
    dynamoDb.query.mockResolvedValueOnce({ Count: 2 });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("false if the query returns 0 items", () => {
    dynamoDb.query.mockResolvedValueOnce({ Count: 0 });

    expect(packageExists(testID)).resolves.toBe(false);
  });
});
