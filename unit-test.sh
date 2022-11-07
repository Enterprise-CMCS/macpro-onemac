#!/bin/bash

RET=0

for d in services/*/; do
  pushd $d
  if [ "`jq '.scripts.test' <package.json`" != null ]; then
    npm clean-install

    # if tests fail for any one of the packages, record the failure and test the rest
    if ! npm test -- --coverage --ci --reporters='default' --reporters='../../github-actions-reporter'; then
      echo "failed in $d"
      RET=1
      # looks like there is an unhandled promise in a part we can't change....
      # RET=0
    fi
  fi
  popd
done

exit $RET