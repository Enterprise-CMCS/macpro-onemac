import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import Joi from '@hapi/joi';
import { isEmpty } from 'lodash';
import { territoryCodeList } from "./libs/territoryLib";
import getUser from "./utils/getUser";

/**
 * Update a user
 */
export const main = handler(async (event) => {
    // const main = async (event) => {
    // If this invocation is a prewarm, do nothing and return.
    if (event.source == "serverless-plugin-warmup") {
        console.log("Warmed up!");
        return null;
    }
    let input;
    try {
        input = JSON.parse(event.body);
    } catch (error) {
        input = event.body;
    }

    // do a pre-check for things that should stop us immediately
    const errorMessage = validateUser(input);
    if (errorMessage) {
        return errorMessage;
    }

    // retreive user item from DynamoDb
    let user = await getUser(input.id);
    // Check if type is not different
    if (!isEmpty(user) && user.type !== input.type) {
        console.log(
            "Warning: The supplied user exists but the type requested is different than what is already registered in the database"
        );
        return RESPONSE_CODE.USER_TYPE_MISMATCH_ERROR;
    }

    user = isEmpty(user) ? createUserObject(input) : user;

    user = populateUserData(input, user);
    // PUT user in db
    try {
        await dynamoDb.put({
            TableName: process.env.userTableName,
            Item: user,
        });
    } catch (error) {
        console.log(
            "Warning: There was an error saving user data to the database",
            error
        );
        return RESPONSE_CODE.USER_SUBMISSION_FAILED;
    }
    console.log("Successfully submitted the request:", user);

    // Collect recipients email ids
    const recipients = await collectRecipientEmails(input);
    //recipients = (isEmpty(recipients)) ? [] : recipients;
    if (recipients.length > 0) {
        // construct email parameters
        const emailParams = constructEmailParams(recipients, input.type);

        // Send email
        try {
            // send the User access request "reciept"
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
    }
});

const validateUser = data => {
    const userSchema = Joi.object().keys({
        id: Joi.string().email().required(),
        type: Joi.string().valid('cmsapprover', 'stateadmin', 'stateuser').required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        phone: Joi.string(),
        systemAdminEmail: Joi.string().email().optional(),
        attributes: Joi.array()
            .when('type', {
                is: Joi.string().valid('stateuser', 'stateadmin'),
                then: Joi.array().items(Joi.object({
                    stateCode: Joi.string().valid(...territoryCodeList).required(),
                    status: Joi.string().valid('pending', 'denied', 'revoked', 'active').required(),
                    doneBy: Joi.string().email().required()
                })),
                otherwise: Joi.array().items(Joi.object({
                    status: Joi.string().valid('pending', 'denied', 'revoked', 'active').required(),
                    doneBy: Joi.string().email().required()
                })),

            })
    });
    //Todo: Add deeper validation for types
    const result = userSchema.validate(data);

    if (result.error) {
        console.log('Validation error:', result.error);
        return RESPONSE_CODE.VALIDATION_ERROR;
    }
    return "";
};

const populateUserData = (input, selectedUser) => {
    if (input.type === 'stateuser' || input.type === 'stateadmin') {
        input.attributes.forEach(item => {
            const index = selectedUser.attributes.findIndex(attr => attr.stateCode === item.stateCode);
            if (index !== -1) {
                selectedUser.attributes[index].history.push(generateAttribute(item));
            } else {
                selectedUser.attributes.push({
                    stateCode: item.stateCode,
                    history: [generateAttribute(item)]
                });
            }
        });
    }
    else {  // CMSApprover & systemadmin
        input.attributes.forEach(item => {
            selectedUser.attributes.push(generateAttribute(item));
        });
    }
    return selectedUser;
};

const generateAttribute = item => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    return { date: currentTimestamp, status: item.status, doneBy: item.doneBy };
};

const createUserObject = data => {
    const user = {
        id: data.id,
        type: data.type,
        attributes: [],
    };
    return user;
};

const collectRecipientEmails = async input => {
    const recipients = [];
    if (input.type === 'stateuser') {
        const states = input.attributes.map(item => item.stateCode);
        // get all stateAdmin email ids
        const stateAdmins = await getUsersByType('stateadmin') || [];
        // fiter out by selected states with latest attribute status is active
        stateAdmins.map(admin => {
            const attributes = admin.attributes;
            attributes.forEach(attr => {
                states.includes(attr.stateCode) && isLatestAttributeActive(attr.history) ? recipients.push(admin.id) : null;
            });
        });
    }
    else if (input.type === 'stateadmin') {  // get all cms approvers emails
        // query all cms approvers
        const cmsApprovers = await getUsersByType('cmsapprover') || [];
        // check if recent attribute status is active and add email to recipient list
        cmsApprovers.forEach(approver => {
            isLatestAttributeActive(approver.attributes) ? recipients.push(approver.id) : null;
        });

    }
    else if (input.type === 'cmsapprover') {
        let systemadmins = [];
        // if lambda has a valid sysadminEmail then use it if not fetch all sysadmin emails from the db
        if (input.systemAdminEmail) {
            recipients.push(input.systemAdminEmail);
        } else {
            // get all system admins emails
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

const isLatestAttributeActive = (attr) => {
    const latestAttribute = attr.reduce(
        (latestItem, currentItem) => currentItem.date > latestItem.date ? currentItem : latestItem
    );
    return latestAttribute.status === 'active';
};

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