import { API } from "aws-amplify";

/**
 * Singleton class to perform operations with the user tables backend.
 */
class UserDataApi {
  /**
   * Fetch a specific record from the backend.
   * @return {Array} a list of change requests
   */
  async getUserData() {
    try {
      return await API.get("userDataAPI", `/getUser`);
    } catch (error) {
      console.log(`There was an error fetching data for the user.`, error);
      throw error;
    }
  }

  /**
   * Fetch the list of users appropriate for this User
   * @return {Array} a list of users
   */
   async getMyUserList(userEmail) {
    try {
      return await API.get("userDataAPI", `/getMyUserList?email=${userEmail}`);
    } catch (error) {
      console.log(`There was an error fetching data for the user.`, error);
      throw error;
    }
  }

  /**
   * Check to see if an user exists in the back end
   * @param {string} id the ID to check
   * @return {Boolean} true if the user  exists in the back end
   */
  async userProfile(userEmail) {
    if (!userEmail) {
      console.log("user Email was not specified for userProfile API call");
      throw new Error("user Email was not specified for userProfile API call");
    }

    try {
      let answer = await API.get(
        "userDataAPI",
        `/getUser?email=${userEmail}`
      );
      return answer;
    } catch (error) {
      console.log(`There was an error checking user ${userEmail}.`, error);
      throw error;
    }
  }
}

const instance = new UserDataApi();
Object.freeze(instance);

export default instance;
