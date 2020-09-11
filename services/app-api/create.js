import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import * as emailTemplates from "./libs/email-templates";
import aws from "aws-sdk";
var ses = new aws.SES({ region: "us-east-1" });

Amplify.configure({
  Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
  }
});

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(event, null, 2));

  var atomicCounter = require("dynamodb-atomic-counter");
  atomicCounter.config.update({ region: "us-east-1" });
  const nextValue = await atomicCounter
    .increment(data.territory, {
      tableName: process.env.atomicCounterTableName,
    })
    .done(function (value) {})
    .fail(function (error) {
      console.log(error);
    });

  data.spaId = data.territory + "-" + ("000" + nextValue).slice(-4);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      amendmentId: uuid.v1(),
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      transmittalNumber: data.spaId,
      territory: data.territory,
      urgent: data.urgent,
      comments: data.comments,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

console.log(params);
console.log("11");
  await dynamoDb.put(params);
  console.log("22");
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

  return params.Item;
});

/**
 * Send the user acknowledgement email.
 * @param {Object} data the SPA data
 */
function sendUserAckEmail(data) {
  let message = emailTemplates.getUserAckEmailBody(data);
  console.log(message);
  console.log("1");
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
console.log("2");
  return ses.sendEmail(emailParams).promise();
}

/**
 * Send the submission email.
 * @param {Object} data the SPA data
 */
function sendSubmissionEmail(data) {
  let message = emailTemplates.getSubmissionEmailBody(data);
  console.log(message);
  console.log("3");
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
  console.log("4");
  return ses.sendEmail(emailParams).promise();
}
