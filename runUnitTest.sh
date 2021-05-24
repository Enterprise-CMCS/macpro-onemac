#!/bin/sh
set -x
cd services/ui-src
cp src/mockjson/mockconfig.js src/utils/config.js
npm test
cp src/mockjson/origconfig.js src/utils/config.js
cat src/utils/config.js

