const {
  createUserNotifications,
  getUserTargetedSystemNotifications,
  getAllUserNotifications,
  insertMissingNotifications,
} = require("./createUserNotifications");

jest.mock("../libs/dynamodb-lib");
jest.mock("./createUserNotifications");

describe("createUserNotifications", () => {
  const mockUserId = "user@example.com";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should exit early if there are no active user-targeted system notifications", async () => {
    // Mock no system notifications
    getUserTargetedSystemNotifications.mockResolvedValue([]);

    const result = await createUserNotifications(mockUserId);

    expect(result).toEqual({
      statusCode: 200,
      body: {
        message: "No active user-targeted system notifications to sync.",
        insertedCount: 0,
      },
    });
    expect(getAllUserNotifications).not.toHaveBeenCalled(); // Ensure no further calls
    expect(insertMissingNotifications).not.toHaveBeenCalled();
  });

  it("should sync notifications if there are missing notifications", async () => {
    const mockSystemNotifications = [
      { sk: "NOTIFICATION#1", GSI1pk: "USER_NOTIFICATION" },
      { sk: "NOTIFICATION#2", GSI1pk: "USER_NOTIFICATION" },
    ];
    const mockUserNotifications = [
      { sk: "NOTIFICATION#1" }, // User already has NOTIFICATION#1
    ];

    // Mock system notifications
    getUserTargetedSystemNotifications.mockResolvedValue(
      mockSystemNotifications
    );
    // Mock user notifications
    getAllUserNotifications.mockResolvedValue(mockUserNotifications);

    // Mock insert missing notifications
    insertMissingNotifications.mockResolvedValue(undefined);

    const result = await createUserNotifications(mockUserId);

    expect(result).toEqual({
      statusCode: 200,
      body: {
        message: "User notifications synced successfully.",
        insertedCount: 1, // Only NOTIFICATION#2 should be inserted
      },
    });

    expect(getAllUserNotifications).toHaveBeenCalledWith(mockUserId);
    expect(insertMissingNotifications).toHaveBeenCalledWith(mockUserId, [
      { sk: "NOTIFICATION#2", GSI1pk: "USER_NOTIFICATION" },
    ]);
  });

  it("should not insert notifications if user already has all system notifications", async () => {
    const mockSystemNotifications = [
      { sk: "NOTIFICATION#1", GSI1pk: "USER_NOTIFICATION" },
    ];
    const mockUserNotifications = [
      { sk: "NOTIFICATION#1" }, // User already has all notifications
    ];

    // Mock system and user notifications
    getUserTargetedSystemNotifications.mockResolvedValue(
      mockSystemNotifications
    );
    getAllUserNotifications.mockResolvedValue(mockUserNotifications);

    const result = await createUserNotifications(mockUserId);

    expect(result).toEqual({
      statusCode: 200,
      body: {
        message: "User notifications synced successfully.",
        insertedCount: 0,
      },
    });

    expect(getAllUserNotifications).toHaveBeenCalledWith(mockUserId);
    expect(insertMissingNotifications).not.toHaveBeenCalled(); // No missing notifications, so no insert
  });

  it("should handle errors from getUserTargetedSystemNotifications", async () => {
    // Mock system notifications to throw an error
    getUserTargetedSystemNotifications.mockRejectedValue(
      new Error("DynamoDB error")
    );

    await expect(createUserNotifications(mockUserId)).rejects.toThrow(
      "DynamoDB error"
    );
    expect(getAllUserNotifications).not.toHaveBeenCalled(); // Ensure no further calls
    expect(insertMissingNotifications).not.toHaveBeenCalled();
  });
});
