#!/bin/sh

export PATH=$PATH:/nightwatch/bin/nightwatch
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