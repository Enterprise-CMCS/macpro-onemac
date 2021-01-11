#!/bin/bash

set -e

npm update && npm run regression >&1 || exit 1
