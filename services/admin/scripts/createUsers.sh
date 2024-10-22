#!/bin/bash

# Variables
USER_POOL_ID="us-east-1_9NXuk7ucb"
INPUT_FILE="users.json"
DYNAMODB_TABLE="onemac-masterclone-one"
DATE=$(date +%s%3N)  # Current timestamp in milliseconds

# Read the JSON file and loop through each user
jq -c '.users[]' $INPUT_FILE | while read -r user; do
  PASSWORD=$(echo $user | jq -r '.password')
  EMAIL=$(echo $user | jq -r '.email')
  FAMILY_NAME=$(echo $user | jq -r '.family_name')
  GIVEN_NAME=$(echo $user | jq -r '.given_name')
  ROLE=$(echo $user | jq -r '.role')

  # Concatenate given name and family name to form full name
  FULL_NAME="$GIVEN_NAME $FAMILY_NAME"

  # Determine territory and GSI fields based on role
  if [ "$ROLE" = "systemadmin" ]; then
    TERRITORY="N/A"
    GSI1SK="Boss"
    GSI1PK="systemadmin#N/A"
  else
    TERRITORY=$(echo $user | jq -r '.territory')
    GSI1SK="statesystemadmin#$TERRITORY"
    GSI1PK="USER"
  fi

  echo "Creating user with email: $EMAIL"

  # Use the email as the username in Cognito
  aws cognito-idp admin-create-user \
      --user-pool-id "$USER_POOL_ID" \
      --username "$EMAIL" \
      --user-attributes Name="email",Value="$EMAIL" \
                        Name="family_name",Value="$FAMILY_NAME" \
                        Name="given_name",Value="$GIVEN_NAME" \
                        Name="email_verified",Value="true" \
      --message-action SUPPRESS

  # Set the password and mark the user as confirmed
  aws cognito-idp admin-set-user-password \
      --user-pool-id "$USER_POOL_ID" \
      --username "$EMAIL" \
      --password "$PASSWORD" \
      --permanent

  echo "User created with email (used as username): $EMAIL"

  # Insert ContactInfo record into DynamoDB
  aws dynamodb put-item --table-name "$DYNAMODB_TABLE" --item \
    '{"pk": {"S": "'"$EMAIL"'"},
      "sk": {"S": "ContactInfo"},
      "email": {"S": "'"$EMAIL"'"},
      "fullName": {"S": "'"$FULL_NAME"'"},
      "GSI1pk": {"S": "'"$GSI1PK"'"},
      "GSI1sk": {"S": "'"$EMAIL"'"} }'

  echo "ContactInfo record created for user: $EMAIL"

  # Insert Roles record into DynamoDB
  aws dynamodb put-item --table-name "$DYNAMODB_TABLE" --item \
    '{"pk": {"S": "'"$EMAIL"'"},
      "sk": {"S": "v0#'"$ROLE"'#'"$TERRITORY"'"},
      "date": {"N": "'"$DATE"'"},
      "doneByEmail": {"S": "'"$EMAIL"'"},
      "doneByName": {"S": "'"$FULL_NAME"'"},
      "email": {"S": "'"$EMAIL"'"},
      "fullName": {"S": "'"$FULL_NAME"'"},
      "GSI1pk": {"S": "'"$GSI1PK"'"},
      "GSI1sk": {"S": "'"$GSI1SK"'"},
      "GSI2pk": {"S": "'"$ROLE"'#'"$TERRITORY"'"},
      "GSI2sk": {"S": "active"},
      "Latest": {"S": "1"},
      "role": {"S": "'"$ROLE"'"},
      "status": {"S": "active"},
      "territory": {"S": "'"$TERRITORY"'"} }'

  echo "Roles record created for user: $EMAIL"
done