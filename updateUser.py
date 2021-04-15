import sys
import os
from re import search
import json

if (len(sys.argv) > 4) :
  branchName=sys.argv[1]
  userId=sys.argv[2]
  role=sys.argv[3]
  cognitoPoolId=sys.argv[4]

  userTable="cms-spa-form-" + branchName + "-user-profiles"
  os.system("aws dynamodb scan --table-name " + userTable + " > localUserTestList.json" )

  # Opening JSON file
  f = open('localUserTestList.json')

  data = json.load(f)

  for i in data['Items']:
    #for user in i:
      user=str(i['id'])
      if (search(userId, user) ):
        f = open("user.json", "w")
        f.write("{ \"id\": { \"S\": \"" + userId + "\" }, \"type\": { \"S\": \"" + role + "\" }, \"attributes\": { \"L\": [ { \"M\" : { \"history\" : { \"L\": [ { \"M\" : { \"date\" : { \"N\" : \"1617983752\" }, \"doneBy\" : { \"S\" : \"zlewis@clarityinnovates.com\" }, \"status\" : { \"S\" : \"active\" } } }, { \"M\" : { \"date\" : { \"N\" : \"1617985441\" }, \"doneBy\" : { \"S\" : \"zlewis@clarityinnovates.com\" }, \"status\" : { \"S\" : \"active\" } }} ] }, \"stateCode\" : { \"S\" : \"MI\" } }}]} }")
        f.close()
        cmd2="aws dynamodb put-item --table-name " + userTable + " --item file://user.json"
        os.system(cmd2)

  # Closing file
  f.close()


  os.system("aws cognito-idp admin-create-user --user-pool-id " + cognitoPoolId + " --message-action SUPPRESS --username " + userId + " --user-attributes Name=given_name,Value=TestFirstName ")
  os.system("aws cognito-idp admin-set-user-password --user-pool-id " + cognitoPoolId + " --username " + userId + " --password 'Passw0rd!' --permanent")
else:
  print("usage: updateUser <branchName> <userId> <new role> <cognito Pool Id>")
