import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import { Storage } from "aws-amplify";

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

      console.log(JSON.stringify(data))
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
   * @return {Object} a change request
   */
  async get(id) {
    if (!id) {
      console.log("ID was not specified for get API call");
      throw new Error("ID was not specified for get API call");
    }

    try {
      let changeRequest = await API.get("changeRequestAPI", `/get/${id}`);
      // Get temporary URLs to the S3 bucket
      if (changeRequest.uploads) {
        let i;
        // Use a for loop instead of forEach to stay in the context of this async function.
        for (i = 0; i < changeRequest.uploads.length; i++) {
          changeRequest.uploads[i].url = await Storage.vault.get(
            changeRequest.uploads[i].s3Key,
            { level: "protected" }
          );
        }
      }
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
   * Fetch a specific record from the backend.
   * @return {Promise<Array>} a list of change requests
   */
  async getAll() {
    try {
      return await API.get("changeRequestAPI", `/get`);
    } catch (error) {
      console.log(
        `There was an error fetching all change requests for the user.`,
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
