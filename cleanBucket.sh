#!/bin/bash
set -e

if [[ $1 == "" ]] ; then
    echo 'ERROR:  You must pass a bucket name to delete.'
    exit 1
fi
bucket=$1

echo "\nCollecting information on bucket $bucket before attempting a destroy... This can take a minute or two..."

   
   # Suspend bucket versioning.
  aws s3api put-bucket-versioning --bucket $bucket --versioning-configuration Status=Suspended

  # Remove all bucket versions.
  versions=`aws s3api list-object-versions \
    --bucket "$bucket" \
    --output=json \
    --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}'`
  if ! echo $versions | grep -q '"Objects": null'; then
    echo "in delete objects"
    aws s3api delete-objects \
      --bucket $bucket \
      --delete "$versions" > /dev/null 2>&1
  fi

  # Remove all bucket delete markers.
  markers=`aws s3api list-object-versions \
    --bucket "$bucket" \
    --output=json \
    --query='{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId} }'`
  if ! echo $markers | grep -q '"Objects": null'; then
    aws s3api delete-objects \
      --bucket $bucket \
      --delete "$markers" > /dev/null 2>&1
  fi

  #----End of new code to remove versioning -----
  
  #remove the buckets
  aws s3 rb s3://$bucket
  