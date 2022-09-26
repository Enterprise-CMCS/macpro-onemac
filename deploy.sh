#!/bin/bash

stage=${1:-dev}

install_deps() {
  if [ "$CI" == "true" ]; then # If we're in a CI system
    if [ ! -d "node_modules" ]; then # If we don't have any node_modules (CircleCI cache miss scenario), run yarn install --frozen-lockfile.  Otherwise, we're all set, do nothing.
      yarn install --frozen-lockfile
    fi
  else # We're not in a CI system, let's yarn install
    yarn install
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
# skip   'stream-functions' while bigMAC is down
services=(
  'ui'
  'uploads'
  'app-api'
  #'stream-functions'
  'ui-waf-log-assoc'
  'ui-auth'
  'ui-src'
  'admin'
)

for i in "${services[@]}"; do
    deploy $i
done

echo """
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
Application endpoint:  `./services/output.sh services/ui ApplicationEndpointUrl $stage`
------------------------------------------------------------------------------------------------

"""
