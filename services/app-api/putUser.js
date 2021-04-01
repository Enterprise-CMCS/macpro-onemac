import handler from "./libs/handler-lib";
import lambdaWarmup from "./libs/lambda-warmup";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import Joi from '@hapi/joi';
import { isEmpty, isObject } from 'lodash';
import { territoryCodeList } from "./libs/territoryLib";

/**
 * Create / Update a user or change User status
 */
export const main = handler(async (event) => {
    try {
        lambdaWarmup(event);
        let input = (isObject(event.body)) ? event.body : JSON.parse(event.body);
        console.log('PutUser Lambda call for: ', JSON.stringify(input));
        // do a pre-check for things that should stop us immediately //
        validateInput(input);

        let { user, doneByUser } = await retreiveUsers(input);
        // Populate user type info into the input params for further processing //
        input.type = input.type ? input.type : user.type;
        // populate user atributes after ensuring data validity //
        user = populateUserAttributes(input, user, doneByUser);
        // PUT user in db
        await putUser(process.env.userTableName, user);
        await processEmail(input);
        return RESPONSE_CODE.USER_SUBMITTED;
    } catch (e) {
        console.log(`Error executing lambda: ${JSON.stringify(e)}`);
        return RESPONSE_CODE.USER_SUBMISSION_FAILED;
    }
});

const validateInput = input => {
    const userSchema = Joi.object().keys({
        userEmail: Joi.string().email().required(),
        doneBy: Joi.string().email().required(),
        attributes: Joi.array()
            // When type is state then state attribute is required and must be valid //
            .when('type', {
                is: Joi.string().valid('stateuser', 'stateadmin'),
                then: Joi.array().items(Joi.object({
                    stateCode: Joi.string().valid(...territoryCodeList).required(),
                    status: Joi.string().valid('pending', 'denied', 'revoked', 'active').required(),
                })),
                otherwise: Joi.array().items(Joi.object({
                    status: Joi.string().valid('pending', 'denied', 'revoked', 'active').required(),
                    stateCode: Joi.string().optional()
                })),
            }),
        isPutUser: Joi.boolean().optional(),
        // if isPutUser is true then first and last names and type are required //
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        type: Joi.when('isPutUser', {
            is: true,
            then: Joi.valid('stateuser', 'stateadmin', 'cmsapprover').required(),
            otherwise: Joi.valid('stateuser', 'stateadmin', 'cmsapprover').optional(),
        }),
    });
    //Todo: Add deeper validation for types //
    const result = userSchema.validate(input);

    if (result.error) {
        console.log('Validation error:', result.error);
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    console.log('Validation successful:');
    return;
};

const getUser = async userEmail => {
    const params = {
        TableName: process.env.userTableName, // Todo : check for existance
        Key: {
            id: userEmail
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

    console.log(`Selected User ${userEmail}: ${JSON.stringify(result)}`);
    return result.Item;
};

const retreiveUsers = async input => {
    // retreive user and doneByUser from DynamoDb //
    let user = await getUser(input.userEmail);
    // get user details from the db
    if (isEmpty(user)) {
        if (!input.isPutUser) {
            console.log(`Warning: The user record does not exist with the id ${input.userEmail} in the db.
            So user status change cannot be performed`);
            throw new Error(RESPONSE_CODE.USER_NOT_FOUND_ERROR);
        } else {
            if (!input.firstName || !input.lastName) {
                console.log(`Warning: First name and last name are required to create a new user record.`);
                throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
            }
            user = createUserObject(input);
        }
    }
    // get doneBy user details from the db //
    const doneByUser = await getUser(input.doneBy);
    if (!doneByUser || isEmpty(doneByUser)) {
        console.log(`Warning: The doneBy user record does not exists with the id: ${input.doneBy} in the db`);
        throw new Error(RESPONSE_CODE.USER_NOT_FOUND_ERROR);
    }
    console.log('Successfully retreived user and doneBy user details from the db');
    return { user, doneByUser };
};

// Create the user object for new users //
const createUserObject = input => {
    const user = {
        id: input.userEmail,
        type: input.type,
        attributes: [],
    };
    return user;
};

// populate user atributes after ensuring data validity //
const populateUserAttributes = (input, user = { attributes: [] }, doneByUser = {}) => {
    if (input.type === 'stateuser' || input.type === 'stateadmin') {
        input.attributes.forEach(item => {
            const index = user.attributes.findIndex(attr => attr.stateCode === item.stateCode);
            // Ensure the DoneBy user has permission to execute the requested actions //
            ensureDonebyHasPrivilage(doneByUser, input.type, item.stateCode);
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
                    history: [generateAttribute(item, input.doneBy)]
                });
            }
        });
    }
    else {  // CMSApprover & systemadmin //
        input.attributes.forEach(item => {
            ensureDonebyHasPrivilage(doneByUser, input.type);
            ensureLegalStatusChange(user.attributes, item, input.isPutUser);
            user.attributes.push(generateAttribute(item, input.doneBy));
        });
    }
    console.log('Successfully ensured privilages, status change rules and populated user attributes');
    return user;
};

