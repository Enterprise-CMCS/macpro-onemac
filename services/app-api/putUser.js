import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import { getCMSDateFormat } from "./changeRequest/changeRequest-util";
import { RESPONSE_CODE } from "./libs/response-codes";
import Joi from '@hapi/joi';
import { isEmpty } from 'lodash';

/**
 * Update a user
 */
export const main = handler(async (event) => {
    //    const main = async (event) => {
    // If this invocation is a prewarm, do nothing and return.
    if (event.source == "serverless-plugin-warmup") {
        console.log("Warmed up!");
        return null;
    }
    const input = JSON.parse(event.body);

    // do a pre-check for things that should stop us immediately
    const errorMessage = validateUser(input);
    if (errorMessage) {
        return errorMessage;
    }

    // retreive user item from DynamoDb
    let user = await getUser(input.id);

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
    }
    console.log("Successfully submitted the request:", user);

    // Collect recipients email ids
    const recipients = collectRecipientEmails(input) || [];

    // construct email parameters
    const emailParams = constructEmailParams(recipients, input.type);

    // Send email
    try {
        // send the User access request "reciept"
        await sendEmail(emailParams.email, emailParams.fromAddressSource);
        return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
    } catch (error) {
        console.log(
            "Warning: There was an error sending the user access request acknowledgment email.",
            error
        );
    }
    return RESPONSE_CODE.SUCCESSFULLY_SUBMITTED;
});


const validateUser = data => {
    const userSchema = Joi.object().keys({
        id: Joi.string().email().required(),
        type: Joi.string().valid('cmsapprover', 'stateapprover', 'stateuser').required(),
        attributes: Joi.array().required()
    });
    //Todo: Add deeper validation for types
    const result = userSchema.validate(data);

    if (result.error) {
        console.log('Validation error:', result.error);
        return RESPONSE_CODE.VALIDATION_ERROR;
    }
    return "";
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
        console.log(`Error happened while reading from DB:  ${dbError}`);
        throw dbError;
    }

    if (!result.Item) {
        console.log(`The user does not exists with the id: ${userEmail} in the User table`);
        return result;
    }

    console.log(`The user details for ${userEmail}: ${result}`);
    return result.Item;
};

const populateUserData = (input, selectedUser) => {
    if (input.type === 'stateuser' || input.type === 'stateadmin') {
        input.attributes.forEach(item => {
            const index = selectedUser.attributes.findIndex(attr => attr.stateCode === item.stateCode);
            if (index !== -1) {
                selectedUser.attributes[index].history.push({ date: item.date, status: item.status });
            } else {
                selectedUser.attributes.push({
                    stateCode: item.stateCode,
                    history: [{ date: getCMSDateFormat(Date.now), status: item.status }]
                });
            }
        });
    }
    else {  // CMSApprover & systemadmin
        input.attributes.forEach(item => {
            selectedUser.attributes.push({ date: getCMSDateFormat(Date.now), status: item.status });
        });
    }
    return selectedUser;
};

const createUserObject = data => {
    const user = {
        id: data.id,
        type: data.type,
        attributes: [],
    };
    data.attributes.forEach(item => {
        if (data.type === 'stateuser' || data.type === 'stateadmin') {
            user.attributes.push({
                stateCode: item.stateCode,
                history: [item]
            });
        } else {
            user.attributes.push(item);
        }
    });
    return user;
};

const collectRecipientEmails = async input => {
    const recipients = [];
    if (input.type === 'stateadmin') {
        const states = input.attributes.map(item => item.stateCode);
        console.log('selected states:', JSON.stringify(states));
        // get all stateAdmin email ids
        const stateAdmins = await getUsersByType('stateuser') || [];
        // fiter out by selected states with latest attribute status is active
        stateAdmins.foreach(admin => {
            const attributes = admin.attributes;
            attributes.forEach(attr => {
                states.includes(attr.stateCode) && isLatestAttributeActive(attr.history) ? recipients.push(admin.id) : null;
            });
        });
    }
    else if (input.type === 'stateadmin') {
        // get all cms approvers emails
        // query all cms approvers
        const cmsApprovers = await getUsersByType('cmsapprover') || [];
        // check if recent attribute status is active and add email to recipient list
        cmsApprovers.forEach(approver => {
            isLatestAttributeActive(approver.attributes) ? recipients.push(approver.id) : null;
        });

    }
    else if (input.type === 'cmsapprover') {
        // get all system admins emails
        const systemadmins = await getUsersByType('systemadmin') || [];
        systemadmins.forEach(sysadmin => recipients.push(sysadmin.id));
    }
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
    const email = {};
    let typeText = 'User ';
    const fromAddressSource = 'userAccessEmailSource';
    email.ToAddresses = recipients;
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
        <p>There is a new OneMAC Portal ${typeText} access request waiting for your review. 
        Please log into your User Management Dashboard to see the pending request.</p>
        <p>Thank you!</p>`;
    return { email, fromAddressSource };
};