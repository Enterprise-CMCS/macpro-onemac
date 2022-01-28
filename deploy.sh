#!/bin/bash

stage=${1:-dev}

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
  pushd services/$1
  install_deps
  serverless deploy --stage $stage
  popd
}

install_deps

# Run deploy for each folder
services=(
  'ui'
  'uploads'
  'database'
  'app-api'
  'stream-functions'
  'ui-waf-log-assoc'
  'ui-auth'
  'ui-src'
)

set -e
for i in "${services[@]}"; do
    deploy $i
done

#
#Add System Admin User

#
#
# This user is available in both DEV and PROD
#
echo '{  "id": { "S": "sabrina.mccrae@cms.hhs.gov" }, "firstName": { "S": "Sabrina" }, "lastName": { "S": "McCrae" },  "type": { "S": "systemadmin" } }' > user.json
userTable=cms-spa-form-${stage}-user-profiles
aws dynamodb put-item --table-name $userTable --item file://user.json


echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./services/output.sh services/ui ApplicationEndpointUrl $stage`
------------------------------------------------------------------------------------------------

"""
