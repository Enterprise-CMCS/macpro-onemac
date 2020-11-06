#!/bin/sh

# Script to create a group of test users for dev testing.  This script uses
# a set list of fake test users and gets a list of developer emails that 
# have committed to the repo to add them as test users as well, so the developers
# can receive the emails.

if [ $# -ne 1 ]
then
   echo "Usage: $1 <stage>"
   exit 1
fi

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

# Lets first get the emails of developers that have committed to the repo, so we can add the emails as test users.
# This will also result in adding any new developers in the branch (cumulative).
dev_emails=`git log --pretty=format:'%ae' | grep -v github.com | sort -u`
TEST_USERS+=("${dev_emails[@]}")
echo "INFO: Creating the following test users as needed..."
echo ${TEST_USERS[@]}
cognito_user_pool_id=`./services/output.sh ui-auth UserPoolId $stage`
if [ ! -z "$cognito_user_pool_id" ]
then
    for user in ${TEST_USERS[@]}
    do
        # We ignore all the errors if the user exists.
        aws cognito-idp admin-create-user --user-pool-id $cognito_user_pool_id --message-action SUPPRESS --username $user \
        --user-attributes Name=given_name,Value=TestFirstName Name=family_name,Value=TestLastName
        aws cognito-idp admin-set-user-password --user-pool-id $cognito_user_pool_id --username $user --password $TEST_USER_PASSWORD --permanent
    done
else
    echo "ERROR: There was an error obtaining AWS resource information to create users."
    exit 1
fi