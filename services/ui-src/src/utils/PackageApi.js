import { API, Auth } from "aws-amplify";
import { Workflow } from "cmscommonlib";
import handleApiError from "../libs/apiErrorHandler";

const SUBMIT_API_CALL = {
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: "submitCHIPSPA",
  [Workflow.ONEMAC_TYPE.CHIP_SPA_RAI]: "submitCHIPSPARAIResponse",
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]: "submitMedicaidSPA",
  [Workflow.ONEMAC_TYPE.SPA_RAI]: "submitSPARAIResponse",
  [Workflow.ONEMAC_TYPE.WAIVER_BASE]: "submitBaseWaiver",
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: "submitWaiverRenewal",
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K]: "submitAppendixKAmendment",
  [Workflow.ONEMAC_TYPE.WAIVER_EXTENSION]: "submitWaiverExtension",
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]: "submitWaiverAmendment",
  [Workflow.ONEMAC_TYPE.WAIVER_RAI]: "submitWaiverRAIResponse",
};

const WITHDRAW_API_CALL = {
  [Workflow.ONEMAC_TYPE.CHIP_SPA]: "withdrawCHIPSPA",
  [Workflow.ONEMAC_TYPE.CHIP_SPA_RAI]: "withdrawCHIPSPARAIResponse",
  [Workflow.ONEMAC_TYPE.MEDICAID_SPA]: "withdrawMedicaidSPA",
  [Workflow.ONEMAC_TYPE.SPA_RAI]: "withdrawSPARAIResponse",
  [Workflow.ONEMAC_TYPE.WAIVER_BASE]: "withdrawBaseWaiver",
  [Workflow.ONEMAC_TYPE.WAIVER_RENEWAL]: "withdrawWaiverRenewal",
  [Workflow.ONEMAC_TYPE.WAIVER_APP_K]: "withdrawAppendixKAmendment",
  [Workflow.ONEMAC_TYPE.WAIVER_EXTENSION]: "withdrawWaiverTemporaryExtension",
  [Workflow.ONEMAC_TYPE.WAIVER_AMENDMENT]: "withdrawWaiverAmendment",
  [Workflow.ONEMAC_TYPE.WAIVER_RAI]: "withdrawWaiverRAIResponse",
};
/**
 * Singleton class to perform operations with the change request backend.
 */
class PackageApi {
  /**
   * Submit a change request to be saved by the backend.
   * @param {Object} data the change request data
   * @param {Array} uploadsList an array with the information on the already uploaded files
   * @returns the submitted change request
   */
  async submitToAPI(data, uploadsList) {
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
      data.uploads = uploadsList;
    } catch (error) {
      handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "Error while submitting the form."
      );
    }

    if (
      !data ||
      !uploadsList ||
      !data.type ||
      uploadsList.length === 0 ||
      !data.submitterEmail
    ) {
      console.log(
        "Unable to submit data due to missing fields, invalid format of fields,  or uploads.",
        data,
        uploadsList
      );
      throw new Error("Missing required data or uploads");
    }
    console.log("componentType: ", data.type);
    console.log("posting to: ", SUBMIT_API_CALL[data.type]);
    try {
      return await API.post("oneMacAPI", `/${SUBMIT_API_CALL[data.type]}`, {
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
   * Set a component's status to Withdrawn
   * @param {string} componentId the component to be withdrawn
   * @return {Promise<string>} the response code
   */
  async withdraw(changedByName, changedByEmail, componentId, componentType) {
    try {
      console.log("posting to: ", WITHDRAW_API_CALL[componentType]);

      return await API.post(
        "oneMacAPI",
        `/${WITHDRAW_API_CALL[componentType]}`,
        {
          body: {
            componentId,
            componentType,
            changedByEmail,
            changedByName,
          },
        }
      );
    } catch (err) {
      handleApiError(
        err,
        "FETCH_ERROR",
        `There was an error withdrawing package ${componentId}.`
      );
    }
  }
}

const instance = new PackageApi();
Object.freeze(instance);

export default instance;
