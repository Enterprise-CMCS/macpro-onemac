import dynamoDb from "../libs/dynamodb-lib";
import { main, dismissUserNotification } from "./dismissUserNotification";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();
});

const testEvent = {
  pathParameters: {
    userId: "12345",
    notificationId: "1",
  },
};

beforeEach(() => {
  dynamoDb.update.mockResolvedValue({ Attributes: { dismissed: true } });
});

describe("dismissUserNotification", () => {
  it("marks a notification as dismissed", async () => {
    await expect(dismissUserNotification("12345", "1")).resolves.toStrictEqual({
      statusCode: 200,
      body: { dismissed: true },
    });
  });

  it("handles dynamoDb update error", async () => {
    const expectedResponse = {
      statusCode: 500,
      body: {
        message: "Error dismissing user notification",
      },
    };

    dynamoDb.update.mockRejectedValueOnce("DynamoDB Error");

    await expect(main(testEvent)).resolves.toStrictEqual({
      statusCode: 200, // Due to the handler wrapping
      body: JSON.stringify(expectedResponse), // The body is stringified
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  });

  it("returns validation error if userId or notificationId is missing", async () => {
    const expectedResponse = {
      statusCode: 400,
      body: {
        message: "userId and notificationId are required",
      },
    };

    const noUserEvent = { pathParameters: { notificationId: "1" } };

    await expect(main(noUserEvent)).resolves.toStrictEqual({
      statusCode: 200, // Due to the handler wrapping
      body: JSON.stringify(expectedResponse), // The body is stringified
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  });
});
