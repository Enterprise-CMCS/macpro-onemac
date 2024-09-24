import { API } from "aws-amplify";
import handleApiError from "../libs/apiErrorHandler";
import { NotificationType } from "../domain-types";

/**
 * Singleton class to retrieve System and User Notifications
 */
class NotificationApi {
  /**
   * Gets all the Active System Notifications
   * Throws an exception if the API throws an exception
   * @param none
   * @return a list of current System Notifications
   */
  async getActiveSystemNotifications(): Promise<NotificationType[]> {
    try {
      const notifications = await API.get(
        "oneMacAPI",
        `/getActiveSystemNotifications`,
        {}
      );
      return notifications;
    } catch (error) {
      return handleApiError(
        error,
        "NOTIFICATION_RETRIEVAL_ERROR",
        "There was an error fetching data for the system notifications."
      );
    }
  }

  /**
   * Gets all the Active User Notifications
   * Throws an exception if the API throws an exception
   * @param {string} userEmail the user's email used as UserId
   * @return a list of current User Notifications
   */
  async createUserNotifications(
    userEmail: string
  ): Promise<NotificationType[]> {
    try {
      const notifications = await API.post(
        "oneMacAPI",
        `/createUserNotifications/${userEmail}`,
        {}
      );
      return notifications.body.notifications;
    } catch (error) {
      return handleApiError(
        error,
        "NOTIFICATION_RETRIEVAL_ERROR",
        "There was an error fetching data for the users notifications."
      );
    }
  }

  /**
   * Dismisses specific user notifications
   * Throws an exception if the API throws an exception
   * @param {string} userEmail the user's email used as UserId
   * @param {string} notificationId to find the specific notification to dismiss
   * @return a list of current User Notifications
   */
  async dismissUserNotifications(
    userEmail: string,
    notificationId: string
  ): Promise<NotificationType[]> {
    // check for correct params
    if (!userEmail) {
      console.log("user Email was not specified for notification API call");
      throw new Error("user Email was not specified for notification API call");
    }
    if (!notificationId) {
      console.log(
        "notification Id was not specified for notification API call"
      );
      throw new Error(
        "notification Id  was not specified for notification API call"
      );
    }

    // try to dismiss the notication
    try {
      return await API.patch(
        "oneMacAPI",
        `/dismissNotification/${userEmail}/${notificationId}`,
        {}
      );
    } catch (error) {
      return handleApiError(
        error,
        "NOTIFICATION_DISSMISS_ERROR",
        "There was an error dismissing the users notifications."
      );
    }
  }
}
const instance = new NotificationApi();
if (process.env.NODE_ENV !== "test") Object.freeze(instance);

export default instance;
