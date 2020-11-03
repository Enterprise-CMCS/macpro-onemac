import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import getEmailTemplates from "./email-templates/getEmailTemplates";

/**
 * Submit a new record for storage.
 */
export const main = handler(async (event) => {
  let response;

  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(event, null, 2));
  data.createdDate = Date.now();

  if (fieldsValid(data)) {
    // Add required data to the record before storing.
    console.log(event.requestContext.identity);
    data.id = uuid.v1();
    data.createdAt = Date.now();

    //Normalize the user data.
    data.user = {
      id: event.requestContext.identity.cognitoIdentityId,
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.user.signInUserSession.idToken.payload.email,
      firstName: data.user.signInUserSession.idToken.payload.given_name,
      lastName: data.user.signInUserSession.idToken.payload.family_name,
    };
    data.userId = event.requestContext.identity.cognitoIdentityId;

    //Store the data in the database.
    await dynamoDb.put({
      TableName: process.env.tableName,
      Item: data,
    });

    // map the email templates from the data.type
    const emailTemplate = getEmailTemplates(data.type);

    if (emailTemplate) {
      // Now send the CMS email
      await sendEmail(emailTemplate.getCMSEmail(data));

      //An error sending the user email is not a failure.
      try {
        // send the submission "reciept" to the State User
        await sendEmail(emailTemplate.getStateEmail(data));
      } catch (error) {
        console.log(
          "Warning: There was an error sending the user acknowledgement email.",
          error
        );
      }
    } else console.log("No email template for this type!");

    console.log("Successfully submitted amendment:", data);
    response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } else {
    console.log("Invalid submission with missing fields.", data);
    response = {
      statusCode: 500,
      body: JSON.stringify("Invalid submission with missing fields."),
    };
  }

  return response;
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
