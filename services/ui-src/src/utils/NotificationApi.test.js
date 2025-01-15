import NotificationApi from "./NotificationApi";
import { API } from "aws-amplify";
import handleApiError from "../libs/apiErrorHandler";

jest.mock("aws-amplify");
jest.mock("../libs/apiErrorHandler");

describe("NotificationApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getActiveSystemNotifications", () => {
    it("should fetch active system notifications", async () => {
      const mockNotifications = [{ id: 1, message: "System update available" }];
      API.get.mockResolvedValue(mockNotifications);

      const notifications =
        await NotificationApi.getActiveSystemNotifications();

      expect(notifications).toEqual(mockNotifications);
      expect(API.get).toHaveBeenCalledWith(
        "oneMacAPI",
        "/getActiveSystemNotifications",
        {}
      );
    });

    it("should handle errors when fetching notifications", async () => {
      const mockError = new Error("API error");
      API.get.mockRejectedValue(mockError);
      handleApiError.mockReturnValue("Error handling");

      const result = await NotificationApi.getActiveSystemNotifications();

      expect(result).toBe("Error handling");
      expect(handleApiError).toHaveBeenCalledWith(
        mockError,
        "NOTIFICATION_RETRIEVAL_ERROR",
        "There was an error fetching data for the system notifications."
      );
    });
  });

  describe("createUserNotifications", () => {
    it("should create user notifications", async () => {
      const mockNotifications = [{ id: 2, message: "New message received" }];
      API.post.mockResolvedValue(mockNotifications);

      const notifications = await NotificationApi.createUserNotifications();

      expect(notifications).toEqual(mockNotifications);
      expect(API.post).toHaveBeenCalledWith(
        "oneMacAPI",
        "/createUserNotifications",
        {}
      );
    });

    it("should handle errors when creating notifications", async () => {
      const mockError = new Error("API error");
      API.post.mockRejectedValue(mockError);
      handleApiError.mockReturnValue("Error handling");

      const result = await NotificationApi.createUserNotifications();

      expect(result).toBe("Error handling");
      expect(handleApiError).toHaveBeenCalledWith(
        mockError,
        "NOTIFICATION_RETRIEVAL_ERROR",
        "There was an error fetching data for the users notifications."
      );
    });
  });

  describe("dismissUserNotifications", () => {
    const userEmail = "test@example.com";
    const notificationId = "123";

    it("should dismiss user notifications", async () => {
      const mockNotifications = [{ id: 3, message: "Notification dismissed" }];
      API.patch.mockResolvedValue(mockNotifications);

      const notifications = await NotificationApi.dismissUserNotifications(
        userEmail,
        notificationId
      );

      expect(notifications).toEqual(mockNotifications);
      expect(API.patch).toHaveBeenCalledWith(
        "oneMacAPI",
        `/dismissNotification/${userEmail}/${notificationId}`,
        {}
      );
    });

    it("should throw an error if userEmail is not specified", async () => {
      await expect(
        NotificationApi.dismissUserNotifications("", notificationId)
      ).rejects.toThrow(
        "user Email was not specified for notification API call"
      );
    });

    it("should throw an error if notificationId is not specified", async () => {
      await expect(
        NotificationApi.dismissUserNotifications(userEmail, "")
      ).rejects.toThrow(
        "notification Id  was not specified for notification API call"
      );
    });

    it("should handle errors when dismissing notifications", async () => {
      const mockError = new Error("API error");
      API.patch.mockRejectedValue(mockError);
      handleApiError.mockReturnValue("Error handling");

      const result = await NotificationApi.dismissUserNotifications(
        userEmail,
        notificationId
      );

      expect(result).toBe("Error handling");
      expect(handleApiError).toHaveBeenCalledWith(
        mockError,
        "NOTIFICATION_DISSMISS_ERROR",
        "There was an error dismissing the users notifications."
      );
    });
  });
});
