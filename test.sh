#!/bin/bash
set -e

npm update && npm run regression
=======
pushd tests
sh test.sh
popd
