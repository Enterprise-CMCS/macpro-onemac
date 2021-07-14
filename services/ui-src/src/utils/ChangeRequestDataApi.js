import { API } from "aws-amplify";
import { Auth } from "aws-amplify";

/**
 * Singleton class to perform operations with the change request backend.
 */
class ChangeRequestDataApi {
  /**
   * Submit a change request to be saved by the backend.
   * @param {Object} data the change request data
   * @param {Array} uploadsList an array with the information on the already uploaded files
   * @returns the submitted change request
   */
  async submit(data, uploadsList) {
    if (!data || !uploadsList || !data.type || uploadsList.length === 0) {
      console.log(
        "Unable to submit data due to missing fields, invalid format of fields,  or uploads.",
        data,
        uploadsList
      );
      throw new Error("Missing required data or uploads");
    }
    try {
      data.user = await Auth.currentAuthenticatedUser();
      data.uploads = uploadsList;

      console.log("DEBUG:(" + JSON.stringify(data) + "):");
      return await API.post("changeRequestAPI", "/submit", {
        body: data,
      });
    } catch (error) {
      console.log("Error while submitting the form.", error);
      throw error;
    }
  }

  /**
   * Fetch a specific record from the backend.
   * @param {string} id the ID of the change request to fetch
   * * @param {string} userId the ID of the submitter that created the change request
   * @return {Object} a change request
   */
  async get(id, userId) {
    if (!id || !userId) {
      console.log("ID or user ID was not specified for get API call");
      throw new Error("ID or user ID was not specified for get API call");
    }

    try {
      let changeRequest = await API.get(
        "changeRequestAPI",
        `/get/${id}/${userId}`
      );
      return changeRequest;
    } catch (error) {
      console.log(`There was an error fetching ID ${id}.`, error);
      throw error;
    }
  }

  /**
   * Check to see if an id exists in the back end
   * @param {string} id the ID to check
   * @return {Boolean} true if the ID exists in the back end
   */
  async packageExists(id) {
    if (!id) {
      console.log("ID was not specified for packageExists API call");
      throw new Error("ID was not specified for packageExists API call");
    }

    try {
      let answer = await API.get("changeRequestAPI", `/package-exists/${id}`);

      return answer;
    } catch (error) {
      console.log(`There was an error checking ID ${id}.`, error);
      throw error;
    }
  }

  /**
   * Fetch all change requests that correspond to the user's active access to states/territories
   * @param {string} email the user's email
   * @return {Promise<Array>} a list of change requests
   */
  async getAllByAuthorizedTerritories(userEmail) {
    if (!userEmail) return [];

    try {
      return await API.get(
        "changeRequestAPI",
        `/getAllByAuthorizedTerritories?email=${userEmail}`
      );
    } catch (error) {
      console.log(
        `There was an error fetching change requests for the states/territories.`,
        error
      );
      throw error;
    }
  }

  /**
   * Fetch a specific record from the backend.
   * @return {Array} a list of change requests
   */
  async listAll() {
    try {
      return await API.get("changeRequestAPI", `/listall`);
    } catch (error) {
      console.log(`There was an error fetching all change requests`, error);
      throw error;
    }
  }
}

const instance = new ChangeRequestDataApi();
Object.freeze(instance);

export default instance;
