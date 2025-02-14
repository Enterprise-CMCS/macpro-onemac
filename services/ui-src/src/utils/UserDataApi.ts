import { USER_ROLE } from "cmscommonlib";
import { API, Auth } from "aws-amplify";

import { UserRecord } from "../domain-types";
import handleApiError from "../libs/apiErrorHandler";

/**
 * Singleton class to perform operations with the user tables backend.
 */
class UserDataApi {
  private async getIdToken(): Promise<string> {
    try {
      const session = await Auth.currentSession(); // Get current session
      const idToken = session.getIdToken().getJwtToken(); // Get the idToken
      return idToken;
    } catch (error) {
      console.error("Error retrieving idToken:", error);
      throw new Error("Failed to retrieve idToken");
    }
  }

  /**
   * Fetch the list of users appropriate for this User
   * @return a list of users
   */
  async getMyUserList(userEmail: string): Promise<any[]> {
    if (!userEmail) return [];

    try {
      return await API.get("oneMacAPI", `/getMyUserList`, {
        queryStringParameters: { email: userEmail },
      });
    } catch (error) {
      return handleApiError(
        error,
        "DASHBOARD_RETRIEVAL_ERROR",
        "There was an error fetching data for the user."
      );
    }
  }

  /**
   * Get the User details for a given email address
   * Throws an exception if the API throws an exception
   * @param userEmail the ID to check
   * @return the returned user item
   */
  async userProfile(userEmail: string): Promise<UserRecord> {
    if (!userEmail) {
      console.log("user Email was not specified for userProfile API call");
      throw new Error("user Email was not specified for userProfile API call");
    }

    try {
      const idToken = await this.getIdToken();
      return await API.post("oneMacAPI", `/getUserProfileInfo`, {
        queryStringParameters: { email: userEmail },
        body: {idToken: idToken}
      });
    } catch (error) {
      return handleApiError(
        error,
        "FETCH_ERROR",
        "There was an error fetching data for the user."
      );
    }
  }

  /**
   * Update a user's phone number
   * @param userId to update
   * @param phoneNumber
   * @return errorCode or nothing at all if it succeeds
   */
  async updatePhoneNumber(id: string, phoneNumber: string): Promise<string> {
    try {
      return await API.put("oneMacAPI", "/phoneNumber", {
        body: { id, phoneNumber },
      });
    } catch (error) {
      return handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "Could not save user phone number."
      );
    }
  }

  async setContactInfo(contactInfo: any): Promise<string> {
    try {
      return await API.put("oneMacAPI", "/contactInfo", {
        body: contactInfo,
      });
    } catch (error) {
      return handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "There was an error changing the user status."
      );
    }
  }

  async requestAccess(
    email: string,
    role: USER_ROLE,
    territories?: string[],
    division?: number,
    group?: number
  ): Promise<string> {
    try {
      return await API.post("oneMacAPI", "/requestAccess", {
        body: { email, role, territories, division, group },
      });
    } catch (error) {
      return handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "There was an error changing the user status."
      );
    }
  }

  async updateUserStatus(updateStatusRequest: any): Promise<string> {
    if (!updateStatusRequest) {
      throw new Error(
        "updateStatusRequest API call required parameters missing"
      );
    }

    try {
      return await API.post("oneMacAPI", "/updateUserStatus", {
        body: updateStatusRequest,
      });
    } catch (error) {
      return handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "There was an error changing the user status."
      );
    }
  }

  /**
   * Get the Approver List for a given role and territory
   * Throws an exception if the API throws an exception
   * @param role the role of the user
   * @param territory the territory for the approvers
   * @return the returned user item
   */
  async getMyApprovers(role: string, territory: string): Promise<any[]> {
    if (!role) {
      console.log("role needed to find approvers");
      throw new Error("user role was not specified for userProfile API call");
    }

    try {
      return await API.get("oneMacAPI", `/getMyApprovers`, {
        queryStringParameters: { role, territory },
      });
    } catch (error) {
      return handleApiError(
        error,
        "FETCH_ERROR",
        "There was an error fetching approvers for the user."
      );
    }
  }
}
const instance = new UserDataApi();
if (process.env.NODE_ENV !== "test") Object.freeze(instance);

export default instance;
