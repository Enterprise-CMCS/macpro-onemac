 #
 # Load DynamoDB User Table with User Status and Roles for Existing Submissions
 #set -x

 if [ -z "$1" ]
 then
     echo "usage:  loadExistingUsers <github branch name>"
 else


 branchName=$1
 userTable="onemac-${branchName}-user-profiles"

 for line in `cat ./pilotusers.list`
 do

   createdDate=`date '+%s'`

   priorEmail=""

   #
   # Create Users for Submissions
   #
   territory=`echo $line | cut -f1 -d:`
   email=`echo $line | cut -f2 -d:`

   cat ./stateSubmitterTemplate.json | sed s/\<replace-email\>/\"${email}\"/ \
                                | sed s/\<replace-territory\>/\"${territory}\"/ \
                                | sed s/\<replace-date\>/\"${createdDate}\"/ \
   > user.json

   cat user.json
   aws dynamodb put-item --table-name $userTable --item file://user.json
 done
 /bin/rm user.json

fi
