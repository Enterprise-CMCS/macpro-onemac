#!/bin/bash

stage=${1:-dev}

install_deps() {
  local islayer=false # Flag to track whether we navigated into the nodejs folder

  # Check if we're inside a layer directory (layers have a 'nodejs' folder)
  if [ -d "nodejs" ]; then
    # If we're in a Lambda layer, navigate to the 'nodejs' folder
    cd nodejs
    islayer=true  # Set the flag to true since we navigated into nodejs
  fi

  if [ "$CI" == "true" ]; then # If we're in a CI system
    if [ ! -d "node_modules" ]; then # If we don't have any node_modules (CircleCI cache miss scenario), run npm ci.  Otherwise, we're all set, do nothing.
      npm ci --legacy-peer-deps
    fi
  else # We're not in a CI system, let's npm install
    npm install --legacy-peer-deps
  fi

  # If we navigated to the nodejs folder (i.e., for a layer), go back to the root folder
  if [ "$islayer" = true ]; then
    cd ..
  fi
}

deploy() {
  pushd services/$1
  install_deps
  serverless deploy --stage $stage
  popd
}

install_deps

services=(
  'ui'
  'uploads'
  'layers/aws-sdk-v2-layer'
  'ui-auth'  # Moved ui-auth to before app-api to resolve environment variable fetched by serverless in app-api 
  'app-api' 
  'email'
  'one-stream'
  'seatool-sink'
  'ui-waf-log-assoc'
  'ui-src'
  'admin'
)

# Only deploy for higher envs
if [[ "$stage" == "develop" || "$stage" == "master" || "$stage" == "production" ]]; then
  services+=('source')
  services+=('cross-acct')
fi

set -e
for i in "${services[@]}"; do
    deploy $i
done

echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./services/output.sh services/ui ApplicationEndpointUrl $stage`
------------------------------------------------------------------------------------------------

"""
