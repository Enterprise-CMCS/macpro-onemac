# Script to obtain CloudFormation information from AWS.
if [ $# -lt 2 ]
then
   echo "ERROR: Missing arguments."
   echo "Usage: $1 <service folder> <serverless output variable name> [stage name, defaults to dev]"
   exit 1
fi

service=${1}
output=${2}
stage=${3:-dev}

if [ "$output" == "url" ]; then
  output="CloudFrontEndpointUrl"
fi

service_output=`cd $service && serverless info --stage $stage --verbose`

if [ $? -ne 0 ]
then
  >&2 echo "ERROR trying to obtain serverless app information".
  >&2 echo "$service_output"
  exit 1
else
  echo "$service_output" | sed -n -e "s/^.*$output: //p"
fi