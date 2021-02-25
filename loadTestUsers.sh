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

  stateuser="user1@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "stateuser" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateadmin="stateadmin1@cms.hhs.local"
  stateadminattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "stateadmin" }, "type": { "S": "stateadmin" }, '${stateadminattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapprover1@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M": { "status": { "S": "active" }, "date": { "N": "'$createddate'" } } }, { "M": {  "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "cmsapprover" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

fi

aws dynamodb scan --table-name $userTable
