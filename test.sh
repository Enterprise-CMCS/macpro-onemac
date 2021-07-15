#!/bin/bash


set -e

case $1 in
'--dev')
  npm install && npm run regression-dev >&1 || exit 1
  sleep 3
  ;;

*)
  npm install && npm run regression >&1 || exit 1
  ;;
esac
