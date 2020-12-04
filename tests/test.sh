#!/bin/bash

set -e

install_deps() {
  if [ "$CI" == "true" ]; then # If we're in a CI system
    if [ ! -d "node_modules" ]; then # If we don't have any node_modules (CircleCI cache miss scenario), run yarn install --frozen-lockfile.  Otherwise, we're all set, do nothing.
      npm install --frozen-lockfile
    fi
  else # We're not in a CI system, let's yarn install
    npm install
  fi
}

pushd nightwatch
install_deps
#PATH=$(pwd)/node_modules/.bin/:$PATH nightwatch --env firefox --headless
PATH=$(pwd)/node_modules/.bin/:$PATH nightwatch --env chrome --headless
popd
