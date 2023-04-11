import { getPackageType } from "./getPackageType";
import dynamoDb from "../libs/dynamodb-lib";

jest.mock("../libs/dynamodb-lib");

describe("getPackageType", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the componentType if found", async () => {
    const expectedType = "my-component-type";
    const packageId = "my-package-id";
    const result = {
      Item: {
        componentType: expectedType,
      },
    };
    dynamoDb.get.mockResolvedValueOnce(result);

    const packageType = await getPackageType(packageId);

    expect(dynamoDb.get).toHaveBeenCalledTimes(1);
    expect(packageType).toEqual(expectedType);
  });

  it("should throw an error if componentType is not found", async () => {
    const packageId = "my-package-id";
    const result = {
      Item: null,
    };
    dynamoDb.get.mockResolvedValueOnce(result);

    await expect(getPackageType(packageId)).rejects.toThrow(
      `${packageId} did not get result for package!`
    );

    expect(dynamoDb.get).toHaveBeenCalledTimes(1);
    expect(dynamoDb.get).toHaveBeenCalledWith({
      TableName: process.env.oneMacTableName,
      Key: {
        pk: packageId,
        sk: "Package",
      },
    });
  });
});
