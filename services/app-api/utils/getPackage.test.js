import { getPackage } from "./getPackage";
import dynamoDb from "../libs/dynamodb-lib";

jest.mock("../libs/dynamodb-lib");

describe("getPackage", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the package if found", async () => {
    const packageId = "my-package-id";
    const result = {
      Item: {
        componentType: "anyType",
      },
    };
    dynamoDb.get.mockResolvedValueOnce(result);

    const oneMacPackage = await getPackage(packageId);

    expect(dynamoDb.get).toHaveBeenCalledTimes(1);
    expect(oneMacPackage).toBe(result.Item);
  });

  it("should throw an error if package is not found", async () => {
    const packageId = "my-package-id";
    const result = {
      Item: null,
    };
    dynamoDb.get.mockResolvedValueOnce(result);

    await expect(getPackage(packageId)).rejects.toThrow(
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
