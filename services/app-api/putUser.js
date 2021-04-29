import handler from "./libs/handler-lib";
import isLambdaWarmup from "./libs/lambda-warmup";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import Joi from "@hapi/joi";
import { isEmpty, isObject } from "lodash";
import { territoryCodeList } from "cmscommonlib";
import { USER_TYPE, USER_STATUS } from "./libs/user-lib";
import { ACCESS_CONFIRMATION_EMAILS } from "./libs/email-template-lib";
import { getCMSDateFormat } from "./changeRequest-util";

/**
 * Create / Update a user or change User status
 */
export const main = handler(async (event) => {
  try {
    if (isLambdaWarmup(event)) return null;
    let input = isObject(event.body) ? event.body : JSON.parse(event.body);
    console.log("PutUser Lambda call for: ", JSON.stringify(input));
    // do a pre-check for things that should stop us immediately //
    validateInput(input);

    let { user, doneByUser } = await retrieveUsers(input);
    // populate user atributes after ensuring data validity //
    user = populateUserAttributes(input, user, doneByUser);
    // PUT user in db
    await putUser(process.env.userTableName, user);
    await processEmail(input);
    //
    return RESPONSE_CODE.USER_SUBMITTED;
  } catch (e) {
    console.log(`Error executing lambda: ${JSON.stringify(e)}`);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }
});

const EMAIL_SCHEMA = { tlds: { allow: false } };

const validateInput = (input) => {
  const userSchema = Joi.object().keys({
    userEmail: Joi.string().email(EMAIL_SCHEMA).required(),
    doneBy: Joi.string().email(EMAIL_SCHEMA).required(),
    attributes: Joi.array()
      // When type is state then state attribute is required and must be valid //
      .when("type", {
        is: Joi.string().valid(USER_TYPE.STATE_USER, USER_TYPE.STATE_ADMIN),
        then: Joi.array().items(
          Joi.object({
            stateCode: Joi.string()
              .valid(...territoryCodeList)
              .required(),
            status: Joi.string()
              .valid(
                USER_STATUS.PENDING,
                USER_STATUS.DENIED,
                USER_STATUS.REVOKED,
                USER_STATUS.ACTIVE
              )
              .required(),
          })
        ),
        otherwise: Joi.array().items(
          Joi.object({
            status: Joi.string()
              .valid(
                USER_STATUS.PENDING,
                USER_STATUS.DENIED,
                USER_STATUS.REVOKED,
                USER_STATUS.ACTIVE
              )
              .required(),
            stateCode: Joi.string().optional(),
          })
        ),
      }),
    isPutUser: Joi.boolean().optional(),
    firstName: Joi.any().when("isPutUser", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    lastName: Joi.any().when("isPutUser", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    type: Joi.valid(
      USER_TYPE.STATE_USER,
      USER_TYPE.STATE_ADMIN,
      USER_TYPE.CMS_APPROVER
    ).required(),
  });
  //Todo: Add deeper validation for types //
  const result = isEmpty(input)
    ? { error: "Lambda body is missing" }
    : userSchema.validate(input);

  if (result.error) {
    console.log("Validation error:", result.error);
    throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
  }
  console.log("Initial validation successful.");
  return;
};

const getUser = async (userEmail) => {
  const params = {
    TableName: process.env.userTableName, // Todo : check for existance
    Key: {
      id: userEmail,
    },
  };
  let result;
  try {
    result = await dynamoDb.get(params);
  } catch (dbError) {
    console.log(`Error happened while reading from DB: ${dbError}`);
    throw new Error(RESPONSE_CODE.SYSTEM_ERROR);
  }

  if (!result.Item) {
    return {};
  }
  return result.Item;
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
      user = createUserObject(input);
    } else {
      console.log(`Warning: The user record does not exist with the id ${input.userEmail} in the db.
            So user status change cannot be performed`);
      throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
    }
  }

  if (!doneByUser || isEmpty(doneByUser)) {
    if (input.isPutUser) {
      doneByUser = null;
    } else {
      console.log(
        `Warning: The doneBy user record does not exists with the id: ${input.doneBy} in the db`
      );
      throw new Error(RESPONSE_CODE.USER_NOT_FOUND_ERROR);
    }
  }

  console.log(`Successfully retrieved user (created if doesn't exist) and doneBy user details from the db.
        User: ${JSON.stringify(user, null, 2)}
        doneByUser: ${JSON.stringify(doneByUser, null, 2)}`);
  return { user, doneByUser };
};

// Create the user object for new users //
const createUserObject = (input) => {
  const user = {
    id: input.userEmail,
    type: input.type,
    attributes: [],
  };
  return user;
};

