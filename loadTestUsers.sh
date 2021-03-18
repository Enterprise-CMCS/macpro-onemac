#
# Load DynamoDB User Table with User Status and Roles for Dev Testing
#
stage=$1
#userList=$2

userTable=cms-spa-form-${stage}-user-profiles

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

  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateuserpending@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "pending" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "pending" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateuserdenied@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "denied" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "denied" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateuserrevoked@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "revoked" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "revoked" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

#
# Test State Admins
#

  testuser="stateadminactive@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateadmin" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateadminpending@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "pending" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "pending" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateadmin" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateadmindenied@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "denied" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "denied" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateadmin" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  testuser="stateadminrevoked@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "revoked" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "revoked" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "stateadmin" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

#
# Test CMS Approvers
#



  testuser="cmsapproveractive@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M":  { "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapproverpending@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M":  { "history": { "L": [ { "M": { "status": { "S": "pending" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapproverdenied@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M":  { "history": { "L": [ { "M": { "status": { "S": "denied" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  cmsapprover="cmsapproverrevoked@cms.hhs.local"
  cmsapproverattributes='"attributes": { "L": [ { "M":  { "history": { "L": [ { "M": { "status": { "S": "revoked" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${testuser}'" }, "type": { "S": "cmsapprover" }, '${cmsapproverattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

#
# Legacy Test Users
#
  stateuser="user1@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateuser="user2@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateuser="user3@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json

  stateuser="user4@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json


  stateuser="user5@cms.hhs.local"
  stateuserattributes='"attributes": { "L": [ { "M":  { "stateCode": { "S": "MI" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } },{ "M":  { "stateCode": { "S": "VA" }, "history": { "L": [ { "M": { "status": { "S": "active" }, "effectiveDate": { "N": "'${createddate}'" }, "doneBy": { "S": "systemsadmin@cms.hhs.local" } } } ] } } } ] }'
  echo '{  "id": { "S": "'${stateuser}'" }, "type": { "S": "stateuser" }, '${stateuserattributes}' } ' > user.json
  aws dynamodb put-item --table-name $userTable --item file://user.json


fi

aws dynamodb scan --table-name $userTable
