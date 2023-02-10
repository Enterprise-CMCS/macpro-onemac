/**
 * Lambda function that will be perform the scan and tag the file accordingly.
 */

import AWS from "aws-sdk";
import crypto from "crypto";
import fs from "fs";

import { downloadAVDefinitions, scanLocalFile } from "./clamav";
import * as utils from "./utils";
import * as constants from "./constants";

const s3 = new AWS.S3();

/**
 * Check if S3 object is larger then the MAX_FILE_SIZE set.
 * @param {string} key       Key of S3 Object
 * @param {string} bucket   Bucket of S3 object
 * @return {Promise<boolean>} True if S3 object is larger then MAX_FILE_SIZE
 */
export async function isS3FileTooBig(key, bucket) {
  try {
    const res = await s3.headObject({ Key: key, Bucket: bucket }).promise();
    return res.ContentLength > constants.MAX_FILE_SIZE;
  } catch (e) {
    utils.generateSystemMessage(
      `Error finding size of S3 Object: s3://${bucket}/${key}`
    );
    return false;
  }
}

function downloadFileFromS3(s3ObjectKey, s3ObjectBucket) {
  if (!fs.existsSync(constants.TMP_DOWNLOAD_PATH)) {
    fs.mkdirSync(constants.TMP_DOWNLOAD_PATH);
  }

  const localPath = `${constants.TMP_DOWNLOAD_PATH}${crypto.randomUUID()}.tmp`;
  const writeStream = fs.createWriteStream(localPath);

  utils.generateSystemMessage(
    `Downloading file s3://${s3ObjectBucket}/${s3ObjectKey}`
  );

  const options = {
    Bucket: s3ObjectBucket,
    Key: s3ObjectKey,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(options)
      .createReadStream()
      .on("end", function () {
        utils.generateSystemMessage(
          `Finished downloading new object ${s3ObjectKey}`
        );
        resolve(localPath);
      })
      .on("error", function (err) {
        console.log(err);
        reject();
      })
      .pipe(writeStream);
  });
}

const scanAndTagS3Object = async (s3ObjectKey, s3ObjectBucket) => {
  utils.generateSystemMessage(
    `S3 Bucket and Key\n ${s3ObjectBucket}\n${s3ObjectKey}`
  );

  let virusScanStatus;

  //You need to verify that you are not getting too large a file
  //currently lambdas max out at 500MB storage.
  if (await isS3FileTooBig(s3ObjectKey, s3ObjectBucket)) {
    virusScanStatus = constants.STATUS_SKIPPED_FILE;
    utils.generateSystemMessage(
      `S3 File is too big. virusScanStatus=${virusScanStatus}`
    );
  } else {
    //No need to act on file unless you are able to.
    utils.generateSystemMessage("Download AV Definitions");
    await downloadAVDefinitions();
    utils.generateSystemMessage("Download File from S3");
    const fileLoc = await downloadFileFromS3(s3ObjectKey, s3ObjectBucket);
    utils.generateSystemMessage("Set virusScanStatus");
    virusScanStatus = scanLocalFile(fileLoc);
    utils.generateSystemMessage(`virusScanStatus=${virusScanStatus}`);
  }

  const taggingParams = {
    Bucket: s3ObjectBucket,
    Key: s3ObjectKey,
    Tagging: utils.generateTagSet(virusScanStatus),
  };

  //tag object with CLEAN tag upon successful av scan
  try {
    await s3.putObjectTagging(taggingParams).promise();
    utils.generateSystemMessage("Tagging successful");
  } catch (err) {
    console.log(err);
  }
  return virusScanStatus;
};

export async function lambdaHandleEvent(event) {
  utils.generateSystemMessage(
    `Start avScan with event ${JSON.stringify(event, null, 2)}`
  );

  let s3ObjectKey, s3ObjectBucket;
  // can run the scanner directly on an s3 Object from console
  if (event.s3ObjectKey && event.s3ObjectBucket) {
    s3ObjectKey = event.s3ObjectKey;
    s3ObjectBucket = event.s3ObjectBucket;
  } else if (
    event.Records &&
    Array.isArray(event.Records) &&
    event.Records[0]?.eventSource === "aws:s3"
  ) {
    s3ObjectKey = utils.extractKeyFromS3Event(event);
    s3ObjectBucket = utils.extractBucketFromS3Event(event);
  } else {
    utils.generateSystemMessage(
      `Event missing s3ObjectKey or s3ObjectBucket: ${JSON.stringify(
        event,
        null,
        2
      )}`
    );
    return constants.STATUS_ERROR_PROCESSING_FILE;
  }

  return await scanAndTagS3Object(s3ObjectKey, s3ObjectBucket);
}
