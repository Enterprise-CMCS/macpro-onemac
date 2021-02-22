#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#
stage=$1
userList=$2
adminUser=$3

userTable=cms-spa-form-${stage}-users
testUserStatuses=(PendingAccess ActiveAccess PendingAccess ActiveAccess, AccessDenied AccessRevoked)
testUserRoles=(StateAdmin StateUser CMSRoleApprover StateUser CMSReviewer StateUser)
testStates=(AL AL VA VA AL VA)

#
# Check if Table already Loaded, Do not load a second time
#
lineCount=1 #`aws dynamodb scan --table-name $userTable | wc -l`
if [ $lineCount -gt -6 ]
then
  i=0
  for user in `cat $userList`
  do
    echo 'DEBUG: aws dynamodb put-item --table-name $userTable --item  {  "userId": { "S": "'${user}'" }, "userRole": { "S": "'${testUserRoles[$i]}'" },"stateCodes": { "L": [ { "M": { "MI":{ "S":"'${testUserStatuses[$i]}'" } } }, { "M": { "'${testStates[i]}'":{ "S":"'${testUserStatuses[$i]}'" } } }] } } '
    echo '{  "userId": { "S": "'${user}'" }, "userRole": { "S": "'${testUserRoles[$i]}'" },"stateCodes": { "L": [ { "M": { "MI":{ "S":"'${testUserStatuses[$i]}'" } } }, { "M": { "'${testStates[i]}'":{ "S":"'${testUserStatuses[$i]}'" } } }] } } ' > user.json
    aws dynamodb put-item --table-name $userTable --item file://user.json
    i=`expr $i + 1`
    if [ $i -gt 5 ]
    then
      i=1
    fi

  done
fi

aws dynamodb scan --table-name $userTable
