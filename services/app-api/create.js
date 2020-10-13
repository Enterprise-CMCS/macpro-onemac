import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import * as emailTemplates from "./libs/email-templates";
import aws from "aws-sdk";
var ses = new aws.SES({ region: "us-east-1" });

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(event, null, 2));

  var amendmentType = 'amendment';
  if (event.path == '/waivers') {
    amendmentType = 'waiver';
  }

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      amendmentId: uuid.v1(),
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      territory: data.territory,
      amendmentType: amendmentType,
      uploads: data.uploads,
      createdAt: Date.now(),
    },
  };

  if (event.path=='/waivers') {
    params.Item.waiverNumber = data.waiverNumber;
    params.Item.summary = data.summary;
    params.Item.actionType = data.actionType;
    params.Item.waiverAuthority = data.waiverAuthority;
  } else {
    params.Item.transmittalNumber = data.transmittalNumber;
    params.Item.urgent = data.urgent;
    params.Item.comments = data.comments;
  }

  await dynamoDb.put(params);
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

  return params.Item;
});

/**
 * Send the user acknowledgement email.
 * @param {Object} data the SPA data
 */
function sendUserAckEmail(data) {
  let message = emailTemplates.getUserAckEmailBody(data);

  var emailParams = {
    Destination: {
      ToAddresses: [data.email],
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
  if(!process.env.IS_OFFLINE) {
    retPromise = ses.sendEmail(emailParams).promise();
  } else {
    console.log("IN OFFLINE MODE: Will not send email.");
    console.log(emailParams);
    console.log(emailParams.Message.Body);
    retPromise = Promise.resolve("ok");
  }

  return retPromise;
}
