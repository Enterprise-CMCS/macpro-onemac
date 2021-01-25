#!/bin/bash



echo $branch_name

if [ "$branch_name" ==  "develop" ]  || [ "$branch_name" = "master" ]
then
  ./test.sh
else
  ./test.sh --dev
fi
