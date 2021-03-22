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
      console.log(
        `There was an error fetching data for the user.`,
        error
      );
      throw error;
    }
  }
}

const instance = new UserDataApi();
Object.freeze(instance);

export default instance;
