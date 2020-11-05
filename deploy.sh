#!/bin/bash

set -e

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

echo "CARLOS INSERT"
pushd services
cognito_region=`sh ./output.sh ui-auth Region $stage`
cognito_user_pool_client_id=`sh ./output.sh ui-auth UserPoolClientId $stage`
cognito_user_pool_id=`sh ./output.sh ui-auth UserPoolId $stage`
if [ ! -z "$cognito_region" -a ! -z "$cognito_user_pool_client_id" -a ! -z "$cognito_user_pool_id" ]
then
   aws cognito-idp sign-up \
  --region $cognito_region \
  --client-id $cognito_user_pool_client_id \
  --username user1@sample.com \
  --password Passw0rd!
  aws cognito-idp admin-confirm-sign-up \
  --region $cognito_region \
  --user-pool-id $cognito_user_pool_id \
  --username user1@sample.com
else
   echo "ERROR: Missing something"
fi
popd
echo "CARLOS INSERT"

for i in "${services[@]}"
do
	deploy $i
done

pushd services
echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./output.sh ui CloudFrontEndpointUrl $stage`
------------------------------------------------------------------------------------------------
"""
popd
