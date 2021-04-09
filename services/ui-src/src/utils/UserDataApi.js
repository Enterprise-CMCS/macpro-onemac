import { API } from "aws-amplify";
import Joi from '@hapi/joi';
import {USER_STATUS, USER_TYPE} from "cmscommonlib";
import {territoryCodeList} from "cmscommonlib";
import {RESPONSE_CODE} from "cmscommonlib";
import {isEmpty} from "@aws-amplify/core";

export const getAdminTypeByRole = role => {
    switch (role) {
        case USER_TYPE.STATE_ADMIN:
            return USER_TYPE.STATE_USER;
        case USER_TYPE.CMS_APPROVER:
            return USER_TYPE.STATE_ADMIN;
        case USER_TYPE.SYSTEM_ADMIN:
            return USER_TYPE.CMS_APPROVER;
        default:
            return undefined;
    }
}

export const validateInput = input => {
    console.log("DEBUG VALIDATE:", input)
    const userSchema = Joi.object().keys({
        userEmail: Joi.string().email().required(),
        doneBy: Joi.string().email().required(),
        attributes: Joi.array()
            // When type is state then state attribute is required and must be valid //
            .when('type', {
                is: Joi.string().valid(USER_TYPE.STATE_USER, USER_TYPE.STATE_ADMIN),
                then: Joi.array().items(Joi.object({
                    stateCode: Joi.string().valid(...territoryCodeList).required(),
                    status: Joi.string().valid(USER_STATUS.PENDING, USER_STATUS.DENIED, USER_STATUS.REVOKED, USER_STATUS.ACTIVE).required(),
                })),
                otherwise: Joi.array().items(Joi.object({
                    status: Joi.string().valid(USER_STATUS.PENDING, USER_STATUS.DENIED, USER_STATUS.REVOKED, USER_STATUS.ACTIVE).required(),
                    stateCode: Joi.string().optional()
                })),
            }),
        isPutUser: Joi.boolean().optional(),
        // if isPutUser is true then first and last names and type are required //
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        type: Joi.valid(USER_TYPE.STATE_USER, USER_TYPE.STATE_ADMIN, USER_TYPE.CMS_APPROVER, USER_TYPE.SYSTEM_ADMIN).required()
    });
    //Todo: Add deeper validation for types //
    const result = isEmpty(input) ? { error: 'Lambda body is missing' } : userSchema.validate(input);

    if (result.error) {
        console.log('Validation error:', result.error);
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    return;
};

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
   * Create or update a user's profile
   * @param {Object} User record to create or update in Dynamo
   * @return {Promise<string>} An error code, or nothing at all if it succeeds
   */
 async updateUser(userRecord) {
  try {
    return await API.put("changeRequestAPI", "/putUser", {
      body: userRecord,
    });
  } catch (error) {
    console.error("Could not save user profile data:", error);
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
   async setUserStatus(updateStatusRequest) {

      if (!updateStatusRequest ) {
      throw new Error("setUserStatus API call required parameters missing");
    }

    try {
          return await API.put("changeRequestAPI", "/putUser", {
              body: updateStatusRequest,
          });
    } catch (error) {
          console.error("Could not update user profile data:", error);
          throw error;
    }
  }

}

const instance = new UserDataApi();
Object.freeze(instance);

export default instance;
