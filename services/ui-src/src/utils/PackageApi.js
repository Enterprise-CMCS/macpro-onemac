import { API, Auth } from "aws-amplify";
import { Workflow } from "cmscommonlib";
import handleApiError from "../libs/apiErrorHandler";

const SUBMIT_API_CALL = {
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: "submitCHIPSPA",
  [Workflow.ONEMAC_TYPE.CHIP_SPA_RAI]: "submitCHIPSPARAIResponse",
  [Workflow.ONEMAC_TYPE.CHIP_SPA_WITHDRAW]: "withdrawCHIPSPA",
  [Workflow.ONEMAC_TYPE.CHIP_SPA_SUBSEQUENT_SUBMISSION]:
    "submitChipSPASubsequent",
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]: "submitMedicaidSPA",
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA_RAI]: "submitMedicaidSPARAIResponse",
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA_WITHDRAW]: "withdrawMedicaidSPA",
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA_SUBSEQUENT_SUBMISSION]:
    "submitMedicaidSPASubsequent",
  [Workflow.ONEMAC_TYPE.WAIVER_INITIAL]: "submitInitialWaiver",
  [Workflow.ONEMAC_TYPE.WAIVER_INITIAL_WITHDRAW]: "withdrawInitialWaiver",
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: "submitWaiverRenewal",
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL_WITHDRAW]: "withdrawWaiverRenewal",
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K_WITHDRAW]: "withdrawWaiverAppendixK",
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K]: "submitWaiverAppendixK",
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K_RAI]: "submitWaiverAppendixKRAIResponse",
  [Workflow.ONEMAC_TYPE.WAIVER_EXTENSION]: "submitWaiverExtension",
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]: "submitWaiverAmendment",
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT_WITHDRAW]: "withdrawWaiverAmendment",
  [Workflow.ONEMAC_TYPE.WAIVER_RAI]: "submitWaiverRAIResponse",
  [Workflow.ONEMAC_TYPE.ENABLE_RAI_WITHDRAW]: "enableRaiWithdraw",
  [Workflow.ONEMAC_TYPE.RAI_RESPONSE_WITHDRAW]: "withdrawRAIResponse",
  [Workflow.ONEMAC_TYPE.WAIVER_INITIAL_SUBSEQUENT_SUBMISSION]:
    "submitInitialWaiverSubsequent",
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL_SUBSEQUENT_SUBMISSION]:
    "submitWaiverRenewalSubsequent",
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT_SUBSEQUENT_SUBMISSION]:
    "submitWaiverAmendmentSubsequent",
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K_SUBSEQUENT_SUBMISSION]:
    "submitWaiverAppKSubsequent",
};

/**
 * Singleton class to perform operations with the change request backend.
 */
class PackageApi {
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
      return await API.get("oneMacAPI", `/package-exists/${id}`);
    } catch (error) {
      handleApiError(
        error,
        "SUBMISSION_FETCH_ERROR",
        `There was an error fetching package with ID ${id}.`
      );
    }
  }

  /**
   * Submit a change request to be saved by the backend.
   * @param {Object} data the change request data
   * @param {Array} uploadsList an array with the information on the already uploaded files
   * @returns the submitted change request
   */
  async submitToAPI(data, uploadsList, componentType) {
    try {
      const userAuth = await Auth.currentAuthenticatedUser();
      data.submitterEmail =
        userAuth.signInUserSession.idToken.payload.email.toLowerCase();
      data.submitterName = [
        userAuth.signInUserSession.idToken.payload.given_name,
        userAuth.signInUserSession.idToken.payload.family_name,
      ]
        .filter(Boolean)
        .join(" ");
      data.attachments = uploadsList;
    } catch (error) {
      handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "Error while submitting the form."
      );
    }

    if (!data || !componentType || !data.submitterEmail) {
      console.log(
        "Unable to submit data due to missing fields, invalid format of fields,  or uploads.",
        data,
        uploadsList
      );
      throw new Error("Missing required data or uploads");
    }
    try {
      return await API.post("oneMacAPI", `/${SUBMIT_API_CALL[componentType]}`, {
        body: data,
      });
    } catch (error) {
      handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "Error while submitting the form."
      );
    }
  }

  /**
   * Fetch a specific package from the backend.
   * @param {string} id the ID of the package to fetch
   * @return {Promise<Object>} a change request
   */
  async getDetail(componentId, componentType, componentTimestamp) {
    if (!componentId) {
      console.log("ID  was not specified for get API call");
      throw new Error("ID was not specified for get API call");
    }

    try {
      const userAuth = await Auth.currentAuthenticatedUser();
      const userEmail = userAuth.signInUserSession.idToken.payload.email;

      let packageData = await API.get(
        "oneMacAPI",
        `/getDetail/${componentId}?cType=${componentType}&cNum=${componentTimestamp}&email=${userEmail}`
      );
      if (typeof packageData === "string") throw new Error(packageData);
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
   * @param {string} userEmail the user's email
   * @param {string} tab the package group (matches to dashboard tab) to retrieve
   * @return {Promise<Array>} a list of change requests
   */
  async getMyPackages(userEmail, tab) {
    if (!userEmail || !tab) return [];

    try {
      return await API.get(
        "oneMacAPI",
        `/getMyPackages?email=${userEmail}&group=${tab}`
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
   * Fetch all topic records that correspond to the selected topic tab
   * @param {string} topic the topic to retrieve
   * @return {Promise<Array>} a list of topic records
   */
  async getTopic(userEmail, topic) {
    if (!topic) return [];

    try {
      return await API.get(
        "oneMacAPI",
        `/getTopic?email=${userEmail}&topic=${topic}`
      );
    } catch (error) {
      handleApiError(
        error,
        "FETCH_ERROR",
        `There was an error fetching the topic items for ${topic}.`
      );
    }
  }

  /**
   * Fetch topic record by id
   * @param {string} id the id to retrieve
   * @param {string} changedDate the date of record change in seatool
   * @return {Promise<String>} a json string of a single topic record
   */
  async getTopicDetail(id, changedDate) {
    if (!id || !changedDate) return [];

    const userAuth = await Auth.currentAuthenticatedUser();
    const userEmail =
      userAuth.signInUserSession.idToken.payload.email.toLowerCase();

    try {
      return await API.get(
        "oneMacAPI",
        `/getTopicDetail?email=${userEmail}&id=${id}&changedDate=${changedDate}`
      );
    } catch (error) {
      handleApiError(
        error,
        "FETCH_ERROR",
        `There was an error fetching the topic item detail for ${id}.`
      );
    }
  }

  /**
   * Check to see if an id exists in the back end
   * @param {string} id the ID to check
   * @return {Boolean} true if the ID exists in the back end
   */
  async validateParent(id, validateParentAPI) {
    if (!id) {
      console.log("ID was not specified for validateParent API call");
      throw new Error("ID was not specified for validateParent API call");
    }

    try {
      return await API.get("oneMacAPI", `/${validateParentAPI}/${id}`);
    } catch (error) {
      handleApiError(
        error,
        "SUBMISSION_FETCH_ERROR",
        `There was an error validating parent with ID ${id}.`
      );
    }
  }
}

const instance = new PackageApi();
Object.freeze(instance);

export default instance;
