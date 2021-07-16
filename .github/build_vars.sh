#!/bin/bash

var_list=(
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  AWS_DEFAULT_REGION
  INFRASTRUCTURE_TYPE
  CMS_SPA_FORM_FROM_EMAIL
  CMS_SPA_FORM_CMS_EMAIL
  CMS_CHIP_FORM_CMS_EMAIL
  ROUTE_53_HOSTED_ZONE_ID
  ROUTE_53_DOMAIN_NAME
  CLOUDFRONT_CERTIFICATE_ARN
  CLOUDFRONT_DOMAIN_NAME
  IAM_PATH
  METRICS_USERS
  IAM_PERMISSIONS_BOUNDARY_POLICY
  STAGE_PREFIX
  TEST_STATE_USERS
  TEST_STATE_USER_PASSWORD
  TEST_STATE_ADMIN_USERS
  TEST_STATE_ADMIN_USER_PASSWORD
  TEST_CMS_APPROVER_USERS
  TEST_CMS_APPROVER_USER_PASSWORD
  TEST_CMS_SYSTEM_ADMIN_USERS
  TEST_CMS_SYSTEM_ADMIN_USER_PASSWORD
  OKTA_METADATA_URL
  SLACK_WEBHOOK_URL
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
