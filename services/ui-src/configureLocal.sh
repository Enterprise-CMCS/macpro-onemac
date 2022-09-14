#!/bin/sh

if [ $# -ne 1 ]
then
   echo "Usage: $0 [stage]"
   echo "  If the stage is not specified then the current Git branch is used if it can be detected."
   # First check to see if we can get the stage from Git since it will be the branch
   stage=`git branch --show-current`
   if [ $? -eq 0 ]
   then
      echo "Using your current branch name of $stage as the stage..."
   else
      exit 1
   fi
else
   stage=$1
fi

echo "Fetching CloudFormation information from AWS..."
api_region=`sh ../output.sh ../app-api Region $stage`

if [ -z "$api_region" ]
then
   echo "ERROR: Unable to obtain CloudFormation data for stage $stage."
   echo "Do you have the proper AWS credentials set?"
   echo "Is the stage name $stage correct?"
   echo "Did you, perhaps, forget to run 'npm install'?"
   exit 1
fi

echo "Using api_region: $api_region"
api_url="http://localhost:3001/dev"
echo "Using api_url: $api_url"
cognito_region=`sh ../output.sh ../ui-auth Region $stage`
echo "Using cognito_region: $cognito_region"
cognito_identity_pool_id=`sh ../output.sh ../ui-auth IdentityPoolId $stage`
echo "Using cognito_identity_pool_id: $cognito_identity_pool_id"
cognito_user_pool_id=`sh ../output.sh ../ui-auth UserPoolId $stage`
echo "Using cognito_user_pool_id as $cognito_user_pool_id"
cognito_user_pool_client_id=`sh ../output.sh ../ui-auth UserPoolClientId $stage`
echo "Using cognito_user_pool_client_id as $cognito_user_pool_client_id"
cognito_user_pool_client_domain=`sh ../output.sh ../ui-auth UserPoolClientDomain $stage`
echo "Using cognito_user_pool_client_domain as $cognito_user_pool_client_domain"
s3_attachments_bucket_region=`sh ../output.sh ../uploads Region $stage`
echo "Using s3_attachments_bucket_region: $s3_attachments_bucket_region"
s3_attachments_bucket_name=`sh ../output.sh ../uploads AttachmentsBucketName $stage`
echo "Using s3_attachments_bucket_name: $s3_attachments_bucket_name"

# Now check that we have all that we need
if [ -z "$cognito_region" ] || \
   [ -z "$cognito_identity_pool_id" ] || \
   [ -z "$cognito_user_pool_id" ] || \
   [ -z "$cognito_user_pool_client_id" ] || \
   [ -z "$cognito_user_pool_client_domain" ] || \
   [ -z "$s3_attachments_bucket_region" ] || \
   [ -z "$s3_attachments_bucket_name" ]
then
   echo "ERROR: Unable to obtain all CloudFormation data we need for stage $stage."
   echo "Is the first build for this stage complete?"
   echo "Is the stage name $stage correct?"
   echo "Check the build logs and verify that the build is complete before using this tool."
   exit 1
fi
export STAGE=$stage
export SASS_PATH="node_modules"
export API_REGION=$api_region
export API_URL=$api_url
export COGNITO_REGION=$cognito_region
export COGNITO_IDENTITY_POOL_ID=$cognito_identity_pool_id
export COGNITO_USER_POOL_ID=$cognito_user_pool_id
export COGNITO_USER_POOL_CLIENT_ID=$cognito_user_pool_client_id
export COGNITO_USER_POOL_CLIENT_DOMAIN=$cognito_user_pool_client_domain
export S3_ATTACHMENTS_BUCKET_REGION=$s3_attachments_bucket_region
export S3_ATTACHMENTS_BUCKET_NAME=$s3_attachments_bucket_name
export ALLOW_DEV_LOGIN=true
export IS_OFFLINE=true
export METRICS_EMAILS=`git config user.email`

./env.sh

echo "SUCCESS: Updated environment information."
