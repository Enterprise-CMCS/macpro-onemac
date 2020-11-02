
help='This script is run with the format  ./output.sh <target service name> <serverless output variable name> <stage name (optional, default dev)>'
example='ex.  ./output.sh ui CloudFrontEndpointUrl'

: ${1?ERROR: 'You must specify the target service.'
$help
$example}
: ${2?ERROR: "You must specify the variable you want to fetch from serverless' output"
$help
$example}

service=${1}
output=${2}
stage=${3:-dev}

if [ $output == "url" ]; then
  output="CloudFrontEndpointUrl"
fi

cd $service 
service_output=`cd $service && serverless info --stage $stage -v`

if [ $? -ne 0 ]
then
  >&2 echo "ERROR trying to obtain serverless app information".
  >&2 echo "$service_output"
  exit 1
else
  echo "$service_output" | sed -e '1,/^Stack Outputs/d' -e '$d' | sed -n -e "s/^.*$output: //p"
fi

