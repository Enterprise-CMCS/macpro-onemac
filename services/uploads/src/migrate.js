import AWS from "aws-sdk";

import { ATTACHMENTS_BUCKET } from "./constants";

const s3 = new AWS.S3();

export async function removePublicRead() {
  let hasMoreResults = true;
  let nextToken;
  const putAclPromises = [];

  while (hasMoreResults) {
    const { Contents, IsTruncated, NextContinuationToken } = await s3
      .listObjectsV2({
        Bucket: ATTACHMENTS_BUCKET,
        ContinuationToken: nextToken,
      })
      .promise();

    hasMoreResults = IsTruncated;
    nextToken = NextContinuationToken;

    for (const { Key } of Contents) {
      putAclPromises.push(
        s3
          .putObjectAcl({ Bucket: ATTACHMENTS_BUCKET, Key, ACL: "private" })
          .promise()
      );
    }
  }

  await Promise.all(putAclPromises);
}
