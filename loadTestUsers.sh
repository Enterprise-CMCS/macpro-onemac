#!/bin/bash

#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#

if [ -z "$1" ]; then
    echo "usage:  loadTestUsers <github branch name>"
else
  #
  # Check if Table already Loaded, Do not load a second time
  #
  userTable="cms-spa-form-${1}-user-profiles"
  lineCount=`aws dynamodb scan --table-name $userTable | jq '.Items | length'`

  if [ $lineCount -eq 0 ]; then
    echo "populating User table in DynamoDB"
    pushd services/app-api
    SLS_DEBUG=true BRANCH="$1" serverless dynamodb seed --stage="$1" --region="${AWS_REGION:-$AWS_DEFAULT_REGION}" --seed=domain --online
    popd
  else
    echo "User table is already populated"
  fi
 
  aws dynamodb scan --table-name $userTable

fi
