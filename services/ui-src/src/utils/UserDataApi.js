import { API } from "aws-amplify";
import { USER_TYPE } from "cmscommonlib";

export const getAdminTypeByRole = (role) => {
  switch (role) {
    case USER_TYPE.STATE_ADMIN:
      return USER_TYPE.STATE_SUBMITTER;
    case USER_TYPE.CMS_APPROVER:
      return USER_TYPE.STATE_ADMIN;
    case USER_TYPE.SYSTEM_ADMIN:
      return USER_TYPE.CMS_APPROVER;
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
   * @return {Array} a list of users
   */
  async getMyUserList(userEmail) {
    if (!userEmail) return [];

    try {
      return await API.get("userDataAPI", `/getMyUserList?email=${userEmail}`);
    } catch (error) {
      console.log(`There was an error fetching data for the user.`, error);
      throw error;
    }
  }

  /**
   * Get the User details for a given email address
   * Throws an exception if the API throws an exception
   * @param {string} userEmail the ID to check
   * @return {Object} the returned user item
   */
  async userProfile(userEmail) {
    if (!userEmail) {
      console.log("user Email was not specified for userProfile API call");
      throw new Error("user Email was not specified for userProfile API call");
    }

    try {
      let answer = await API.get("userDataAPI", `/getUser?email=${userEmail}`);
      return answer;
    } catch (error) {
      console.log(`There was an error checking user ${userEmail}.`, error);
      throw error;
    }
  }

  /**
   * Create or update a user's profile
   * @param {Object} User record to create or update in Dynamo
   * @return {Promise<string>} An error code, or nothing at all if it succeeds
   */
  async updateUser(userRecord) {
    try {
      return await API.put("changeRequestAPI", "/putUser", {
        body: { ...userRecord, isPutUser: true },
      });
    } catch (error) {
      console.error("Could not save user profile data:", error);
      throw error;
    }
  }

  /**
   * Update a user's phone number
   * @param {string} User ID to update
   * @param {string} Updated phone number
   * @return {Promise<string>} An error code, or nothing at all if it succeeds
   */
  async updatePhoneNumber(id, phoneNumber) {
    try {
      return await API.put("changeRequestAPI", "/phoneNumber", {
        body: { id, phoneNumber },
      });
    } catch (error) {
      console.error("Could not save user phone number:", error);
      throw error;
    }
  }

  /**
   * Tell the back end to update the status of a given user
   * Throws an exception if the API throws an exception
   * @param {string} doneBy email of the user making the change
   * @param {string} userEmail email of the user to be updated
   * @param {string} newStatus the new status for the user
   * @return {string} the response code
   */
  async setUserStatus(updateStatusRequest) {
    if (!updateStatusRequest) {
      throw new Error("setUserStatus API call required parameters missing");
    }

    try {
      return await API.put("changeRequestAPI", "/putUser", {
        body: updateStatusRequest,
      });
    } catch (error) {
      console.error("Could not update user profile data:", error);
      throw error;
    }
  }

  /**
   * Get all active state system administrators' contact info for a list of states.
   */
  async getStateAdmins(states) {
    const params = new URLSearchParams();
    for (const state of states) {
      params.append("state", state);
    }
    return await API.get("userDataAPI", `/getStateAdmins?${params.toString()}`);
  }

  /**
   * Get all active CMS role approvers' contact info.
   */
  async getCmsApprovers() {
    return await API.get("userDataAPI", "/getCmsApprovers");
  }

  /**
   * Get all active CMS system admins' contact info.
   */
  async getCmsSystemAdmins() {
    return await API.get("userDataAPI", "/getCmsSystemAdmins");
  }
}

const instance = new UserDataApi();
Object.freeze(instance);

export default instance;
