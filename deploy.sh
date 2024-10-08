#!/bin/bash

stage=${1:-dev}

install_deps() {
  if [ "$CI" == "true" ]; then # If we're in a CI system
    if [ ! -d "node_modules" ]; then # If we don't have any node_modules (CircleCI cache miss scenario), run npm ci.  Otherwise, we're all set, do nothing.
      npm ci --legacy-peer-deps
    fi
  else # We're not in a CI system, let's npm install
    npm install --legacy-peer-deps
  fi
}

deploy() {
  pushd services/$1
  install_deps
  serverless deploy --stage $stage --verbose
  popd
}

install_deps

# Run deploy for each folder
services=(
  'ui'
  'uploads'
  'app-api'
  'email'
  'one-stream'
  'seatool-sink'
  'ui-waf-log-assoc'
  'ui-auth'
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
