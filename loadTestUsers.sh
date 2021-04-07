#!/bin/bash

#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#

if [ -z "$1" ]; then
    echo "usage:  loadTestUsers <github branch name>"
else
  stage=$1
  #userList=$2

  #
  # Check if Table already Loaded, Do not load a second time
  #
  userTable=cms-spa-form-${stage}-user-profiles
  lineCount=`aws dynamodb scan --table-name $userTable | wc -l`

  if [ $lineCount -lt -6 ]; then
    pushd services/app-api
    serverless dynamodb seed --online --seed=domain
    popd
  fi
 
  aws dynamodb scan --table-name $userTable

fi
