#!/bin/bash

var_list=(
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  AWS_DEFAULT_REGION
  INFRASTRUCTURE_TYPE
  CMS_SPA_FORM_FROM_EMAIL
  CMS_SPA_FORM_CMS_EMAIL
  CMS_CHIP_FORM_CMS_EMAIL
  CMS_CHIP_FORM_CC_EMAIL
  ROUTE_53_HOSTED_ZONE_ID
  ROUTE_53_DOMAIN_NAME
  CLOUDFRONT_CERTIFICATE_ARN
  CLOUDFRONT_DOMAIN_NAME
  IAM_PATH
  METRICS_USERS
  IAM_PERMISSIONS_BOUNDARY_POLICY
  STAGE_PREFIX
  OKTA_METADATA_URL
  SLACK_WEBHOOK_URL
  COGNITO_TEST_USERS_PASSWORD
  NO_EMAIL_DEBUG
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
