import Joi from "joi";
import { isEmpty, isObject } from "lodash";
import { createMachine } from "xstate";

import {
  APPROVING_USER_TYPE,
  RESPONSE_CODE,
  USER_TYPE,
  USER_STATUS,
  territoryCodeList,
  roleLabels,
} from "cmscommonlib";
import groupData from "cmscommonlib/groupDivision.json";

import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { ACCESS_CONFIRMATION_EMAILS } from "./libs/email-template-lib";
import { getCMSDateFormatNow } from "./changeRequest/email-util";
import getUser from "./utils/getUser";

const EMAIL_SCHEMA = { tlds: { allow: false } };

const statusValidation = Joi.string().valid(
  USER_STATUS.PENDING,
  USER_STATUS.DENIED,
  USER_STATUS.REVOKED,
  USER_STATUS.ACTIVE
);

const nameValidation = Joi.any().when("isPutUser", {
  is: true,
  then: Joi.string().required(),
  otherwise: Joi.string().optional(),
});

export const validateInput = (input) => {
  const userSchema = Joi.object().keys({
    userEmail: Joi.string().email(EMAIL_SCHEMA).required(),
    doneBy: Joi.string().email(EMAIL_SCHEMA).required(),
    attributes: Joi.array()
      // When type is state then state attribute is required and must be valid //
      .when("type", {
        is: Joi.string().valid(
          USER_TYPE.STATE_SUBMITTER,
          USER_TYPE.STATE_SYSTEM_ADMIN
        ),
        then: Joi.array().items(
          Joi.object({
            stateCode: Joi.string()
              .valid(...territoryCodeList)
              .required(),
            status: statusValidation.required(),
          })
        ),
        otherwise: Joi.array().items(
          Joi.object({
            status: statusValidation.required(),
            stateCode: Joi.string().optional(),
          })
        ),
      }),
    isPutUser: Joi.boolean().optional(),
    firstName: nameValidation,
    lastName: nameValidation,
    type: Joi.valid(
      ...Object.values(USER_TYPE).filter((v) => v !== USER_TYPE.SYSTEM_ADMIN)
    ).required(),
    group: Joi.any().when("type", {
      is: USER_TYPE.CMS_REVIEWER,
      then: Joi.any()
        .valid(...groupData.map(({ id }) => id))
        .when("isPutUser", {
          is: true,
          then: Joi.any().required(),
          otherwise: Joi.any().optional(),
        }),
      otherwise: Joi.any().forbidden(),
    }),
    division: Joi.any().when("type", {
      is: USER_TYPE.CMS_REVIEWER,
      then: Joi.any()
        .valid(
          ...groupData.flatMap(({ divisions }) => divisions.map(({ id }) => id))
        )
        .when("isPutUser", {
          is: true,
          then: Joi.any().required(),
          otherwise: Joi.any().optional(),
        }),
      otherwise: Joi.any().forbidden(),
    }),
  });
  //Todo: Add deeper validation for types //
  const result = isEmpty(input)
    ? { error: "Lambda body is missing" }
    : userSchema.validate(input);

  return result.error;
};

const retrieveUsers = async (input) => {
  // retrieve user and doneByUser from DynamoDb //
  let [user, doneByUser] = await Promise.all([
    getUser(input.userEmail),
    getUser(input.doneBy),
  ]);

  // get user details from the db
  if (!user || isEmpty(user)) {
    if (input.isPutUser) {
      if (!input.firstName || !input.lastName) {
        console.log(
          `Warning: First name and last name are required to create a new user record.`
        );
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
      }

      user = {
        id: input.userEmail.toLowerCase(),
        type: input.type,
        attributes: [],
      };
    } else {
      console.log(`Warning: The user record does not exist with the id ${input.userEmail} in the db.
            So user status change cannot be performed`);
      throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
    }
  }

  if (!doneByUser || isEmpty(doneByUser)) {
    if (input.isPutUser) {
      doneByUser = user;
    } else {
      console.log(
        `Warning: The doneBy user record does not exists with the id: ${input.doneBy} in the db`
      );
      throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
    }
  }

  console.log(`Successfully retrieved user (created if doesn't exist) and doneBy user details from the db.
        User: ${JSON.stringify(user, null, 2)}
        doneByUser: ${JSON.stringify(doneByUser, null, 2)}`);
  return { user, doneByUser };
};

// Get if the latest attribute from an array of attributes //
const getLatestAttribute = (attribs) =>
  attribs.reduce((latestItem, currentItem) =>
    currentItem.date > latestItem.date ? currentItem : latestItem
  );

