#!/usr/bin/env bash

if ! command -v node;
then
  echo "Installing Node.js"
  yum -y install wget && wget https://nodejs.org/dist/v14.15.0/node-v14.15.0-linux-x64.tar.xz
  tar -xvf node-v14.15.0-linux-x64.tar.xz && rm -f node-v14.15.0-linux-x64.tar.xz
  LIST=$(ls node-v14.15.0-linux-x64/bin/);
  for i in $LIST; do ln -s /node-v14.15.0-linux-x64/bin/"$i" /usr/bin/"$i"; done;
  echo "Node successfully installed. Running Tests"
else
  echo "Node executable detected. Running Tests"
fi

./test_runner.sh -t regression