// populate user atributes after ensuring data validity //
const populateUserAttributes = (
  input,
  user = { attributes: [] },
  doneByUser = {}
) => {
  let isSelfInflicted = user.id === doneByUser.id;
  console.log("user is: ", user);
  console.log("user attributes: ", user.attributes);
  console.log("doneBy is: ", doneByUser);
  console.log("selfInflicted is: ", isSelfInflicted);

  if (
    input.type === USER_TYPE.STATE_USER ||
    input.type === USER_TYPE.STATE_ADMIN
  ) {
    input.attributes.forEach((item) => {
      const index = user.attributes.findIndex(
        (attr) => attr.stateCode === item.stateCode
      );
      // Ensure the DoneBy user has permission to execute the requested actions //
      if (!input.isPutUser && !isSelfInflicted)
        ensureDonebyHasPrivilege(doneByUser, input.type, item.stateCode);
      // Check if the there is type mismatch between the request and current type of the user //
      checkTypeMismatch(input.type, user.type);
      if (index !== -1) {
        const userAttribs = user.attributes[index].history;
        // if not allowed status change throw //
        ensureLegalStatusChange(userAttribs, item, input.isPutUser);
        // isOkToChange(item, userAttribs, doneByUser) //
        userAttribs.push(generateAttribute(item, input.doneBy));
      } else {
        // ensure if the item is pending //
        ensurePendingStatus(item);

        user.attributes.push({
          stateCode: item.stateCode,
          history: [generateAttribute(item, input.doneBy)],
        });
      }
    });
  } else {
    // CMSApprover & systemadmin //
    input.attributes.forEach((item) => {
      if (!input.isPutUser && !isSelfInflicted)
        ensureDonebyHasPrivilege(doneByUser, input.type);
      ensureLegalStatusChange(user.attributes, item, input.isPutUser);
      user.attributes.push(generateAttribute(item, input.doneBy));
    });
  }
  console.log(
    "Successfully ensured Privileges, status change rules and populated user attributes"
  );
  return user;
};

