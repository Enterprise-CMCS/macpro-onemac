import dynamoDb from "../libs/dynamodb-lib";
import packageExists from "./packageExists";

jest.mock("../libs/dynamodb-lib");

describe("ID is checked in every table", () => {
  it("checks one table first", () => {
    const testID = "MD-22-1111";
    dynamoDb.query.mockResolvedValueOnce({ Count: 2 });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("checks two tables next", () => {
    const testID = "MD-22-1111";
    dynamoDb.query
      .mockResolvedValueOnce({ Count: 0 })
      .mockResolvedValueOnce({ Count: 2 });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("does a scan if the two queries fail", () => {
    const testID = "MD-22-1111";
    dynamoDb.query
      .mockResolvedValueOnce({ Count: 0 })
      .mockResolvedValueOnce({ Count: 0 });

    dynamoDb.scan.mockResolvedValueOnce({ Count: 2 });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("returns false if none of the checks return anything", () => {
    const testID = "MD-22-1111";
    dynamoDb.query
      .mockResolvedValueOnce({ Count: 0 })
      .mockResolvedValueOnce({ Count: 0 });

    dynamoDb.scan.mockResolvedValueOnce({ Count: 0 });

    expect(packageExists(testID)).resolves.toBe(false);
  });
});
