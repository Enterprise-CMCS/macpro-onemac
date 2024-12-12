import dynamoDb from "../libs/dynamodb-lib";
import {
  main,
  getActiveSystemNotifications,
} from "./getActiveSystemNotifications";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();
});

const testEvent = {
  queryStringParameters: null,
  pathParameters: null,
};

const systemNotificationItems = [
  {
    GSI1pk: "SYSTEM",
    GSI1sk: "2024-01-01T00:00:00Z#2025-01-01T00:00:00Z",
    header: "System Notification 1",
  },
  {
    GSI1pk: "SYSTEM",
    GSI1sk: "2024-06-01T00:00:00Z#2025-06-01T00:00:00Z",
    header: "System Notification 2",
  },
];

beforeEach(() => {
  dynamoDb.query.mockResolvedValue({ Items: systemNotificationItems });
});

describe("getActiveSystemNotifications", () => {
  it("returns active system notifications", async () => {
    await expect(getActiveSystemNotifications()).resolves.toStrictEqual({
      statusCode: "200", // Status code as string
      body: systemNotificationItems,
    });
  });

  it("returns empty array if no system notifications", async () => {
    dynamoDb.query.mockResolvedValueOnce({ Items: [] });

    await expect(getActiveSystemNotifications()).resolves.toStrictEqual({
      statusCode: "200", // Status code as string
      body: [],
    });
  });

  it("handles dynamoDb query error", async () => {
    const expectedResponse = {
      statusCode: "SY000",
      body: {
        message: "There was an error fetching the active system notifications.",
      },
    };

    dynamoDb.query.mockRejectedValueOnce("DynamoDB Error");

    await expect(main(testEvent)).resolves.toStrictEqual({
      statusCode: 200, // Due to the handler wrapping
      body: JSON.stringify(expectedResponse), // The body is stringified
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  });
});
