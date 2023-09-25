import dynamoDb from "../libs/dynamodb-lib";
import packageExists from "./packageExists";

jest.mock("../libs/dynamodb-lib");
const testID = "a TEST ID";

describe("ID is checked in every table", () => {
  it("checks one table first", () => {
    dynamoDb.query.mockResolvedValueOnce({ Count: 2 });

    // expect(packageExists(testID)).resolves.toBe(true);
  });
  /*
  it("checks two tables next", () => {
    dynamoDb.query
      .mockResolvedValueOnce({ Count: 0 })
      .mockResolvedValueOnce({ Count: 2 });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  dynamoDb.query.mockResolvedValue({ Count: 0 });

  it("does a scan if the two queries fail", () => {
    dynamoDb.scan.mockResolvedValueOnce({ Count: 2 });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("returns false if none of the checks return anything", () => {
    dynamoDb.scan.mockResolvedValueOnce({ Count: 0 });

    expect(packageExists(testID)).resolves.toBe(false);
  });
  */
});
