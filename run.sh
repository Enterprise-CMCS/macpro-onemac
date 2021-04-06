#!/bin/bash



echo $branch_name

#Non Nightwatch Branch Ignore:

 if [ "$branch_name" ==  "develop" ]  || [ "$branch_name" = "master" ]
 then
  ./test.sh
 else
  echo "This branch is not develop or master, it is $branch_name branch"
  ./test.sh --dev
 fi

