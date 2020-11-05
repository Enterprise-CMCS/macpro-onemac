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

# Identify if we need test
export ALLOW_DEV_LOGIN=true # We use this export for the ui-src as well.
for excluded_stage in ${test_users_exclude_stages[@]}
do
    if [ $stage == $excluded_stage ]
    then
       export ALLOW_DEV_LOGIN=false
       echo "INFO: Will not set test users in this branch."
       break
    fi
done

# Run deploy
set -e
for i in "${services[@]}"
do
	deploy $i
done


pushd services
set +e

# Add test users as necessary
if [ $ALLOW_DEV_LOGIN == true ]
then
  cognito_region=`./output.sh ui-auth Region $stage`
  cognito_user_pool_client_id=`./output.sh ui-auth UserPoolClientId $stage`
  cognito_user_pool_id=`./output.sh ui-auth UserPoolId $stage`
  if [ ! -z "$cognito_region" -a ! -z "$cognito_user_pool_client_id" -a ! -z "$cognito_user_pool_id" ]
  then
    echo "INFO: Creating test users as needed..."
    for user in ${test_users[@]}
    do
      # Note that when the users already exist then an error is returned, but we will ignore that.
      aws cognito-idp admin-create-user --user-pool-id $cognito_user_pool_id --message-action SUPPRESS --username $user 
      if [ $? -eq 0 ]
      then
        aws cognito-idp admin-set-user-password --user-pool-id $cognito_user_pool_id --username $user --password $test_user_password --permanent
        echo "INFO: Test user $user created."
      else
        echo "INFO: Test user $user already exists."
      fi
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
