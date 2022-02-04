import { USER_TYPE } from "cmscommonlib";
import { API } from "aws-amplify";

import { UserRecord } from "../domain-types";
import handleApiError from "../libs/apiErrorHandler";

export const getAdminTypeByRole = (role: string): string | undefined => {
  switch (role) {
    case USER_TYPE.STATE_SYSTEM_ADMIN:
      return USER_TYPE.STATE_SUBMITTER;
    case USER_TYPE.CMS_ROLE_APPROVER:
      return USER_TYPE.STATE_SYSTEM_ADMIN;
    case USER_TYPE.SYSTEM_ADMIN:
      return USER_TYPE.CMS_ROLE_APPROVER;
    default:
      return undefined;
  }
};

/**
 * Singleton class to perform operations with the user tables backend.
 */
class UserDataApi {
  /**
   * Fetch the list of users appropriate for this User
   * @return a list of users
   */
  async getMyUserList(userEmail: string): Promise<any[]> {
    if (!userEmail) return [];

    try {
      return await API.get(
        "oneMacAPI",
        `/getMyUserList?email=${userEmail}`,
        undefined
      );
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
      return await API.get(
        "oneMacAPI",
        `/getUser?email=${userEmail}`,
        undefined
      );
    } catch (error) {
      return handleApiError(
        error,
        "FETCH_ERROR",
        "There was an error fetching data for the user."
      );
    }
  }

  /**
   * Create or update a user's profile
   * @param userRecord to create or update in Dynamo
   * @return errorCode An error code, or nothing at all if it succeeds
   */
  async updateUser(userRecord: Partial<UserRecord>): Promise<string> {
    try {
      return await API.put("oneMacAPI", "/putUser", {
        body: { ...userRecord, isPutUser: true },
      });
    } catch (error) {
      return handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "There was an error submitting data for the user."
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

  /**
   * Tell the back end to update the status of a given user
   * Throws an exception if the API throws an exception
   * @param updateRequest
   * @return errorCode
   */
  async setUserStatus(updateStatusRequest: any): Promise<string> {
    if (!updateStatusRequest) {
      throw new Error("setUserStatus API call required parameters missing");
    }

    try {
      return await API.put("oneMacAPI", "/putUser", {
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
    role: USER_TYPE,
    territories?: string[]
  ): Promise<string> {
    try {
      return await API.post("oneMacAPI", "/requestAccess", {
        body: { email, role, territories },
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
      throw new Error("setUserStatus API call required parameters missing");
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
      return await API.get(
        "oneMacAPI",
        `/getMyApprovers?role=${role}&territory=${territory}`,
        undefined
      );
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
