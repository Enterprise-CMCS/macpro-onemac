#!/bin/bash


set -e

case $1 in
'--dev')
  npm install && npm run regression-dev >&1 || exit 1
  sleep 3
  ;;

*)
  echo "Testing the new Suites first"
  (npm install && npm run regression-soon >&1) || (npm install && npm run regression >&1) || exit 1
  ;;
esac
