#!/usr/bin/env bash


NODE="node-v14.15.0-linux-x64"
TAR="$NODE.tar.xz"
URL="https://nodejs.org/dist/v14.15.0/$TAR"

yum -y install wget
wget "$URL"

tar -xvf $TAR && rm -f $TAR

ln -s "$NODE/bin/node" "/usr/bin/node"

ln -s "$NODE/bin/npm" "/usr/bin/npm"

ln -s "$NODE/bin/npx" "/usr/bin/npx"

cd nightwatch || exit 1

npm install && npm chrome || exit 2