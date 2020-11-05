# Script to obtain CloudFormation information from AWS.

if [ $# -lt 2 ]
then
   echo "ERROR: Missing arguments."
   echo "Usage: $1 <target service name> <serverless output variable name> <stage name (optional, default dev)>"
   exit 1
fi

service=${1}
output=${2}
stage=${3:-dev}

if [ "$output" == "url" ]; then
  output="CloudFrontEndpointUrl"
fi

cd $service && serverless info --stage $stage -v | sed -e '1,/^Stack Outputs/d' -e '$d' | sed -n -e "s/^.*$output: //p" && cd ..
