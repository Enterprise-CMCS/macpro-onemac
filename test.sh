#!/bin/bash


set -e

#Non Nightwatch Branch Ignore:
branch=`git branch --show-current`

if [ "$branch" != "oy2-5385-t1" ]
then

case $1 in
'--dev')
  npm install && npm run regression-dev >&1 || exit 1
  sleep 3
  ;;

*)
  npm install && npm run regression >&1 || exit 1
  ;;
esac

fi
