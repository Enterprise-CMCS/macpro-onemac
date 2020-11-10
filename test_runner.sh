#!/bin/sh

export PATH=$PATH:/nightwatch/bin/nightwatch
CMD=$(./nightwatch -c ./conf/nightwatch.conf.js)
TEST_TYPE="$1"
OPT="$2"

case "$TEST_TYPE" in
"-r" | "--regression")
  $CMD -t regression | tee out.log || echo "Error on test run. See out.log" && exit 2
;;
"-a" | "--all")
  $CMD | tee out.log || echo "Error on test run. See out.log" && exit 2

;;
"-s --smoke")
  $CMD -t smoke | tee out.log || echo "Error on test run. See out.log" && exit 2

;;
"-l --login")
  $CMD -t login | tee out.log || echo "Error on test run. See out.log" && exit 2
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