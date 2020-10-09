import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import * as emailTemplates from "./libs/email-templates";
import aws from "aws-sdk";
var ses = new aws.SES({ region: "us-east-1" });

/**
 * Submit a new record for storage.
 */
export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(event, null, 2));

  if (fieldsValid(data)) {
    // Add required data to the record before storing.
    console.log(event.requestContext.identity);
    data.id = uuid.v1();
    data.createdAt = Date.now();

    //Normalize the user data.
    data.user = {
      id: event.requestContext.identity.cognitoIdentityId,
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.user.attributes.email,
      firstName: data.user.attributes.given_name,
      lastName: data.user.attributes.family_name,
    };
    data.userId = event.requestContext.identity.cognitoIdentityId;

    //Store the data in the database.
    await dynamoDb.put({
      TableName: process.env.tableName,
      Item: data,
    });

    // Now send the submission email
    await sendSubmissionEmail(data);

    //An error sending the user email is not a failure.
    try {
      await sendUserAckEmail(data);
    } catch (error) {
      console.log(
        "Warning: There was an error sending the user acknowledgement email.",
        error
      );
    }

    console.log("Successfully submitted amendment:", data);
    context.succeed(data);
    return data;
  } else {
    console.log("Invalid submission with missing fields.", data);
    context.fail("Invalid submission with missing fields.");
  }
});

/**
 * Check if the received data is valid.
 * @param {Object} data the received data
 * @returns true if the data is valid
 */
function fieldsValid(data) {
  let isValid = true;
  if (!data.user) {
    console.log("ERROR: Missing user info data.");
    isValid = false;
  }

  if (!data.uploads) {
    console.log("ERROR: Missing attachments.");
    isValid = false;
  }

  if (!data.type) {
    console.log("ERROR: Missing record type.");
    isValid = false;
  }

  return isValid;
}

/**
 * Send the user acknowledgement email.
 * @param {Object} data the SPA data
 */
function sendUserAckEmail(data) {
  let message = emailTemplates.getUserAckEmailBody(data);

  var emailParams = {
    Destination: {
      ToAddresses: [data.user.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: message.subject,
      },
    },
    Source: process.env.emailSource,
  };

  return sendEmail(emailParams);
}

/**
 * Send the submission email.
 * @param {Object} data the SPA data
 */
function sendSubmissionEmail(data) {
  let message = emailTemplates.getSubmissionEmailBody(data);

  var emailParams = {
    Destination: {
      ToAddresses: [process.env.reviewerEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: message.subject,
      },
    },
    Source: process.env.emailSource,
  };

  return sendEmail(emailParams);
}

/**
 * Send the email.  If we are in OFFLINE mode then the email contents is logged.
 * @param {Object} emailParams the email parameters as required by the SES sendEmail function
 */
function sendEmail(emailParams) {
  let retPromise;
  // If we are in offline mode just log the email message.
  if (!process.env.IS_OFFLINE) {
    retPromise = ses.sendEmail(emailParams).promise();
  } else {
    console.log("IN OFFLINE MODE: Will not send email.");
    console.log(emailParams);
    console.log(emailParams.Message.Body);
    retPromise = Promise.resolve("ok");
  }

  return retPromise;
}
