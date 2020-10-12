import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { sendCMSEmail, sendStateEmail } from "./libs/email-lib";

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(event, null, 2));
  data.createdDate = Date.now();

  let params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      amendmentId: uuid.v1(),
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      territory: data.territory,
      uploads: data.uploads,
      createdAt: data.createdDate,
    },
  };

  if (event.path=='/waivers') {
    params.Item.changeRequestType = 'waiver';
    params.Item.transmittalNumber = data.waiverNumber;
    params.Item.waiverNumber = data.waiverNumber;
    params.Item.summary = data.summary;
    params.Item.actionType = data.actionType;
    params.Item.waiverAuthority = data.waiverAuthority;
  } else {
    params.Item.changeRequestType = 'amendment';
    params.Item.transmittalNumber = data.transmittalNumber;
    params.Item.urgent = data.urgent;
    params.Item.comments = data.comments;
  }

  await dynamoDb.put(params);
  await sendCMSEmail(params.Item);

  //An error sending the State user email is not a failure, but it needs to be recorded.
  try {
    await sendStateEmail(params.Item);
  } catch (error) {
    console.log(
      "Warning: There was an error sending the email to the State User.",
      error
    );
  }

  console.log("Successfully submitted change request:", params);

  return params.Item;
});
