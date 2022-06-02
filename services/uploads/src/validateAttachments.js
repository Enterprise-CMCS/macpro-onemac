import AWS from "aws-sdk";

import { ATTACHMENTS_BUCKET } from "./constants";
import dynamoDb from "../libs/dynamodb-lib";
import sendEmail from "../libs/email-lib";

const s3 = new AWS.S3();

async function isObjectinS3(item, upload) {
  const s3Params = {
    Bucket: ATTACHMENTS_BUCKET,
    Key: `protected/${item.userId}/${upload.s3Key}`,
  };
  try {
    await s3.headObject(s3Params).promise();
  } catch (err) {
    if (err.code === "NotFound") {
      console.warn("Attachment not found in s3 ", upload);
      return false;
    } else {
      console.error("Unknown attachment issue ", upload);
      return false;
    }
  }
  return true;
}

async function getValidateAttachmentEmailTemplate(
  dataSource,
  attachmentsInError
) {
  let html = `<h1>Attachment Validation Report For ${dataSource} in ${process.env.STAGE}</h1><br><p>The attachment validation process has found ${attachmentsInError.length} attachment issues.</p>`;
  if (attachmentsInError.length > 0) {
    html += `<br><p>The following attachments were found to be in error:</p><p>(Format: PackageId - FileName - Url)</p><br>`;
    for (const attachment of attachmentsInError) {
      html += `<p>${attachment}<p>`;
    }
  }
  html += "<br><p>End of message.<p>";
  return {
    fromAddressSource: "emailSource", //this is the name of the env variable which the email lib uses to lookup
    ToAddresses: process.env.emailToAddresses.split(","),
    Subject: `Attachment Validation Report For ${dataSource} in ${process.env.STAGE}`,
    HTML: html,
  };
}

async function validateChangeRequestUploads(event) {
  console.log("Begin validating change request upload records...", event);

  const dbParams = {
    TableName: process.env.TABLE_NAME,
    ExclusiveStartKey: null,
  };

  const attachmentsInError = [];
  do {
    const results = await dynamoDb.scan(dbParams);
    console.log(
      "retrieved %d items with last key %s",
      results.Items.length,
      results.LastEvaluatedKey
    );
    for (const item of results.Items) {
      for (const upload of item.uploads) {
        const isInS3 = await isObjectinS3(item, upload);
        if (!isInS3) {
          //add upload to error array
          attachmentsInError.push(
            `${item.transmittalNumber} - ${upload.filename} - ${upload.url}`
          );
        }
      }
    }

    dbParams.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (dbParams.ExclusiveStartKey);

  //send email
  const emailTemplate = await getValidateAttachmentEmailTemplate(
    "Change Requests",
    attachmentsInError
  );

  console.log(
    "Attachment Validation Report for Change Request Table:",
    emailTemplate
  );

  if (
    emailTemplate.fromAddressSource.trim().length > 0 &&
    emailTemplate.ToAddresses.length > 0
  ) {
    await sendEmail(emailTemplate); //only send email if from and to addresses are configured
  } else {
    console.log("Email addresses not configured - email not sent.");
  }

  console.log(
    "finished validating all upload records in change requests table"
  );
}

async function validateOneMacAttachments(event) {
  console.warn(
    "Validation of onemac table attachments is not yet implemented",
    event
  );
}

export async function validate(event) {
  if (process.env.VALIDATE_CHANGE_REQUESTS === "true") {
    await validateChangeRequestUploads(event);
  } else {
    console.log(
      "Validation of change request table uploads is not enabled -- skipping"
    );
  }

  if (process.env.VALIDATE_ONEMAC === "true") {
    await validateOneMacAttachments(event);
  } else {
    console.log(
      "Validation of onemac table attachments is not enabled -- skipping"
    );
  }
}
