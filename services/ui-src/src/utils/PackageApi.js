import { API } from "aws-amplify";
import handleApiError from "../libs/apiErrorHandler";
/**
 * Singleton class to perform operations with the change request backend.
 */
class PackageApi {
  /**
   * Fetch all packages that correspond to the user's active access to states/territories
   * @param {string} email the user's email
   * @return {Promise<Array>} a list of change requests
   */
  async getMyPackages(userEmail) {
    if (!userEmail) return [];

    try {
      return await API.get(
        "changeRequestAPI",
        `/getMyPackages?email=${userEmail}`
      );
    } catch (error) {
      handleApiError(
        error,
        "FETCH_ERROR",
        `There was an error fetching the states/territories for ${userEmail}.`
      );
    }
  }

  /**
   * Set a package's status to Withdrawn
   * @param {string} ID the package ID
   * @return {Promise<string>} the response code
   */
  async withdraw(submitterName, submitterEmail, packageId) {
    try {
      return await API.post("changeRequestAPI", `/withdraw`, {
        body: {
          packageId,
          submitterEmail,
          submitterName,
        },
      });
    } catch (err) {
      handleApiError(
        err,
        "FETCH_ERROR",
        `There was an error updating the status of package ${packageId}.`
      );
    }
  }
}

const instance = new PackageApi();
Object.freeze(instance);

export default instance;
