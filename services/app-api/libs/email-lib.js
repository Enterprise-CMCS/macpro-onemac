import aws from "aws-sdk";
var ses = new aws.SES({ region: "us-east-1" });

/**
 * Translates the message into the email format used by Amazon SES
 * @param {Object} message the email information
 */
function getSESEmailParams(message) {

  var emailParams = {
    Destination: {
      ToAddresses: [(message.sendTo ? message.sendTo : process.env.reviewerEmail)],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: [message.body],
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: [message.subject],
      },
    },
    Source: process.env.emailSource,
  };

  return emailParams;
}

/**
 * What we do when the application is being run offline
 * @param {Object} message the email details
 */
function sendOfflineEmail(message) {
  console.log("IN OFFLINE MODE: Will not send email.");
  console.log(message);
  console.log("Amazon email parameters:\n");
  console.log(getSESEmailParams(message));
  return Promise.resolve("ok");
}

/**
 * Transforms generic email details into the sending platform structure
 * and "sends" the email.  Uses promises to capture sending details.
 * @param {Object} message the generic email properties
 */
export function sendEmail(message) {
  let retPromise;

  // If we are in offline mode just log the email message.
  if(process.env.IS_OFFLINE) {
    retPromise = sendOfflineEmail(message);
  } else {
    retPromise = ses.sendEmail(getSESEmailParams(message)).promise();
  }

  return retPromise;
}