// Ensure the DoneBy user has permission to execute the requested actions //
const ensureDonebyHasPrivilege = (doneByUser, userType, userState) => {
  if (userType === USER_TYPE.STATE_USER) {
    if (doneByUser.type !== USER_TYPE.STATE_ADMIN) {
      console.log(
        `Warning: The doneBy user ${doneByUser.id} must be a stateadmin for the state ${userState}`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    const index = doneByUser.attributes.findIndex(
      (attr) => attr.stateCode === userState
    );
    if (
      index === -1 ||
      !isLatestAttributeActive(doneByUser.attributes[index].history)
    ) {
      console.log(
        `Warning: The doneBy user ${doneByUser.id} must be an active stateadmin for the state ${userState}`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
  }
  if (userType === USER_TYPE.STATE_ADMIN) {
    if (doneByUser.type !== USER_TYPE.CMS_APPROVER) {
      console.log(
        `Warning: The doneBy user : ${doneByUser.id}, must be a cmsapprover`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    if (!isLatestAttributeActive(doneByUser.attributes)) {
      console.log(
        `Warning: The doneBy user ${doneByUser.id} must be an active cmsapprover`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
  }
  if (userType === USER_TYPE.CMS_APPROVER) {
    if (doneByUser.type !== USER_TYPE.SYSTEM_ADMIN) {
      console.log(
        `Warning: The doneBy user : ${doneByUser.id}, must be a systemadmin`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
  }
};

// transition chart of allowed next states based on current state
const ALLOWED_NEXT_STATES = {
  [USER_STATUS.PENDING]: [
    USER_STATUS.ACTIVE,
    USER_STATUS.DENIED,
    USER_STATUS.REVOKED,
  ],
  [USER_STATUS.ACTIVE]: [USER_STATUS.REVOKED],
  [USER_STATUS.DENIED]: [USER_STATUS.ACTIVE],
  [USER_STATUS.REVOKED]: [USER_STATUS.ACTIVE],
};

// Ensure the status changes are legal //
const ensureLegalStatusChange = (userAttribs = [], inputAttrib, isPutUser) => {
  if (userAttribs.length === 0) {
    if (inputAttrib.status !== USER_STATUS.PENDING) {
      console.log(`Warning: Illegal status change request ${inputAttrib.status}, 
                Only legally allowed status for the first attribute is pending`);
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    if (!isPutUser) {
      console.log(
        `Warning: User attributes are request for status change request`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
  } else {
    // if existing attributes present, check if the latest entry is allowed to transition into the requested one
    const currentStatus = getLatestAttribute(userAttribs).status;

    if (!ALLOWED_NEXT_STATES[currentStatus].includes(inputAttrib.status)) {
      console.log(
        `Warning: Illegal status change request from ${currentStatus}, to ${inputAttrib.status}`
      );
      throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
  }
};

// Check if the there is type mismatch between the request and current type of the user //
const checkTypeMismatch = (inputType, userType) => {
  if (inputType && userType && inputType !== userType) {
    console.log(
      `Warning: Type mismatch. Current user type is ${userType} and requested type is ${inputType}`
    );
    throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
  }
  console.log("No type mismatches");
  return true;
};

// ensure if the item is pending
const ensurePendingStatus = (attrib) => {
  // Todo: better logging by providing state //
  if (attrib.status !== USER_STATUS.PENDING) {
    console.log(`Warning: The status is: ${attrib.status}, 
            must be a pending for a new user or first attribute for the state`);
    throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
  }
  console.log("Pending status ensured");
  return true;
};

// generate the user attribute object using the provided details //
const generateAttribute = (item, doneBy) => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  return { date: currentTimestamp, status: item.status, doneBy: doneBy };
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

// Preparing and sending confirmation email //
const processEmail = async (input) => {
  // Construct and send email acknowledgement to the requesting user //
  const userEmail = await constructUserEmail(input.userEmail, input);

  await dispatchEmail(userEmail.email);

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
    await dispatchEmail(emailParams.email);
  } else {
    console.log(
      `Warning: Role admin email conformations not sent. There is no recipient email address present for the Role admins`
    );
    return RESPONSE_CODE.EMAIL_NOT_SENT;
  }
};

// Collect recipient email addresses to send out confirmation emails to //
const collectRoleAdminEmailIds = async (input) => {
  const recipients = [];
  if (input.type === USER_TYPE.STATE_USER) {
    const states = input.attributes.map((item) => item.stateCode);
    // get all stateAdmin email ids
    const stateAdmins = (await getUsersByType(USER_TYPE.STATE_ADMIN)) || [];
    // fiter out by selected states with latest attribute status is active //
    stateAdmins.map((admin) => {
      const attributes = admin.attributes;
      attributes.forEach((attr) => {
        states.includes(attr.stateCode) && isLatestAttributeActive(attr.history)
          ? recipients.push(admin.id)
          : null;
      });
    });
  } else if (input.type === USER_TYPE.STATE_ADMIN) {
    // get all cms approvers emails //
    // query all cms approvers
    const cmsApprovers = (await getUsersByType(USER_TYPE.CMS_APPROVER)) || [];
    // check if recent attribute status is active and add email to recipient list //
    cmsApprovers.forEach((approver) => {
      isLatestAttributeActive(approver.attributes)
        ? recipients.push(approver.id)
        : null;
    });
  } else if (input.type === USER_TYPE.CMS_APPROVER) {
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
  console.log("Role admin email recipients,", recipients);
  return recipients;
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

// check if the latest attribute from an array of attributes is active //
const isLatestAttributeActive = (attribs) => {
  const latestAttribute = getLatestAttribute(attribs);
  return latestAttribute.status === USER_STATUS.ACTIVE;
};

// Get if the latest attribute from an array of attributes //
const getLatestAttribute = (attribs) =>
  attribs.reduce((latestItem, currentItem) =>
    currentItem.date > latestItem.date ? currentItem : latestItem
  );

// Construct email to the authorities with the role request info //
const constructRoleAdminEmails = (recipients, input) => {
  const userType = input.type;
  const email = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: recipients,
  };
  email.HTML = `
  <p>Hello,</p>

  <p>You have a new role request awaiting review. Please log into OneMAC and check your 
  Account Management dashboard to review pending requests. If you have questions, 
  please contact the MACPro Help Desk.</p>

  <p>Thank you!</p>`;

  let typeText = "User";
  let newSubject = "";

  switch (userType) {
    case USER_TYPE.STATE_USER:
      typeText = "State User";

      if (input.userEmail === input.doneBy) {
        newSubject =
          `OneMAC Portal State access for ` +
          input.attributes[0].stateCode +
          ` Access self-revoked by the user`;
        email.HTML =
          `
      <p>Hello,</p>

      The OneMAC Portal State access for ` +
          input.attributes[0].stateCode +
          ` has been self-revoked by the user. Please log into your User Management Dashboard to see the updated access.

      <p>Thank you!</p>`;
      }
      break;
    case USER_TYPE.STATE_ADMIN:
      typeText = "State Admin";
      break;
    case USER_TYPE.CMS_APPROVER:
      typeText = "CMS Approver";
      break;
  }
  if (newSubject) email.Subject = newSubject;
  else email.Subject = `New OneMAC Portal ${typeText} Access Request`;

  return { email };
};

// Construct the email with all needed properties //
const constructUserEmail = (userEmailId, input) => {
  const email = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [userEmailId, process.env.reviewerEmail],
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
    ? (email.HTML = ACCESS_CONFIRMATION_EMAILS[userType][
        updatedStatus
      ].bodyHTML.replace("[insert state]", input.attributes[0].stateCode))
    : (email.HTML =
        ACCESS_CONFIRMATION_EMAILS[userType][updatedStatus].bodyHTML);
  email.HTML.replace("[insert date/time stamp]", getCMSDateFormat(Date.now()));
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
