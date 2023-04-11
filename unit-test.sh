#!/bin/bash

RET=0

for d in services/*/; do
  pushd $d
  if [ "`jq '.scripts.test' <package.json`" != null ]; then
    npm clean-install

    # if tests fail for any one of the packages, record the failure and test the rest
    if ! npm test -- --coverage --ci --detectOpenHandles --reporters='default' --reporters='../../github-actions-reporter'; then
      echo "failed in $d"
      RET=1
    fi
  fi
  popd
done

exit $RET