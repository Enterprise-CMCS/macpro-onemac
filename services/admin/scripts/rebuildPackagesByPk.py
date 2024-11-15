import boto3
import datetime
import json
import logging
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Variables
dynamodb_table = "onemac-masterclone-one"

# Load pk values from an external configuration file with error handling
try:
    with open('pk_values.json', 'r') as file:
        pk_values = json.load(file)
except (FileNotFoundError, json.JSONDecodeError) as e:
    logger.error(f"Error loading pk_values.json: {e}")
    pk_values = []

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(dynamodb_table)

# Counter for updated items
updated_count = 0

# Loop through each pk value
for pk in pk_values:
    # Query DynamoDB for items with the specified pk and sk starting with OneMAC
    response = table.query(
        KeyConditionExpression=Key('pk').eq(pk) & Key('sk').begins_with('OneMAC'),
        ProjectionExpression='pk, sk'
    )

    items = response.get('Items', [])

    # Handle pagination to ensure all items are retrieved
    while 'LastEvaluatedKey' in response:
        response = table.query(
            KeyConditionExpression=Key('pk').eq(pk) & Key('sk').begins_with('OneMAC'),
            ProjectionExpression='pk, sk',
            ExclusiveStartKey=response['LastEvaluatedKey']
        )
        items.extend(response.get('Items', []))

    # Loop through the found items and update them
    for item in items:
        pk_value = item['pk']
        sk_value = item['sk']

        # Update the record to trigger a DynamoDB stream event with error handling
        try:
            table.update_item(
                Key={
                    'pk': pk_value,
                    'sk': sk_value
                },
                UpdateExpression='SET #updatedAt = :timestamp',
                ExpressionAttributeNames={
                    '#updatedAt': 'updatedAt'
                },
                ExpressionAttributeValues={
                    ':timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat()
                }
            )
            logger.info(f"Updated record with pk: {pk_value} and sk: {sk_value} to trigger DynamoDB stream")
            updated_count += 1
        except ClientError as e:
            logger.error(f"Failed to update record with pk: {pk_value} and sk: {sk_value}. Error: {e.response['Error']['Message']}")

# Output the total number of updated items
logger.info(f"Total number of updated items: {updated_count}")