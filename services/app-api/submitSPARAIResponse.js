import { DateTime } from "luxon";
import * as uuid from "uuid";

import { latestAccessStatus, USER_STATUS, USER_TYPE } from "cmscommonlib";

import { validateSubmission } from "./changeRequest/changeRequest-util";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "cmscommonlib";
import getUser from "./utils/getUser";
import SPARAIResponse from "./changeRequest/SPARAIResponse.js";

/**
 * Submission states for the change requests.
 */
const SUBMISSION_STATES = {
  CREATED: "created", // Change request is in process
  SUBMITTED: "submitted", // Email sent to CMS
};

/**
 * Submit a new record for storage.
 */
export const main = handler(async (event) => {
  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }
  const data = JSON.parse(event.body);

  // Add required data to the record before storing.
  data.id = uuid.v1();
  data.createdAt = Date.now();
  data.state = SUBMISSION_STATES.CREATED;

  //Normalize the user data.
  data.user = {
    id: event.requestContext.identity.cognitoIdentityId,
    authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
    email: data.user.signInUserSession.idToken.payload.email,
    firstName: data.user.signInUserSession.idToken.payload.given_name,
    lastName: data.user.signInUserSession.idToken.payload.family_name,
  };
  data.userId = event.requestContext.identity.cognitoIdentityId;

  // do a pre-check for things that should stop us immediately
  if (validateSubmission(data)) {
    return RESPONSE_CODE.VALIDATION_ERROR;
  }

  try {
    // get the rest of the details about the current user
    const doneBy = await getUser(data.user.email);
    console.log("done by: ", doneBy);
    if (!doneBy) {
      return RESPONSE_CODE.USER_NOT_FOUND;
    }

    if (
      (doneBy.type != USER_TYPE.STATE_SUBMITTER ||
        doneBy.type != USER_TYPE.STATE_ADMIN) &&
      latestAccessStatus(doneBy, data.territory) !== USER_STATUS.ACTIVE
    ) {
      return RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }
  } catch (error) {
    throw error;
  }
  // put these here for now for backwards compatibility
  data.state = SUBMISSION_STATES.SUBMITTED;
  data.submittedAt = Date.now();

  try {
    // check for submission-specific validation (uses database)
    const validationResponse = await SPARAIResponse.fieldsValid(data);
    console.log("validation Response: ", validationResponse);

    if (validationResponse.areFieldsValid === false) {
      console.log("Message from fieldsValid: ", validationResponse);
      return validationResponse.whyNot;
    }
  } catch (error) {
    console.log("Error is: ", error);
    throw error;
  }

  // Now send the CMS email
  await sendEmail(SPARAIResponse.getCMSEmail(data));

  //We successfully sent the submission email.  Update the record to reflect that.
  data.state = SUBMISSION_STATES.SUBMITTED;
  data.submittedAt = Date.now();

  // record the current end timestamp (can be start/stopped/changed)
  // 90 days is current CMS review period and it is based on CMS time!!
  // UTC is 4-5 hours ahead, convert first to get the correct start day
  // AND use plus days function b/c DST days are 23 or 25 hours!!
  data.ninetyDayClockEnd = DateTime.fromMillis(data.submittedAt)
    .setZone("America/New_York")
    .plus({ days: 90 })
    .toMillis();

  //An error sending the state submitter email is not a failure.
  try {
    // send the submission "reciept" to the State Submitter
    await sendEmail(SPARAIResponse.getStateEmail(data));
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user acknowledgement email.",
      error
    );
  }

  try {
    let submitterName = data.user.firstName + " " + data.user.lastName;
    let updateData = {
      packageID: data.transmittalNumber,
      packageStatus: "RAI Response Submitted",
      timestamp: data.submittedAt,
      raiResponseSubmissionDate: data.submittedAt,
      raiResponseAttachments: data.uploads,
      raiResponseAdditionalInformation: data.summary,
      raiResponseSubmitterName: submitterName,
      raiResponseSubmitterEmail: data.user.email,
      lastModifiedByName: submitterName,
      lastModifiedByEmail: data.user.email,
    };

    // get the latest version from current v0 Item
    var v0sk = "v0#" + updateData.packageID;
    var v0pk = updateData.packageID.toString().substring(0, 2);
    var oldVersion;
    var newVersion;
    var nextItem = {};

    var v0params = {
      TableName: process.env.oneMacTableName,
      Key: {
        pk: v0pk,
        sk: v0sk,
      },
    };

    dynamoDb
      .get(v0params)
      .then((currentPackage) => {
        if (!currentPackage.Item) {
          throw new Error(
            `v0 Item does not exist for params: ${JSON.stringify(v0params)}`
          );
        }
        // copy the v0 into the v(currentVersion+1)
        console.log("Result.Item is : ", currentPackage.Item);

        oldVersion = parseInt(currentPackage.Item.currentVersion);
        newVersion = oldVersion + 1;

        nextItem = { ...currentPackage.Item };

        nextItem.sk = "v" + newVersion + "#" + currentPackage.Item.packageID;
        delete nextItem["currentVersion"];
        delete nextItem["GSI1pk"];
        delete nextItem["GSI1sk"];

        var vnextparams = {
          TableName: process.env.oneMacTableName,
          Item: nextItem,
        };
        console.log("vnextParams is: ", vnextparams);

        dynamoDb.put(vnextparams);
      })
      .then(() => {
        let updateExp = "SET #currentVersion = :newVersion";
        let expressionAttributeNames = {
          "#currentVersion": "currentVersion",
        };
        let expressionAttributeValues = {
          ":newVersion": newVersion.toString(),
          ":currentVersion": oldVersion.toString(),
        };

        // go through and make our updates... if the attribute already exists, overwrite
        // if it does not, then add
        for (const [key, value] of Object.entries(updateData)) {
          if (key === "packageID") continue;
          updateExp += ",#" + key + " = :" + key;
          expressionAttributeNames["#" + key] = key.toString();
          if (key === "timestamp") expressionAttributeValues[":" + key] = value;
          else expressionAttributeValues[":" + key] = value.toString();
        }

        let updateParams = {
          TableName: process.env.oneMacTableName,
          Key: {
            pk: v0pk,
            sk: v0sk,
          },
          ConditionExpression: "#currentVersion = :currentVersion",
          UpdateExpression: updateExp,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
        };

        console.log(
          "update Parameters: ",
          JSON.stringify(updateParams, null, 2)
        );

        return dynamoDb.update(updateParams);
      })
      .then((updateResult) => {
        console.log("updateResult is: ", updateResult);
      })
      .catch((dbError) => {
        console.log(
          `Error happened while reading from DB:  ${dbError.message}`
        );
        throw dbError;
      });
  } catch (error) {
    console.log("Error is: ", error.message);
    throw error;
  }

  console.log("Successfully submitted the following:", data);

  return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
});
