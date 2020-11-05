#!/bin/bash

stage=${1:-dev}

# These test users are only available in DEV environments.
test_users=(
  'user1@sample.com'
  'user2@sample.com'
  'user3@sample.com'
  'user4@sample.com'
  'user5@sample.com'
)

test_user_password="Passw0rd!"

# What stages shall NOT have the test users.
test_users_exclude_stages=(
  'master'
  'production'
)

services=(
  'uploads'
  'app-api'
  'ui'
  'ui-auth'
  'ui-src'
)

install_deps() {
  if [ "$CI" == "true" ]; then # If we're in a CI system
    if [ ! -d "node_modules" ]; then # If we don't have any node_modules (CircleCI cache miss scenario), run npm ci.  Otherwise, we're all set, do nothing.
      npm ci
    fi
  else # We're not in a CI system, let's npm install
    npm install
  fi
}

deploy() {
  service=$1
  pushd services/$service
  install_deps
  serverless deploy  --stage $stage
  popd
}

install_deps

# Identify if we need the test users.
# Note that we use ALLOW_DEV_LOGIN in ui-src as well to show Dev only login buttons.
export ALLOW_DEV_LOGIN=true 
for excluded_stage in ${test_users_exclude_stages[@]}
do
    if [ $stage == $excluded_stage ]
    then
       export ALLOW_DEV_LOGIN=false
       echo "INFO: Will not set test users in this branch."
       break
    fi
done

# Run deploy for each folder
set -e
for i in "${services[@]}"
do
	deploy $i
done
set +e

pushd services

# Add test users as necessary
if [ $ALLOW_DEV_LOGIN == true ]
then
  # Lets first get the email of the developer that last committed, so we can add the email.
  # This will also result in adding any new developers in the branch (commulative)
  dev_email=`git log -1 --pretty=format:'%ae'`
  test_users+=("$dev_email")
  echo "INFO: Creating test users as needed..."
  cognito_user_pool_id=`./output.sh ui-auth UserPoolId $stage`
  if [ ! -z "$cognito_user_pool_id" ]
  then
    for user in ${test_users[@]}
    do
      # We ignore all the errors if the user exists.
      aws cognito-idp admin-create-user --user-pool-id $cognito_user_pool_id --message-action SUPPRESS --username $user 
      aws cognito-idp admin-set-user-password --user-pool-id $cognito_user_pool_id --username $user --password $test_user_password --permanent
    done
  else
    echo "ERROR: There was an error obtaining AWS resource information to create users."
    exit 1
  fi
fi

echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./output.sh ui CloudFrontEndpointUrl $stage`
------------------------------------------------------------------------------------------------
"""
popd
