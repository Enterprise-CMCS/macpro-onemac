#!/bin/bash

stage=${1:-dev}

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

# Add test users as necessary
if [ $ALLOW_DEV_LOGIN == true ]
then
  sh ./create_test_users.sh $stage
fi

echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./services/output.sh services/ui CloudFrontEndpointUrl $stage`
------------------------------------------------------------------------------------------------
"""
