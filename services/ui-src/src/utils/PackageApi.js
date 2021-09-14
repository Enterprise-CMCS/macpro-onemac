import { API, Storage } from "aws-amplify";
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
  async getDetail(componentId, componentType, componentTimestamp) {
    if (!componentId) {
      console.log("ID  was not specified for get API call");
      throw new Error("ID was not specified for get API call");
    }

    try {
      console.log(
        `/getDetail/${componentId}?cType=${componentType}#${componentTimestamp}`
      );
      let packageData = await API.get(
        "oneMacAPI",
        `/getDetail/${componentId}?cType=${componentType}&cNum=${componentTimestamp}`
      );
      if (packageData.attachments) {
        let i;
        // Use a for loop instead of forEach to stay in the context of this async function.
        for (i = 0; i < packageData.attachments.length; i++) {
          var fromStorage = await Storage.get(
            packageData.attachments[i].s3Key,
            {
              level: "protected",
              identityId: packageData.submitterId, // the identityId of that user
            }
          );
          packageData.attachments[i].url = fromStorage.split("?", 1)[0];
        }
      }
      return packageData;
    } catch (error) {
      handleApiError(
        error,
        "SUBMISSION_FETCH_ERROR",
        `There was an error fetching ID ${componentId}.`
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
      return await API.get("oneMacAPI", `/getMyPackages?email=${userEmail}`);
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
  async withdraw(submitterName, submitterEmail, componentId, componentType) {
    try {
      return await API.post("oneMacAPI", `/withdraw`, {
        body: {
          componentId,
          componentType,
          submitterEmail,
          submitterName,
        },
      });
    } catch (err) {
      handleApiError(
        err,
        "FETCH_ERROR",
        `There was an error updating the status of package ${componentId}.`
      );
    }
  }
}

const instance = new PackageApi();
Object.freeze(instance);

export default instance;
