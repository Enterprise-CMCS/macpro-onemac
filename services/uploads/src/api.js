const utils = require("./utils");
const av = require("./antivirus");
const constants = require("./constants");

async function lambdaHandleEvent(event) {
  const s3ObjectKey = utils.extractKeyFromApiEvent(event);
  const s3ObjectBucket = utils.extractBucketFromApiEvent(event);

  const virusScanStatus = (await av.isS3FileTooBig(s3ObjectKey, s3ObjectBucket))
    ? constants.STATUS_SKIPPED_FILE
    : await av.scanS3Object(s3ObjectKey, s3ObjectBucket);

  return virusScanStatus;
}

module.exports = {
  lambdaHandleEvent: lambdaHandleEvent,
};
