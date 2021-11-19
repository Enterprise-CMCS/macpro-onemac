import { extractKeyFromApiEvent, extractBucketFromApiEvent } from "./utils";
import { isS3FileTooBig, scanS3Object } from "./antivirus";
import { STATUS_SKIPPED_FILE } from "./constants";

export async function lambdaHandleEvent(event) {
  const s3ObjectKey = extractKeyFromApiEvent(event);
  const s3ObjectBucket = extractBucketFromApiEvent(event);

  const virusScanStatus = (await isS3FileTooBig(s3ObjectKey, s3ObjectBucket))
    ? STATUS_SKIPPED_FILE
    : await scanS3Object(s3ObjectKey, s3ObjectBucket);

  return virusScanStatus;
}
