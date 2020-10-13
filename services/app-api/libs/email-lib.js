import AWS from "aws-sdk";

const sender = new AWS.SES({ region: "us-east-1" });

/**
 * Transforms generic email details into the sending platform structure
 * and "sends" the email.  Uses promises to capture sending details.
 * @param {Object} message the generic email properties
 */
export default function sendEmail(emailParams) {

  // If we are in offline mode just log the email message.
  if(process.env.IS_OFFLINE) {
      console.log("IN OFFLINE MODE: Will not send email.");
      console.log("Amazon email parameters:\n");
      console.log(emailParams);
      return Promise.resolve("ok");
    } else {
      return sender.sendEmail(emailParams).promise();
    }
}
