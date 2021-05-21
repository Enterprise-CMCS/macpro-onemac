#!/bin/bash


set -e

case $1 in
'--dev')
 echo "Running Unit Test"
 ./runUnitTest.sh
 echo "Running Nightwatch Test"
  npm install && npm run regression-dev >&1 || exit 1
  sleep 3
  ;;

*)
  echo "Testing the new Suites first"
  (npm install && npm run regression-master >&1) || (npm install && npm run regression-dev >&1) || exit 1
  ;;
esac
