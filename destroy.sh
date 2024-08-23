#!/bin/bash
set -e

if [[ $1 == "" ]] ; then
    echo 'ERROR:  You must pass a stage to destroy.  Ex. sh destroy.sh my-stage-name'
    exit 1
fi
stage=$1

echo "Collecting information on stage $stage before attempting a destroy..."

# Find cloudformation stacks associated with stage
filteredStackList=(`aws cloudformation describe-stacks | jq -r ".Stacks[] | select(.Tags[] | select(.Key==\"STAGE\") | select(.Value==\"$stage\")) | .StackName"`)

echo """
********************************************************************************
- Check the following carefully -
********************************************************************************
"""

echo "The following stacks will be destroyed:"
printf '%s\n' "${filteredStackList[@]}"

echo """
********************************************************************************
- Scroll up and check carefully -
********************************************************************************
"""
if [ "$CI" != "true" ]; then
  read -p "Do you wish to continue?  Re-enter the stage name to continue:  " -r
  echo
  if [[ ! $REPLY == "$stage" ]]
  then
      echo "Stage name not re-entered.  Doing nothing and exiting."
      exit 1
  fi
fi

for i in "${filteredStackList[@]}"
do
  echo 'starting destroy on stack: ' $i
  # Get list of buckets in this stack
  filteredBucketList=(`aws cloudformation list-stack-resources --stack-name $i --output text --query 'StackResourceSummaries[?ResourceType==\`AWS::S3::Bucket\`].PhysicalResourceId'`)
  echo 'Turning off Versioning and Emptying buckets...'
  for x in "${filteredBucketList[@]}"
  do
    echo 'Emptying bucket ' $x
    #turning off bucket versioning
    echo `aws s3api put-bucket-versioning --bucket $x --versioning-configuration Status=Suspended`
    #delete any previously versioned files and deletion markers
    echo `aws s3api delete-objects --bucket $x --delete "$(aws s3api list-object-versions --bucket $x --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}')"`
    echo `aws s3api delete-objects --bucket $x --delete "$(aws s3api list-object-versions --bucket $x --query='{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId}}')"`
    #delete any unversioned files
    echo `aws s3 rm s3://$x/ --recursive`
    #turn off writes to bucket
    echo 'Denying writes to bucket ' $x
    echo `aws s3api put-bucket-policy --bucket $x --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::'"$x"'/*"
        }
      ]
    }'`
    #force delete the bucket
    echo 'Deleting bucket ' $x
    echo `aws s3api rb s3://$x --force`
  done
  echo 'deleting stack: ' $i
  echo `aws cloudformation delete-stack --stack-name $i`
done
