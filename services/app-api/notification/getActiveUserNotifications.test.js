import dynamoDb from "../libs/dynamodb-lib";
import { main, getActiveUserNotifications } from "./getActiveUserNotifications";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();
});

const testEvent = {
  pathParameters: {
    userId: "12345",
  },
};

const userNotificationItems = [
  {
    pk: "USER#12345",
    sk: "NOTIFICATION#1",
    header: "User Notification 1",
    dismissed: false,
  },
  {
    pk: "USER#12345",
    sk: "NOTIFICATION#2",
    header: "User Notification 2",
    dismissed: false,
  },
];

beforeEach(() => {
  dynamoDb.query.mockResolvedValue({ Items: userNotificationItems });
});

describe("getActiveUserNotifications", () => {
  it("returns active user notifications", async () => {
    await expect(getActiveUserNotifications("12345")).resolves.toStrictEqual({
      statusCode: 200,
      body: userNotificationItems,
    });
  });

  it("returns empty array if no user notifications", async () => {
    dynamoDb.query.mockResolvedValueOnce({ Items: [] });
    await expect(getActiveUserNotifications("12345")).resolves.toStrictEqual({
      statusCode: 200,
      body: [],
    });
  });

  it("handles dynamoDb query error", async () => {
    const expectedResponse = {
      statusCode: 500,
      body: {
        message: "Error fetching active user notifications",
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

  it("returns validation error if userId is missing", async () => {
    const expectedResponse = {
      statusCode: 400,
      body: {
        message: "userId is required",
      },
    };

    const noUserEvent = { pathParameters: {} };

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
