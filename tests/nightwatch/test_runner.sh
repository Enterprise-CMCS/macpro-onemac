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

pushd /tests/nightwatch
install_deps
PATH=$(pwd)/node_modules/.bin/:$PATH
popd




export PATH=$(pwd)/node_modules/.bin/:$PATH
TEST_TYPE="$1"
OPT="$2"

case "$TEST_TYPE" in
"-r" | "--regression")
# shellcheck disable=SC2091
$("./nightwatch -c ./conf/nightwatch.conf.js -t regression") | tee out.log || \
echo "Error on test run. See out.log" && exit 2

;;
"-a" | "--all")
# shellcheck disable=SC2091
$("./nightwatch -c ./conf/nightwatch.conf.js") | tee out.log || \
echo "Error on test run. See out.log" && exit 2

;;
"-s --smoke")
# shellcheck disable=SC2091
$("./nightwatch -c ./conf/nightwatch.conf.js -t smoke") | tee out.log || \
echo "Error on test run. See out.log" && exit 2

;;
"-l --login")

# shellcheck disable=SC2091
$("./nightwatch -c ./conf/nightwatch.conf.js -t login") | tee out.log || \
echo "Error on test run. See out.log" && exit 2
;;

#
#"-e --env")
#  $CMD -e "$OPT" 2>&1 | tee out.log || echo "Error on test run. See out.log" && exit 2
#;;

*)
  MSG='Usage : test_runner.sh CMD \n Commands: -r --regression, -a --all, -s smoke, -l login, -e <name of application>'
  echo "$MSG"
  exit 1
;;
esac
