
set -e

if [ $# -ne 1 ]
then
   echo "Usage: $0 <stage>"
   exit 1
fi

stage=$1

echo "Fetching CloudFormation information from AWS..."
api_region=`sh ../output.sh ../app-api Region $stage`

if [ -z "$api_region" ]
then
   echo "ERROR: Unable to obtain CloudFormation data for stage $stage."
   echo "Do you have the proper AWS credentials set?"
   echo "Is the stage name $stage correct?"
   exit 1
fi

echo "Using api_region as $api_region"
api_url=`sh ../output.sh ../app-api ApiGatewayRestApiUrl $stage`
echo "Using api_url as $api_url"
cognito_region=`sh ../output.sh ../ui-auth Region $stage`
echo "Using cognito_region as $cognito_region"
cognito_identity_pool_id=`sh ../output.sh ../ui-auth IdentityPoolId $stage`
echo "Using cognito_identity_pool_id as $cognito_identity_pool_id"
cognito_user_pool_id=`sh ../output.sh ../ui-auth UserPoolId $stage`
echo "Using cognito_user_pool_id as $cognito_user_pool_id"
cognito_client_id=`sh ../output.sh ../ui-auth UserPoolClientId $stage`
echo "Using cognito_client_id as $cognito_client_id"
s3_attachments_bucket_region=`sh ../output.sh ../uploads Region $stage`
echo "Using s3_attachments_bucket_region as $s3_attachments_bucket_region"
s3_attachements_bucket_name=`sh ../output.sh ../uploads AttachmentsBucketName $stage`
echo "Using s3_attachements_bucket_name as $s3_attachements_bucket_name"

export API_REGION=$api_region
export API_URL=$api_url
export COGNITO_REGION=$cognito_region
export COGNITO_IDENTITY_POOL_ID=$cognito_identity_pool_id
export COGNITO_USER_POOL_ID=$cognito_user_pool_id
export COGNITO_CLIENT_ID=$cognito_client_id
export S3_ATTACHMENTS_BUCKET_REGION=$s3_attachments_bucket_region
export S3_ATTACHMENTS_BUCKET_NAME=$s3_attachements_bucket_name

./env.sh
