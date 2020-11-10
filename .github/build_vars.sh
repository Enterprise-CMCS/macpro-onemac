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
  'OKTA_METADATA_URL'
)

set_value() {
  varname=${1}
  if [ ! -z "${!varname}" ]; then
    echo "Setting $varname"
    echo "::set-env name=${varname}::${!varname}"
  fi
}

set_name() {
  varname=${1}
  generic_branch_varname="BRANCH_SPECIFIC_VARNAME_$varname"
  branch_prefix="${branch_name//-/_}"
  branch_varname="${branch_prefix^^}_$varname"
  echo $varname
  echo $generic_branch_varname
  echo $branch_varname
  if [ $varname == "CLOUDFRONT_DOMAIN_NAME" ]
  then
    echo ${branch_varname} : ${!branch_varname}
  fi
  if [ ! -z "${!branch_varname}" ]
  then
     echo "Using custom value in $branch_varname"
  fi
  echo "::set-env name=$generic_branch_varname::$branch_varname"
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
