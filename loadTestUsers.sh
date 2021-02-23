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
    attributes1='{ "M": { "stateCode":{ "S":"MI" } }, { "M": { "status":"'${testUserStatuses[$i]}'" }, { "M": { "date":"'${createddate}'" }  }   } }'
    attributes2='{ "M": { "stateCode":{ "S":"'${testStates[i]}'" } }, { "M": { "status":"'${testUserStatuses[$i]}'" }, { "M": { "date":"'${createddate}'" }  }   } }'
    echo 'DEBUG: aws dynamodb put-item --table-name $userTable --item  {  "id": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } '
    echo '{  "id": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } ' > user.json
    aws dynamodb put-item --table-name $userTable --item file://user.json
    i=`expr $i + 1`
    if [ $i -gt 5 ]
    then
      i=1
    fi

  done
fi

aws dynamodb scan --table-name $userTable
