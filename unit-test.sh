#!/bin/bash

for d in services/*/; do
  pushd $d
  if [ "`jq '.scripts.test' <package.json`" != null ]; then
    npm clean-install
    npm test -- --coverage
  fi
  popd
done
