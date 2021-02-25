#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#
stage=$1
userList=$2

userTable=cms-spa-form-${stage}-users
testUserStatuses=(pending active pending active denied revoked)
testUserRoles=(stateadmin stateuser stateuser cmsapprover stateadmin stateuser)
testStates=(AL AL VA VA AL VA)

#EPOCH Unix Timestamp
createddate=`date '+%s'`
#
# Check if Table already Loaded, Do not load a second time
#
lineCount=`aws dynamodb scan --table-name $userTable | wc -l`
if [ $lineCount -gt -6 ]
then
  i=0
  for user in `cat $userList`
  do
    if [ "${testUserRoles[$i]}" = "stateadmin" ] || [ "${testUserRoles[$i]}" = "stateuser" ]
    then
      attributes1=' { "L": [ { "M": { "stateCode":{ "S":"MI" } } },{ "M": { "status": { "S": "'${testUserStatuses[$i]}'" } } },{ "M": { "date":{ "N":"'${createddate}'"} } } ] }'
      attributes2=' { "L": [ { "M": { "stateCode":{ "S":"'${testStates[i]}'" } } },{ "M": { "status": { "S": "'${testUserStatuses[$i]}'" } } },{ "M": { "date":{ "N":"'${createddate}'"} } } ] }'
      echo 'DEBUG: aws dynamodb put-item --table-name '$userTable' --item  {  "id": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } '
      echo '{  "id": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } ' > user.json
    else
     attributes1=' { "L": [ { "M": { "status": { "S": "'${testUserStatuses[$i]}'" } } },{ "M": { "date":{ "N":"'${createddate}'"} } } ] }'
     echo 'DEBUG: aws dynamodb put-item --table-name '$userTable' --item  {  "id": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}' ] } } '
     echo '{  "id": { "S": "'${user}'" }, "type": { "S": "'${testUserRoles[$i]}'" }, "attributes": { "L": [ '${attributes1}' ] } } ' > user.json
    fi
      aws dynamodb put-item --table-name $userTable --item file://user.json
    i=`expr $i + 1`
    if [ $i -gt 5 ]
    then
      i=1
    fi
  done

  stateadmin="stateadmin1@cms.hhs.local"
  echo 'DEBUG: aws dynamodb put-item --table-name '$userTable' --item  {  "id": { "S": "stateadmin" }, "type": { "S": "stateadmin" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } '
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapprover1@cms.hhs.local"
  echo 'DEBUG: aws dynamodb put-item --table-name '$userTable' --item  {  "id": { "S": "cmsapprover" }, "type": { "S": "stateadmin" }, "attributes": { "L": [ '${attributes1}','${attributes2}' ] } } '
  aws dynamodb put-item --table-name $userTable --item file://user.json

fi

aws dynamodb scan --table-name $userTable
