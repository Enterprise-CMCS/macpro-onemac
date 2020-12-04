#!/bin/bash

set -e

pushd tests/nightwatch
./test_runner.sh
popd
