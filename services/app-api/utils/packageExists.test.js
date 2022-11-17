import AWS from "aws-sdk";
import packageExists from "./packageExists";

jest.mock("aws-sdk");

const testID = "a TEST ID";

describe("ID is checked in every table", () => {
  it("checks one table first", () => {
    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
      return {
        query: () => ({ Count: 2 }),
      };
    });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("does a scan if the two queries fail", () => {
    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
      return {
        query: () => ({ Count: 0 }),
        scan: () => ({ Count: 2 }),
      };
    });

    expect(packageExists(testID)).resolves.toBe(true);
  });

  it("returns false if none of the checks return anything", () => {
    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
      return {
        query: () => ({ Count: 0 }),
        scan: () => ({ Count: 0 }),
      };
    });

    expect(packageExists(testID)).resolves.toBe(false);
  });
});
