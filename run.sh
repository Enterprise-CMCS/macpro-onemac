#!/bin/bash

echo $branch_name


okta_branches= [develop,master,production]

for branch_name in ${okta@}
do
  if [ $branch == $okta ]
  ./test.sh

else 
  echo branch is not an okta branch
  ./test.sh --dev
