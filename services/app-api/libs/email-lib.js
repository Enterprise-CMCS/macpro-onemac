import AWS from "aws-sdk";

const sender = new AWS.SES({ region: "us-east-1" });

/**
 * Transforms generic email details into the SES email parameter structure.
 * @param {Object} message generic email properties
 */
function getSESEmailParams (message) {
    
  const emailParams = {
      Destination: {
        ToAddresses: message.ToAddresses,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: message.HTML,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: message.subject
        },
      },
      Source: process.env.emailSource,
    };

    return emailParams;
}

/**
 * Transforms generic email details into the sending platform structure
 * and "sends" the email.  Uses promises to capture sending details.
 * @param {Object} message the generic email properties
 */
export default function sendEmail(message) {

  let emailParams = getSESEmailParams(message);

  // If we are in offline mode just log the email message.
  if(process.env.IS_OFFLINE) {
      console.log("IN OFFLINE MODE: Will not send email.");
      console.log("Amazon email parameters:\n");
      console.log(emailParams);
      console.log("and the message is:");
      console.log(emailParams.Message.Body.Html);
      return Promise.resolve("ok");
    } else {
      return sender.sendEmail(emailParams).promise();
    }
}
