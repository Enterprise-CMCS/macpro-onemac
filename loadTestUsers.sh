#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#
stage=$1
userList=$2
adminUser=$3

userTable=cms-spa-form-${stage}-users
testUserStatuses=(pending active pending active, denied revoked)
testUserRoles=(stateadmin stateuser stateuser cmsreviewer stateuser)
testStates=(AL AL VA VA AL VA)
createddate=`date '+%d-%m-%y'`
#
# Check if Table already Loaded, Do not load a second time
#
lineCount=`aws dynamodb scan --table-name $userTable | wc -l`
if [ $lineCount -gt -6 ]
then
  i=0
  for user in `cat $userList`
  do
    attributes1=' { "L": [ { "M": { "stateCode":{ "S":"MI" } } },{ "M": { "status": { "S": "'${testUserStatuses[$i]}'" } } },{ "M": { "date":{ "S":"'${createddate}'"} } } ] }'
    attributes2=' { "L": [ { "M": { "stateCode":{ "S":"'${testStates[i]}'" } } },{ "M": { "status": { "S": "'${testUserStatuses[$i]}'" } } },{ "M": { "date":{ "S":"'${createddate}'"} } } ] }'
    echo 'DEBUG: aws dynamodb put-item --table-name '$userTable' --item  {  "userId": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } '
    echo '{  "userId": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } ' > user.json
    aws dynamodb put-item --table-name $userTable --item file://user.json
    i=`expr $i + 1`
    if [ $i -gt 5 ]
    then
      i=1
    fi

  done
fi

aws dynamodb scan --table-name $userTable
