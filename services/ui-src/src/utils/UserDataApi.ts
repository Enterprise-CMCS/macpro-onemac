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

  /**
   * Get all active state system administrators' contact info for a list of states.
   */
  async getStateSystemAdmins(states: string[]): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      for (const state of states) {
        params.append("state", state);
      }
      return await API.get(
        "oneMacAPI",
        `/getStateSystemAdmins?${params.toString()}`,
        undefined
      );
    } catch (error) {
      return handleApiError(
        error,
        "FETCH_ERROR",
        "There was an error fetching the state system admins."
      );
    }
  }

  /**
   * Get all active CMS role approvers' contact info.
   */
  async getCmsRoleApprovers(): Promise<any[]> {
    try {
      return await API.get("oneMacAPI", "/getCmsRoleApprovers", undefined);
    } catch (error) {
      return handleApiError(
        error,
        "FETCH_ERROR",
        "There was an error fetching the CMS role approvers."
      );
    }
  }

  /**
   * Get all active CMS system admins' contact info.
   */
  async getCmsSystemAdmins(): Promise<any[]> {
    try {
      return await API.get("oneMacAPI", "/getCmsSystemAdmins", undefined);
    } catch (error) {
      return handleApiError(
        error,
        "FETCH_ERROR",
        "There was an error fetching the CMS admins."
      );
    }
  }
}

const instance = new UserDataApi();
if (process.env.NODE_ENV !== "test") Object.freeze(instance);

export default instance;
