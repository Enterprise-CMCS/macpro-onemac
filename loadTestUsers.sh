#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#
stage=$1
#userList=$2

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

  #
  # Test state users
  #

  testuser="stateuseractive@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateuserpending@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateuserdenied@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "denied" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "denied" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateuserrevoked@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "revoked" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "revoked" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json


#
# Test State Admins
#
  stateadmin="stateadminactive@cms.hhs.local"
  stateadminattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateadmin}'" }, "type": { "S": "stateadmin" }, '${stateadminattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateadmin="stateadminpending@cms.hhs.local"
  stateadminattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateadmin}'" }, "type": { "S": "stateadmin" }, '${stateadminattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateadmin="stateadmindenied@cms.hhs.local"
  stateadminattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "denied" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "denied" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateadmin}'" }, "type": { "S": "stateadmin" }, '${stateadminattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateadmin="stateadminrevoked@cms.hhs.local"
  stateadminattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "revoked" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "revoked" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateadmin}'" }, "type": { "S": "stateadmin" }, '${stateadminattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json


#
# Test CMS Approvers
#

testUserStatuses=(pending active pending active denied revoked)

  cmsapprover="cmsapproveractive@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M": { "status": { "S": "active" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${cmsapprover}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapproverpending@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M": { "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${cmsapprover}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapproverdenied@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M": { "status": { "S": "denied" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${cmsapprover}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapproverrevoked@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M": { "status": { "S": "revoked" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${cmsapprover}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

#
# Legacy Test Users
#
  stateuser="user2@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "AL" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "MI" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateuser="user3@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "AL" }, "status": { "S": "pending" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateuser="user4@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "denied" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "AL" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateuser="user5@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M": { "stateCode": { "S": "MI" }, "status": { "S": "revoked" }, "date": { "N": "'$createddate'" } } }, { "M": { "stateCode": { "S": "VA" }, "status": { "S": "active" }, "date": { "N": "'$createddate'" } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

fi

aws dynamodb scan --table-name $userTable
