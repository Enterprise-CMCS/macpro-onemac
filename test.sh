#!/bin/bash


set -e

install_deps() {
  if [ "$CI" == "true" ]; then
    if [ ! -d "node_modules" ]; then
      npm ci
    fi
  else
    npm install
  fi
}
install_deps
npm test -- -e chromeHeadless nightwatch/tests/suites
