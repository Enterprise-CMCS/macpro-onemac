#!/bin/sh
#set -x
cd services/ui-src
cp src/utils/config.js src/mockjson
cp src/mockjson/mockconfig.js src/utils/config.js
npm test
cp src/mockjson/config.js src/utils/config.js
