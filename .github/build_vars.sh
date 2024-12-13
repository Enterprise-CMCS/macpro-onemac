#!/bin/bash

var_list=(
  AWS_OIDC_ROLE_TO_ASSUME
  AWS_DEFAULT_REGION
  INFRASTRUCTURE_TYPE  
  ROUTE_53_HOSTED_ZONE_ID
  ROUTE_53_DOMAIN_NAME
  CLOUDFRONT_CERTIFICATE_ARN
  CLOUDFRONT_DOMAIN_NAME
  METRICS_USERS
  STAGE_PREFIX
  OKTA_METADATA_URL
  SLACK_WEBHOOK_URL
  COGNITO_TEST_USERS_PASSWORD
  NO_EMAIL_DEBUG
  REACT_APP_GOOGLE_TAG
  REACT_APP_LD_CLIENT_ID
)

set_value() {
  varname=${1}
  if [ ! -z "${!varname}" ]; then
    echo "Setting $varname"
    echo "${varname}=${!varname}" >> $GITHUB_ENV
  fi
}

set_name() {
  varname=${1}
  echo "BRANCH_SPECIFIC_VARNAME_$varname=${branch_name//-/_}_$varname" >> $GITHUB_ENV
}

action=${1}

case "$1" in
set_names)
  for i in "${var_list[@]}"
  do
    set_name $i
  done
  ;;
set_values)
  for i in "${var_list[@]}"
  do
  set_value $i
  done
  ;;
esac
