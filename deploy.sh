#!/bin/bash

stage=${1:-dev}

services=(
  'uploads'
  'app-api'
  'stream-functions'
  'ui'
  'ui-waf-log-assoc'
  'ui-auth'
  'ui-src'
)

# These test users are only available in DEV environments.
TEST_USERS=('stateuseractive@cms.hhs.local'
  'stateuserpending@cms.hhs.local'
  'stateuserdenied@cms.hhs.local'
  'stateuserrevoked@cms.hhs.local'
  'stateadminactiveMI@cms.hhs.local'
  'stateadminactiveVA@cms.hhs.local'
  'stateuserunregistered@cms.hhs.local'
  'stateadminactive@cms.hhs.local'
  'stateadminpending@cms.hhs.local'
  'stateadmindenied@cms.hhs.local'
  'stateadminrevoked@cms.hhs.local'
  'stateadminunregistered@cms.hhs.local'
  'cmsapproveractive@cms.hhs.local'
  'cmsapproverpending@cms.hhs.local'
  'cmsapproverdenied@cms.hhs.local'
  'cmsapproverrevoked@cms.hhs.local'
  'systemadmintest@cms.hhs.local'
  'cmsapproverunregistered@cms.hhs.local')

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
          case $user in
            cms*)
              cms_role=onemac-cms-user
              ;;
            state*)
              cms_role=onemac-state-user
              ;;
            *)
              cms_role=
              ;;
          esac

          # We ignore all the errors if the user exists.
          set +e
          aws cognito-idp admin-create-user --user-pool-id $cognito_user_pool_id --message-action SUPPRESS --username $user \
          --user-attributes Name=given_name,Value=TestFirstName Name=family_name,Value=TestLastName Name=custom:cms_roles,Value=$cms_role
          aws cognito-idp admin-set-user-password --user-pool-id $cognito_user_pool_id --username $user --password $TEST_USER_PASSWORD --permanent
          set -e
      done
      ./loadTestUsers.sh $stage
      
      # Only Run Once or Manaully 
      #  ./loadExistingUsers.sh $stage
  else
      echo "ERROR: There was an error obtaining AWS resource information to create users."
      exit 1
  fi
fi

#
#Add System Admin User

#
#
# This user is available in both DEV and PROD
#
echo '{  "id": { "S": "sabrina.mccrae@cms.hhs.gov" },  "type": { "S": "systemadmin" } }' > user.json
userTable=cms-spa-form-${stage}-user-profiles
aws dynamodb put-item --table-name $userTable --item file://user.json


echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./services/output.sh services/ui ApplicationEndpointUrl $stage`
------------------------------------------------------------------------------------------------

"""
