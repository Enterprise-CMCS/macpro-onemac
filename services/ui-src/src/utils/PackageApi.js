import { API } from "aws-amplify";
import handleApiError from "../libs/apiErrorHandler";
/**
 * Singleton class to perform operations with the change request backend.
 */
class PackageApi {
  /**
   * Fetch a specific package from the backend.
   * @param {string} id the ID of the package to fetch
   * @return {Object} a change request
   */
  async getPackage(id) {
    if (!id) {
      console.log("ID  was not specified for get API call");
      throw new Error("ID was not specified for get API call");
    }

    try {
      let packageData = await API.get("changeRequestAPI", `/getPackage/${id}`);
      if (packageData.uploads) {
        let i;
        // Use a for loop instead of forEach to stay in the context of this async function.
        for (i = 0; i < packageData.uploads.length; i++) {
          var fromStorage = await Storage.get(packageData.uploads[i].s3Key, {
            level: "protected",
            identityId: packageData.user.userId, // the identityId of that user
          });
          packageData.uploads[i].url = fromStorage.split("?", 1)[0];
        }
      }
      return packageData;
    } catch (error) {
      handleApiError(
        error,
        "SUBMISSION_FETCH_ERROR",
        `There was an error fetching ID ${id}.`
      );
    }
  }

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