// check if the latest attribute from an array of attributes is active //
const isLatestAttributeActive = (attribs) => {
  const latestAttribute = getLatestAttribute(attribs);
  return latestAttribute.status === USER_STATUS.ACTIVE;
};

const isUserActive = ({ attributes, type }, stateCode) => {
  switch (type) {
    case USER_TYPE.STATE_SUBMITTER:
    case USER_TYPE.STATE_SYSTEM_ADMIN: {
      attributes = attributes?.find(
        (attr) => attr.stateCode === stateCode
      )?.history;
      break;
    }
    default:
      break;
  }

  return attributes && isLatestAttributeActive(attributes);
};

// Ensure the DoneBy user has permission to execute the requested actions //
export const ensureDonebyHasPrivilege = (doneByUser, userType, userState) => {
  switch (doneByUser.type) {
    case USER_TYPE.SYSTEM_ADMIN:
      // System Admins can approve anyone
      return;
    case APPROVING_USER_TYPE[userType]:
      if (!isUserActive(doneByUser, userState)) {
        console.log(
          `Warning: The doneBy user ${doneByUser.id} must be an active ${doneByUser.type} for the state ${userState}`
        );
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
      }
      break;
    default: {
      console.log(
        `Warning: The doneBy user ${doneByUser.id} must be a ${APPROVING_USER_TYPE[userType]} or a System Admin`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
  }
};

// Check if the there is type mismatch between the request and current type of the user //
export const checkTypeMismatch = (inputType, userType) => {
  if (inputType && userType && inputType !== userType) {
    console.log(
      `Warning: Type mismatch. Current user type is ${userType} and requested type is ${inputType}`
    );
    throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
  }
  console.log("No type mismatches");
  return true;
};

const createStatusMachine = (currentState) =>
  createMachine({
    id: "userStatus",
    initial: currentState,
    states: {
      unregistered: {
        on: {
          [USER_STATUS.PENDING]: USER_STATUS.PENDING,
        },
      },
      [USER_STATUS.PENDING]: {
        on: {
          [USER_STATUS.ACTIVE]: USER_STATUS.ACTIVE,
          [USER_STATUS.DENIED]: USER_STATUS.DENIED,
          [USER_STATUS.REVOKED]: USER_STATUS.REVOKED,
        },
      },
      [USER_STATUS.ACTIVE]: {
        on: {
          [USER_STATUS.REVOKED]: USER_STATUS.REVOKED,
        },
      },
      [USER_STATUS.DENIED]: {
        on: {
          [USER_STATUS.PENDING]: USER_STATUS.PENDING,
          [USER_STATUS.ACTIVE]: USER_STATUS.ACTIVE,
        },
      },
      [USER_STATUS.REVOKED]: {
        on: {
          [USER_STATUS.PENDING]: USER_STATUS.PENDING,
          [USER_STATUS.ACTIVE]: USER_STATUS.ACTIVE,
        },
      },
    },
  });

// Ensure the status changes are legal //
export const ensureLegalStatusChange = (
  userAttribs = [],
  inputAttrib,
  isPutUser
) => {
  if (!isPutUser && userAttribs.length === 0) {
    console.log(
      `Warning: User attributes are request for status change request`
    );
    throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
  }

  const currentState = createStatusMachine(
    userAttribs.length === 0
      ? "unregistered"
      : getLatestAttribute(userAttribs).status
  ).initialState;

  if (!currentState.can(inputAttrib.status)) {
    console.log(
      `Warning: Illegal status change request from ${currentState.value}, to ${inputAttrib.status}`
    );
    throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
  }
};

// generate the user attribute object using the provided details //
const generateAttribute = (item, doneBy) => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  return { date: currentTimestamp, status: item.status, doneBy: doneBy };
};

// populate user atributes after ensuring data validity //
export const populateUserAttributes = (
  input,
  user = { attributes: [] },
  doneByUser = {}
) => {
  const isSelfInflicted = user.id === doneByUser.id;
  console.log("user is: ", user);
  console.log("user attributes: ", user.attributes);
  console.log("doneBy is: ", doneByUser);
  console.log("selfInflicted is: ", isSelfInflicted);

  switch (input.type) {
    case USER_TYPE.STATE_SUBMITTER:
    case USER_TYPE.STATE_SYSTEM_ADMIN: {
      input.attributes.forEach((item) => {
        // Ensure the DoneBy user has permission to execute the requested actions //
        if (!input.isPutUser && !isSelfInflicted)
          ensureDonebyHasPrivilege(doneByUser, input.type, item.stateCode);
        // Check if the there is type mismatch between the request and current type of the user //
        checkTypeMismatch(input.type, user.type);

        const stateAttr = user.attributes.find(
          (attr) => attr.stateCode === item.stateCode
        );
        // if not allowed status change throw //
        ensureLegalStatusChange(stateAttr?.history, item, input.isPutUser);

        if (stateAttr) {
          stateAttr.history.push(generateAttribute(item, input.doneBy));
        } else {
          user.attributes.push({
            stateCode: item.stateCode,
            history: [generateAttribute(item, input.doneBy)],
          });
        }
      });
      break;
    }
    default: {
      if (!input.isPutUser && !isSelfInflicted)
        ensureDonebyHasPrivilege(doneByUser, input.type);

      input.attributes.forEach((item) => {
        ensureLegalStatusChange(user.attributes, item, input.isPutUser);
        user.attributes.push(generateAttribute(item, input.doneBy));
      });
    }
  }

  console.log(
    "Successfully ensured Privileges, status change rules and populated user attributes"
  );

  for (const attr of ["firstName", "lastName", "group", "division"]) {
    if (input[attr]) user[attr] = input[attr];
  }

  return user;
};

// Insert or modify an user record in the db //
const putUser = async (tableName, user) => {
  try {
    await dynamoDb.put({
      TableName: tableName,
      Item: user,
    });
    console.log("Successfully submitted the request: ", user);
    return true;
  } catch (error) {
    console.log(
      "Warning: There was an error saving user data to the database",
      error
    );
    throw new Error(RESPONSE_CODE.USER_SUBMISSION_FAILED);
  }
};

// Construct the email with all needed properties //
const constructUserEmail = (userEmailId, input) => {
  const email = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [userEmailId, process.env.productionNoEmailDebug],
  };

  const updatedStatus = input.attributes[0].status;
  const userType = input.type;
  input.attributes[0].stateCode
    ? (email.Subject = ACCESS_CONFIRMATION_EMAILS[userType][
        updatedStatus
      ].subjectLine.replace("[insert state]", input.attributes[0].stateCode))
    : (email.Subject =
        ACCESS_CONFIRMATION_EMAILS[userType][updatedStatus].subjectLine);

  input.attributes[0].stateCode
    ? (email.HTML = ACCESS_CONFIRMATION_EMAILS[userType][updatedStatus].bodyHTML
        .replace("[insert state]", input.attributes[0].stateCode)
        .replace("[insert date/time stamp]", getCMSDateFormatNow(Date.now())))
    : (email.HTML = ACCESS_CONFIRMATION_EMAILS[userType][
        updatedStatus
      ].bodyHTML.replace(
        "[insert date/time stamp]",
        getCMSDateFormatNow(Date.now())
      ));
  return { email };
};

