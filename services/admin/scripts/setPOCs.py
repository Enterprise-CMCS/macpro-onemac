import json
import boto3
import os
from botocore.exceptions import ClientError

# Load the list of GSI1SK values from an external file
with open('pk_values.json') as f:
    pk_values = json.load(f)

GSI1PK_VALUES = [
    "SEATool#Medicaid_SPA",
    "SEATool#CHIP_SPA",
    "SEATool#1915b_waivers",
    "SEATool#1915c_waivers"
]

LEAD_ANALYST_JSON = {
    ":leadAnalyst": {
        "L": [
            {
                "M": {
                    "EMAIL": {"S": "onemaccpoc49@gmail.com"},
                    "FIRST_NAME": {"S": "OneMAC"},
                    "INITIALS": {"NULL": True},
                    "LAST_NAME": {"S": "CPOC4"},
                    "OFFICER_ID": {"N": "3743"},
                    "POSITION_ID": {"N": "538"},
                    "TELEPHONE": {"S": "(410) 555-5445"}
                }
            }
        ]
    }
}

ACTION_OFFICERS_JSON = {
    ":actionOfficers": {
        "L": [
            {
                "M": {
                    "EMAIL": {"S": "onemacsrt4@gmail.com"},
                    "FIRST_NAME": {"S": "OneMAC"},
                    "LAST_NAME": {"S": "SRT4"},
                    "OFFICER_ID": {"N": "3740"},
                    "POSITION_ID": {"N": "538"},
                    "TELEPHONE": {"S": "(410) 555-5445"}
                }
            }
        ]
    }
}

dynamodb = boto3.client('dynamodb')
DYNAMODB_TABLE = os.getenv('DYNAMODB_TABLE', 'onemac-masterclone-one')

updated_count = 0

for gsi1pk in GSI1PK_VALUES:
    for gsi1sk in pk_values['pk_values']:
        try:
            # Query DynamoDB for items with the specified gsi1pk and gsi1sk
            response = dynamodb.query(
                TableName=DYNAMODB_TABLE,
                IndexName='GSI1',
                KeyConditionExpression='GSI1pk = :gsi1pk AND GSI1sk = :gsi1sk',
                ExpressionAttributeValues={
                    ':gsi1pk': {'S': gsi1pk},
                    ':gsi1sk': {'S': gsi1sk}
                },
                ProjectionExpression='pk, sk'
            )

            items = response.get('Items', [])

            # Loop through the found items and update them
            for item in items:
                pk = item.get('pk', {}).get('S')
                sk = item.get('sk', {}).get('S')

                # Skip if pk or sk is empty
                if not pk or not sk:
                    continue

                # Update the record by adding or replacing the LEAD_ANALYST and ACTION_OFFICERS properties
                dynamodb.update_item(
                    TableName=DYNAMODB_TABLE,
                    Key={
                        'pk': {'S': pk},
                        'sk': {'S': sk}
                    },
                    UpdateExpression='SET LEAD_ANALYST = :leadAnalyst, ACTION_OFFICERS = :actionOfficers',
                    ExpressionAttributeValues={**LEAD_ANALYST_JSON, **ACTION_OFFICERS_JSON}
                )

                print(f"Updated record with pk: {pk} and sk: {sk} with lead analyst: OneMAC CPOC05")
                updated_count += 1

        except ClientError as e:
            print(f"Error querying or updating item with GSI1pk: {gsi1pk} and GSI1sk: {gsi1sk}: {e}")

print(f"Total number of updated items: {updated_count}")