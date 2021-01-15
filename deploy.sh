#!/bin/bash

stage=${1:-dev}

services=(
  'uploads'
  'app-api'
  'stream-functions'
  'ui'
  'ui-auth'
  'ui-src'
)

# These test users are only available in DEV environments.
TEST_USERS=(
  'user1@cms.hhs.local'
  'user2@cms.hhs.local'
  'user3@cms.hhs.local'
  'user4@cms.hhs.local'
  'user5@cms.hhs.local'
)

TEST_USER_PASSWORD="Passw0rd!"

# What stages shall NOT have the test users.
test_users_exclude_stages=(
  'master'
  'production'
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

# Add test users as necessary
if [ $ALLOW_DEV_LOGIN == true ]
then
  # Lets first get the emails of developers that have committed to the repo, so we can add the emails as test users.
  # This will also result in adding any new developers in the branch (cumulative).
  dev_emails=`git log --pretty=format:'%ae' | grep -v github.com | sort -u`
  TEST_USERS+=("${dev_emails[@]}")
  echo "INFO: Creating the following test users as needed..."
  echo ${TEST_USERS[@]}
  cognito_user_pool_id=`./services/output.sh services/ui-auth UserPoolId $stage`
  if [ ! -z "$cognito_user_pool_id" ]
  then
      for user in ${TEST_USERS[@]}
      do
          # We ignore all the errors if the user exists.
          set +e
          aws cognito-idp admin-create-user --user-pool-id $cognito_user_pool_id --message-action SUPPRESS --username $user \
          --user-attributes Name=given_name,Value=TestFirstName Name=family_name,Value=TestLastName
          aws cognito-idp admin-set-user-password --user-pool-id $cognito_user_pool_id --username $user --password $TEST_USER_PASSWORD --permanent
          set -e
      done
  else
      echo "ERROR: There was an error obtaining AWS resource information to create users."
      exit 1
  fi
fi


echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./services/output.sh services/ui ApplicationEndpointUrl $stage`
------------------------------------------------------------------------------------------------

"""



export $TEST_USERS=user1@cms.hhs.local
export $TEST_USER_PASSWORD=Passw0rd!
echo $TEST_USERS
echo $TEST_USER_PASSWORD
