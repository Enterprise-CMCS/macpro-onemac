import AWS from "aws-sdk";

const sender = new AWS.SES({ region: "us-east-1" });

/**
 * Transforms generic email details into the SES email parameter structure.
 * @param {Object} email generic email properties
 */
function getSESEmailParams(email) {
  const emailParams = {
    ConfigurationSetName: process.env.configurationSetName,
    Destination: {
      ToAddresses: email.ToAddresses,
      CcAddresses: email.CcAddresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email.HTML,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: email.Subject,
      },
    },
    Source: email.fromAddressSource
      ? process.env[email.fromAddressSource]
      : process.env.emailSource,
  };

  return emailParams;
}

/**
 * Transforms generic email details into the sending platform structure
 * and "sends" the email.  Uses promises to capture sending details.
 * @param {Object} email the generic email properties
 */
export default function sendEmail(email) {
  try {
    const emailParams = getSESEmailParams(email);
    console.log("Amazon email parameters: ", emailParams);
    console.log("and the message is: ", emailParams.Message.Body.Html);
    if (process.env.IS_OFFLINE) {
      console.log("IN OFFLINE MODE: Will not send email.");
      return Promise.resolve("ok");
    } else {
      return sender.sendEmail(emailParams).promise();
    }
  } catch (er) {
    console.log(`Warning: Erro occured while sending the confirmation email: 
        ${JSON.stringify(email, null, 2)}, with error: ${er}`);
    return Promise.reject(new Error("Error while sending email"));
  }
}
