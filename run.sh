#!/bin/bash



echo $branch_name

#Non Nightwatch Branch Ignore:
merge_branch=`git log --merges -n 1 | tail -3 | head -1 | cut -d"/" -f2`

if [ "$branch_name" != "oy2-5385-t1" ] || [ "$branch_name" ==  "develop" ] && [ "$merge_branch" = "oy2-5385-t1" ]
then

 if [ "$branch_name" ==  "develop" ]  || [ "$branch_name" = "master" ]
 then
  ./test.sh
 else
  echo "This branch is not develop or master, it is $branch_name branch"
  ./test.sh --dev
 fi

fi
