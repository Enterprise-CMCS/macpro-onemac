#!/bin/bash

var_list=(
  'AWS_ACCESS_KEY_ID'
  'AWS_SECRET_ACCESS_KEY'
  'AWS_DEFAULT_REGION'
  'INFRASTRUCTURE_TYPE'
  'CMS_SPA_FORM_FROM_EMAIL'
  'CMS_SPA_FORM_CMS_EMAIL'
  'ROUTE_53_HOSTED_ZONE_ID'
  'ROUTE_53_DOMAIN_NAME'
  'CLOUDFRONT_CERTIFICATE_ARN'
  'CLOUDFRONT_DOMAIN_NAME'
  'IAM_PATH'
  'IAM_PERMISSIONS_BOUNDARY_POLICY'
  'STAGE_PREFIX'
  'VPC_ID'
  'DATA_SUBNET_ID_1'
  'DATA_SUBNET_ID_2'
  'DATA_SUBNET_ID_3'
  'PRIVATE_SUBNET_ID_1'
  'PRIVATE_SUBNET_ID_2'
  'PRIVATE_SUBNET_ID_3'
  'PUBLIC_SUBNET_ID_1'
  'PUBLIC_SUBNET_ID_2'
  'PUBLIC_SUBNET_ID_3'
  'BIGMAC_NAME'
  'OKTA_METADATA_URL'
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
