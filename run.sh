#!/bin/bash

okta_branches=(
'develop'
'master'
'production'
)

echo $branch_name

if [ "$branch_name" ==  "${okta_branches[@]}" ]
then
  ./test.sh
else
  ./test.sh --dev
fi
