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

  testuser="stateuserdenied@cms.hhs.local"

  testuser="stateuserrevoked@cms.hhs.local"

#
# Test State Admins
#

  stateadmin="stateadminactive@cms.hhs.local"

  stateadmin="stateadminpending@cms.hhs.local"

  stateadmin="stateadmindenied@cms.hhs.local"

  stateadmin="stateadminrevoked@cms.hhs.local"


#
# Test CMS Approvers
#

testUserStatuses=(pending active pending active denied revoked)

  cmsapprover="cmsapproveractive@cms.hhs.local"

  cmsapprover="cmsapproverpending@cms.hhs.local"

  cmsapprover="cmsapproverdenied@cms.hhs.local"

  cmsapprover="cmsapproverrevoked@cms.hhs.local"

#
# Legacy Test Users
#
  stateuser="user2@cms.hhs.local"

  stateuser="user3@cms.hhs.local"

  stateuser="user4@cms.hhs.local"


  stateuser="user5@cms.hhs.local"


fi

aws dynamodb scan --table-name $userTable
