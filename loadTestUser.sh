#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#
stage=$1
userList=$2

userTable=cms-spa-form-${stage}-users
testUserStatuses=(PendingAccess ActiveAccess AccessDenied AccessRevoked)
testUserRoles=(StateAdmin StateUser CMSApprover)
testStates=(AL VA TX)

#
# Check is Table already Loaded
#
lineCount=`aws dynamodb scan --table-name $userTable | wc -l`
if [ $lineCount -gt -6 ]
then
  x=1
  i=1
  for user in `cat $userList`
  do
    echo '{  "userId": { "S": "'${user}'" }, "status": { "S": "'${testUserStatuses[$i]}'" }, "userRole": { "S": "'${testUserRoles[$x]}'" },  "stateCodes": { "SS": [ "VA","AL" ] }  }' > user.json
    aws dynamodb put-item --table-name $userTable --item file://user.json
    x=`expr $x + 1`
    i=`expr $i + 1`
    if [ $x -gt 3 ]
    then
        x=1
    fi
    if [ $i -gt 4 ]
    then
      i=1
    fi

  done
fi

aws dynamodb scan --table-name $userTable