// Send email //
const dispatchEmail = async (email) => {
  try {
    const emailStatus = await sendEmail(email);
    if (emailStatus instanceof Error) {
      console.log("Warning: Email not sent");
    }
    console.log("Email successfully sent");
    return RESPONSE_CODE.USER_SUBMITTED;
  } catch (error) {
    console.log(
      "Warning: There was an error sending the user access request acknowledgment email.",
      error
    );
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }
};

const getUsersByType = async (type) => {
  const params = {
    TableName: process.env.userTableName,
    ProjectionExpression:
      type === USER_TYPE.SYSTEM_ADMIN ? "id" : "id,attributes",
    FilterExpression: "#type = :userType",
    ExpressionAttributeNames: {
      "#type": "type",
    },
    ExpressionAttributeValues: {
      ":userType": type,
    },
  };

  let result;
  try {
    result = await dynamoDb.scan(params);
    return result.Items;
  } catch (dbError) {
    console.log(`Error happened while reading from DB: ${dbError}`);
    throw dbError;
  }
};

// Collect recipient email addresses to send out confirmation emails to //
const collectRoleAdminEmailIds = async (input) => {
  const recipients = [];
  if (input.type === USER_TYPE.STATE_SUBMITTER) {
    const states = input.attributes.map((item) => item.stateCode);
    // get all stateAdmin email ids
    const stateSystemAdmins =
      (await getUsersByType(USER_TYPE.STATE_SYSTEM_ADMIN)) || [];
    // fiter out by selected states with latest attribute status is active //
    stateSystemAdmins.map((admin) => {
      const attributes = admin.attributes;
      attributes.forEach((attr) => {
        states.includes(attr.stateCode) && isLatestAttributeActive(attr.history)
          ? recipients.push(admin.id)
          : null;
      });
    });
  } else if (
    input.type === USER_TYPE.STATE_SYSTEM_ADMIN ||
    input.type === USER_TYPE.CMS_REVIEWER
  ) {
    // get all cms role approvers emails //
    // query all cms role approvers
    const cmsRoleApprovers =
      (await getUsersByType(USER_TYPE.CMS_ROLE_APPROVER)) || [];
    // check if recent attribute status is active and add email to recipient list //
    cmsRoleApprovers.forEach((approver) => {
      isLatestAttributeActive(approver.attributes)
        ? recipients.push(approver.id)
        : null;
    });
  } else if (
    input.type === USER_TYPE.CMS_ROLE_APPROVER ||
    input.type === USER_TYPE.HELPDESK
  ) {
    let systemadmins = [];
    // if lambda has a valid sysadminEmail then use it if not fetch all sysadmin emails from the db //
    if (process.env.systemAdminEmail) {
      recipients.push(process.env.systemAdminEmail);
    } else {
      // get all system admins emails //
      systemadmins = (await getUsersByType(USER_TYPE.SYSTEM_ADMIN)) || [];
      systemadmins.forEach((sysadmin) => recipients.push(sysadmin.id));
    }
  }
  recipients.push(process.env.productionNoEmailDebug);
  console.log("Role admin email recipients,", recipients);
  return recipients;
};

