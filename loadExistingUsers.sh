#
# Load DynamoDB User Table with User Status and Roles for Existing Submissions
#
#set -x

awsScanRaw=./testSubmissions.raw
awsScanFormatted=./testSubmissions.txt

branchName=$1
userTable="cms-spa-form-${branchName}-user-profiles"
submissionTable=cms-spa-form-${branchName}-change-requests

aws dynamodb scan --table-name ${submissionTable} --projection-expression "#sw.#sw2,#terr" --expression-attribute-names '{"#sw":"user","#sw2":"email","#terr": "territory"}' --output text | grep -v "None" | cut -f2 > ${awsScanRaw}

#
# Format the AWS Scan output into simple uniq user list of users and statecodes
#
while IFS= read -r territory; do
   read -r email
   echo "${email}:$territory;" >> tmpFormatted.tmp
done < ${awsScanRaw}

/usr/bin/sort tmpFormatted.tmp | uniq > ${awsScanFormatted}

createddate=`date '+%s'`

priorEmail=""
states=""

#
# Create Users for Submissions
#
while IFS= read -r line; do
   email=`echo $line | cut -f1 -d:`
   territory=`echo $line | cut -f2 -d:`
   if [ "${priorEmail}" != "${email}" ]
   then
      if [ "${priorEmail}" != "" ]
      then

        echo '{  "id": { "S": "'${priorEmail}'" }, "type": { "S": "stateuser" }, "attributes": { "L": ['${states}' ] } } ' > user.json
        cat user.json

        aws dynamodb put-item --table-name $userTable --item file://user.json

        echo "-------"
        echo " "
        states=""
      fi

   fi
       if [ "${states}" != "" ]
       then
          states=${states}","
       fi
       states=${states}' { "M":  { "stateCode": { "S": "'${territory}'" }, "status": { "S": "approved" }, "date": { "N": "'${createddate}'" } } }'

  priorEmail=$email

done < ${awsScanFormatted}


echo '{  "id": { "S": "'${priorEmail}'" }, "type": { "S": "stateuser" }, "attributes": { "L": ['${states}' ]  } } ' > user.json
#Show debug info of last user.
cat user.json
# Add last User
aws dynamodb put-item --table-name $userTable --item file://user.json

#
# Clean up temp files
#
/bin/rm tmpFormatted.tmp
/bin/rm user.json
/bin/rm ${awsScanRaw}
/bin/rm ${awsScanFormatted}
