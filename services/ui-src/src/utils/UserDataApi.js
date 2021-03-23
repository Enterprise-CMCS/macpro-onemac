import { API } from "aws-amplify";

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

  /**
   * Tell the back end to update the status of a given user
   * Throws an exception if the API throws an exception
   * @param {string} doneBy email of the user making the change
   * @param {string} userEmail email of the user to be updated
   * @param {string} newStatus the new status for the user
   * @return {string} the response code
   */
   async setUserStatus(doneBy, userEmail, newStatus) {
    if (!doneBy || !userEmail || !newStatus) {
      console.log("setUserStatus called without neccessary params ", doneBy, userEmail, newStatus);
      throw new Error("setUserStatus API call required parameters missing");
    }

    console.log("setUserStatus called! ", doneBy, userEmail, newStatus);
   /* try {
      let answer = await API.post(
        "userDataAPI",
        "/setUserStatus", { body: { "doneBy": doneBy, 
        "userEmail": userEmail,
        "status": newStatus }});
      return answer;
    } catch (error) {
      console.log(`There was an error checking user ${userEmail}.`, error);
      throw error;
    }
    */
  }

}

const instance = new UserDataApi();
Object.freeze(instance);

export default instance;