// Construct email to the authorities with the role request info //
export const constructRoleAdminEmails = (recipients, input) => {
  const userType = input.type;
  let stateText;
  if (userType == USER_TYPE.STATE_SYSTEM_ADMIN) {
    stateText = ` for ${input.attributes[0].stateCode}`;
  } else {
    stateText = "";
  }
  const email = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: recipients,
  };
  const typeText = roleLabels[input.type] ?? "User";

  if (
    input.type === USER_TYPE.STATE_SUBMITTER &&
    input.userEmail === input.doneBy &&
    input.attributes[0].status === USER_STATUS.REVOKED
  ) {
    email.Subject =
      `OneMAC Portal State access for ` +
      input.attributes[0].stateCode +
      ` Access self-revoked by the user`;
    email.HTML = `
      <p>Hello,</p>

      The OneMAC Portal State access for ${input.attributes[0].stateCode}
      has been self-revoked by the user. Please log into your User
      Management Dashboard to see the updated access.

      <p>Thank you!</p>`;
  } else {
    email.Subject = `New OneMAC Portal ${typeText} Access Request`;
    email.HTML = `
      <p>Hello,</p>

      There is a new OneMAC Portal ${typeText} access request${stateText} from
      ${input.firstName} ${input.lastName} waiting for your review.  Please log into your
      User Management Dashboard to see the pending request.

      <p>Thank you!</p>`;
  }

  return { email };
};

// Preparing and sending confirmation email //
const processEmail = async (input) => {
  // Construct and send email acknowledgement to the requesting user //
  const userEmail = await constructUserEmail(input.userEmail, input);

  await dispatchEmail(userEmail.email, input);

  // only email approvers if user is acting on their own status
  if (input.userEmail !== input.doneBy) {
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }

  // Collect the emails of the authorized user who can make the requested role changes to //
  const roleAdminEmails = await collectRoleAdminEmailIds(input);
  if (roleAdminEmails.length > 0) {
    // construct email parameters
    const emailParams = constructRoleAdminEmails(
      roleAdminEmails,
      input,
      "doneBy"
    );
    await dispatchEmail(emailParams.email, input);
  } else {
    console.log(
      `Warning: Role admin email conformations not sent. There is no recipient email address present for the Role admins`
    );
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }
};

/**
 * Create / Update a user or change User status
 */
export const main = handler(async (event) => {
  try {
    const input = isObject(event.body) ? event.body : JSON.parse(event.body);
    console.log("PutUser Lambda call for: ", JSON.stringify(input));
    // do a pre-check for things that should stop us immediately //
    const valError = validateInput(input);
    if (valError) {
      console.error("Validation error:", valError);
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    console.log("Initial validation successful.");

    const { user, doneByUser } = await retrieveUsers(input);
    // populate user atributes after ensuring data validity //
    const populatedUser = populateUserAttributes(input, user, doneByUser);
    // PUT user in db
    await putUser(process.env.userTableName, populatedUser);
    await processEmail(input);
    //
    return RESPONSE_CODE.USER_SUBMITTED;
  } catch (e) {
    console.error("Error executing lambda:", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }
});