// Ensure the DoneBy user has permission to execute the requested actions //
const ensureDonebyHasPrivilage = (doneByUser, userType, userState) => {
    if (userType === 'stateuser') {
        if (doneByUser.type !== 'stateadmin') {
            console.log(`Warning: The doneBy user ${doneByUser.id} must be a stateadmin for the state ${userState}`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
        const index = doneByUser.attributes.findIndex(attr => attr.stateCode === userState);
        if ((index === -1) || !isLatestAttributeActive(doneByUser.attributes[index].history)) {
            console.log(`Warning: The doneBy user ${doneByUser.id} must be an active stateadmin for the state ${userState}`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
    }
    if (userType === 'stateadmin') {
        if (doneByUser.type !== 'cmsapprover') {
            console.log(`Warning: The doneBy user : ${doneByUser.id}, must be a cmsapprover`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
        if (!isLatestAttributeActive(doneByUser.attributes)) {
            console.log(`Warning: The doneBy user ${doneByUser.id} must be an active cmsapprover`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
    }
    if (userType === 'cmsapprover') {
        if (doneByUser.type !== 'systemadmin') {
            console.log(`Warning: The doneBy user : ${doneByUser.id}, must be a systemadmin`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
    }
    return true;
};

// Ensure the status changes are legal //
const ensureLegalStatusChange = (userAttribs = [], inputAttrib, isPutUser) => {
    if (userAttribs.length === 0) {
        if (inputAttrib.status !== 'pending') {
            console.log(`Warning: Illegal status change request ${inputAttrib.status}, 
                Only legally allowed status for the first attribute is 'pending'`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
        if (!isPutUser) {
            console.log(`Warning: User attributes are request for status change request`);
            throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
        }
    }
    const currentStatus = userAttribs.length > 0 ? getLatestAttribute(userAttribs).status : null;
    const targetStatus = inputAttrib.status;

    if ((currentStatus === 'denied') && (targetStatus === 'revoked')
        || (currentStatus === 'active') && (targetStatus === 'denied')
        || (currentStatus === 'pending') && (targetStatus === 'revoked')
        || (currentStatus === targetStatus)
    ) {
        console.log(`Warning: Illegal status change request from ${currentStatus}, to ${targetStatus}`);
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
};

// Check if the there is type mismatch between the request and current type of the user //
const checkTypeMismatch = (inputType, userType) => {
    if (inputType && userType && (inputType !== userType)) {
        console.log(`Warning: Typw mismatch. Current user type is ${userType} and requested type is ${inputType}`);
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    console.log('No type mismatches');
    return true;
};

// ensure if the item is pending
const ensurePendingStatus = attrib => { // Todo: better logging by providing state //
    if (attrib.status !== 'pending') {
        console.log(`Warning: The status is: ${attrib.status}, 
            must be a pending for a new user or first attribute for the state`);
        throw new Error(RESPONSE_CODE.VALIDATION_ERROR);
    }
    console.log('Pending status ensured');
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
        console.log("Successfully submitted the request:", user);
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
const processEmail = async input => {
    // Collect recipients email ids
    const recipients = await collectRecipientEmails(input);
    if (recipients.length > 0) {
        // construct email parameters
        const emailParams = constructEmailParams(recipients, input.type);
        // Send email //
        try {
            // Start sending  the User access request "reciept" //
            await sendEmail(emailParams.email);
            return RESPONSE_CODE.USER_SUBMITTED;
        } catch (error) {
            console.log(
                "Warning: There was an error sending the user access request acknowledgment email.",
                error
            );
            return RESPONSE_CODE.EMAIL_NOT_SENT;
        }
    } else {
        console.log(
            `Warning: No emails sent. There is no recipient email address present for input ${JSON.stringify(input)}`);
        return RESPONSE_CODE.EMAIL_NOT_SENT;
    }
};

// Collect recipient email addresses to send out confirmation emails to //
const collectRecipientEmails = async input => {
    const recipients = [];
    if (input.type === 'stateuser') {
        const states = input.attributes.map(item => item.stateCode);
        // get all stateAdmin email ids
        const stateAdmins = await getUsersByType('stateadmin') || [];
        // fiter out by selected states with latest attribute status is active //
        stateAdmins.map(admin => {
            const attributes = admin.attributes;
            attributes.forEach(attr => {
                states.includes(attr.stateCode) && isLatestAttributeActive(attr.history) ? recipients.push(admin.id) : null;
            });
        });
    }
    else if (input.type === 'stateadmin') {  // get all cms approvers emails //
        // query all cms approvers
        const cmsApprovers = await getUsersByType('cmsapprover') || [];
        // check if recent attribute status is active and add email to recipient list //
        cmsApprovers.forEach(approver => {
            isLatestAttributeActive(approver.attributes) ? recipients.push(approver.id) : null;
        });

    }
    else if (input.type === 'cmsapprover') {
        let systemadmins = [];
        // if lambda has a valid sysadminEmail then use it if not fetch all sysadmin emails from the db //
        if (process.env.sysadminEmail) {
            recipients.push(process.env.sysadminEmail);
        } else {
            // get all system admins emails //
            systemadmins = await getUsersByType('systemadmin') || [];
            systemadmins.forEach(sysadmin => recipients.push(sysadmin.id));
        }
    }
    console.log('Email recipients,', recipients);
    return recipients;
};

const getUsersByType = async (type) => {
    const params = {
        TableName: process.env.userTableName,
        ProjectionExpression: (type === 'systemadmin') ? 'id' : 'id,attributes',
        FilterExpression: '#type = :userType',
        ExpressionAttributeNames: {
            '#type': 'type',
        },
        ExpressionAttributeValues: {
            ':userType': type
        }
    };

    let result;
    try {
        result = await dynamoDb.scan(params);
        return result.Items;
    } catch (dbError) {
        console.log(`Error happened while reading from DB:  ${dbError}`);
        throw dbError;
    }

};

// check if the latest attribute from an array of attributes is active //
const isLatestAttributeActive = (attribs) => {
    const latestAttribute = getLatestAttribute(attribs);
    return latestAttribute.status === 'active';
};

// Get if the latest attribute from an array of attributes //
const getLatestAttribute = (attribs) => attribs.reduce(
    (latestItem, currentItem) => currentItem.date > latestItem.date ? currentItem : latestItem
);

// Construct the email with all needed properties //
const constructEmailParams = (recipients, type) => {
    const email = {
        fromAddressSource: 'userAccessEmailSource',
        ToAddresses: recipients
    };
    let typeText = 'User';

    switch (type) {
        case 'stateuser':
            typeText = 'State User';
            break;
        case 'stateadmin':
            typeText = 'State Admin';
            break;
        case 'cmsapprover':
            typeText = 'CMS Approver';
            break;
    };
    email.Subject = `New OneMAC Portal ${typeText} Access Request`;
    email.HTML = `
        <p>Hello,</p>

        <p>You have a new role request awaiting review. Please log into OneMAC and check your 
        Account Management dashboard to review pending requests. If you have questions, 
        please contact the MACPro Help Desk.</p>

        <p>Thank you!</p>`;
    return { email };
};