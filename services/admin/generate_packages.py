import boto3
import random
import time
from datetime import datetime, timedelta
import os
from botocore.exceptions import ClientError

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Get table name from environment variable or use default
table_name = os.getenv('TABLE_NAME', 'onemac-develop-one')
table = dynamodb.Table(table_name)

# Define different component configurations
component_config = {
    "medicaidspa": {
        "componentType": "medicaidspa",
        "GSI1pk": "OneMAC#submitmedicaidspa",
        "GSI1sk_prefix": "OneMAC#",
        "second_GSI1pk": "SEATool#Medicaid_SPA"
    },
    "chipspa": {
        "componentType": "chipspa",
        "GSI1pk": "OneMAC#submitchipspa",
        "GSI1sk_prefix": "OneMAC#",
        "second_GSI1pk": "SEATool#CHIP_SPA"
    },
    "waivernew": {
        "componentType": "waivernew",
        "GSI1pk": "OneMAC#submitwaivernew",
        "GSI1sk_prefix": "OneMAC#",
        "second_GSI1pk": "SEATool#1915b_waivers"
    },
    "waiverappk": {
        "componentType": "waiverappk",
        "GSI1pk": "OneMAC#submitwaiverappk",
        "GSI1sk_prefix": "OneMAC#",
        "second_GSI1pk": "SEATool#1915c_waivers"
    }
}

# Function to generate random ID and timestamps, ensuring no duplicate IDs
generated_ids = set()

def generate_ids_and_timestamps(state_code, component_type):
    current_year = datetime.now().year % 100  # last 2 digits of the year
    while True:
        if component_type == "waivernew":
            random_id = f"{state_code}-{random.randint(10000, 99999)}.R00.00"
        elif component_type == "waiverappk":
            random_id = f"{state_code}-{random.randint(10000, 99999)}.R00.01"
        else:
            random_id = f"{state_code}-{current_year}-{random.randint(1000, 9999)}"
        
        if random_id not in generated_ids:
            generated_ids.add(random_id)
            break

    # Generate two timestamps within the last 90 days
    now = int(time.time() * 1000)
    start_time = now - (random.randint(0, 90) * 24 * 3600 * 1000)
    end_time = start_time + random.randint(1, 600000)  # Ensure second timestamp is slightly later
    return random_id, start_time, end_time

# default LEAD_ANALYST and ACTION_OFFICERS
default_lead_analyst = [
    {
        "EMAIL": "onemaccpoc6@gmail.com",
        "FIRST_NAME": "OneMAC",
        "LAST_NAME": "CPOC06",
        "OFFICER_ID": 3743,
        "POSITION_ID": 538,
        "TELEPHONE": "(410) 555-5445"
    }
]

default_action_officers = [
    {
        "EMAIL": "onemacsrt52@gmail.com",
        "FIRST_NAME": "OneMAC",
        "LAST_NAME": "SRT52",
        "OFFICER_ID": 3740,
        "POSITION_ID": 538,
        "TELEPHONE": "(410) 555-5445"
    }
]

# Function to generate first record based on component type
def generate_first_record(state, random_id, first_timestamp, component_type):
    config = component_config[component_type]
    if component_type == "waiverappk":
        attachments = [
            {
                "contentType": "text/csv",
                "filename": "Report_UserList(1).csv",
                "s3Key": f"{first_timestamp}/Report_UserList(1).csv",
                "title": "1915(c) Appendix K Amendment Waiver Template",
                "url": f"https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3A30413432-e223-4a6d-bfe1-7ed87236ff55/{first_timestamp}/Report_UserList(1).csv"
            },
            {
                "contentType": "text/csv",
                "filename": "Report_spaList(5).csv",
                "s3Key": f"{first_timestamp}/Report_spaList(5).csv",
                "title": "1915(c) Appendix K Amendment Waiver Template",
                "url": f"https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3A30413432-e223-4a6d-bfe1-7ed87236ff55/{first_timestamp}/Report_spaList(5).csv"
            },
            {
                "contentType": "text/csv",
                "filename": "Report_waiverList(8).csv",
                "s3Key": f"{first_timestamp}/Report_waiverList(8).csv",
                "title": "Other",
                "url": f"https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3A30413432-e223-4a6d-bfe1-7ed87236ff55/{first_timestamp}/Report_waiverList(8).csv"
            }
        ]
        return {
            "pk": random_id,
            "sk": f"{config['GSI1sk_prefix']}{first_timestamp}",
            "additionalInformation": "created new APP k",
            "attachments": attachments,
            "clockEndTimestamp": first_timestamp + 77777777,
            "componentId": random_id,
            "componentType": config["componentType"],
            "currentStatus": "Submitted",
            "eventTimestamp": first_timestamp,
            "GSI1pk": config["GSI1pk"],
            "GSI1sk": random_id,
            "proposedEffectiveDate": "2023-01-20",
            "submissionTimestamp": first_timestamp,
            "submitterEmail": "mdstateonemac@gmail.com",
            "submitterName": "MDSTATE SUBMITTERNK",
            "territory": state,
            "title": "New Title for App K",
            "transmittalNumberWarningMessage": "",
            "waiverAuthority": "1915(c)"
        }
    else:
        return {
            "pk": random_id,
            "sk": f"{config['GSI1sk_prefix']}{first_timestamp}",
            "additionalInformation": "test",
            "attachments": [
                {
                    "contentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "filename": "file.docx",
                    "s3Key": f"{first_timestamp}/file.docx",
                    "title": "1915(b)(4) FFS Selective Contracting (Streamlined) Waiver Application Pre-print",
                    "url": f"https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/{first_timestamp}/file.docx"
                }
            ],
            "clockEndTimestamp": first_timestamp + 77777777,
            "componentId": random_id,
            "componentType": config["componentType"],
            "currentStatus": "Submitted",
            "eventTimestamp": first_timestamp,
            "GSI1pk": config["GSI1pk"],
            "GSI1sk": random_id,
            "proposedEffectiveDate": "2024-06-27",
            "submissionTimestamp": first_timestamp,
            "submitterEmail": "statesubmitter@nightwatch.test",
            "submitterName": "Statesubmitter Nightwatch",
            "territory": state,
            "transmittalNumberWarningMessage": "",
            "waiverAuthority": "1915(b)(4)"
        }

# Function to generate second record based on component type
def generate_second_record(state, random_id, second_timestamp, component_type):
    config = component_config[component_type]
    
    # Base common record structure
    second_item = {
        "pk": random_id,
        "sk": f"SEATool#{second_timestamp}",
        "GSI1pk": config["second_GSI1pk"],
        "GSI1sk": random_id,
        "LEAD_ANALYST": default_lead_analyst,
        "ACTION_OFFICERS": default_action_officers,
        "OCD_REVIEW": [
            {
                "OCD_REVIEW_DESCRIPTION": "No",
                "OCD_REVIEW_ID": 2
            }
        ],
        "SPW_STATUS": [
            {
                "SPW_STATUS_DESC": "Pending",
                "SPW_STATUS_ID": 1
            }
        ],
        "STATE_PLAN": {
            "ID_NUMBER": random_id,
            "SPW_STATUS_ID": 1,  # Ensures SPW_STATUS_ID is always included
            "STATE_CODE": state,
            "SUMMARY_MEMO": "This is just a test" if component_type != "waiverappk" else "Sample Summary Memo",
            "UUID": "66908FBA-9AFC-41BD-BA77-AA74379E6F44" if component_type != "waiverappk" else None
        }
    }

    # Add or modify specific fields based on component_type
    if component_type == "waiverappk":
        second_item["ACTIONTYPES"] = [
            {
                "ACTION_ID": 76,
                "ACTION_NAME": "Amend",
                "PLAN_TYPE_ID": 123
            }
        ]
        second_item["PLAN_TYPES"] = [
            {
                "PLAN_TYPE_ID": 123,
                "PLAN_TYPE_NAME": "1915(c)"
            }
        ]
        second_item["STATE_PLAN"]["ACTION_TYPE"] = 76
        second_item["STATE_PLAN"]["ALERT_90_DAYS_DATE"] = 1681862400000
        second_item["STATE_PLAN"]["LEAD_ANALYST_ID"] = 3743

    else:
        second_item["PLAN_TYPES"] = [
            {
                "PLAN_TYPE_ID": 122,
                "PLAN_TYPE_NAME": "1915(b)"
            }
        ]
        second_item["STATE_PLAN"]["PLAN_TYPE"] = 122

    return second_item


# Function to insert records into DynamoDB with multiple component types
def insert_records(state_codes, num_records, component_types):
    for state in state_codes:
        for _ in range(num_records):
            for component_type in component_types:
                random_id, first_timestamp, second_timestamp = generate_ids_and_timestamps(state, component_type)

                # Generate first record
                first_item = generate_first_record(state, random_id, first_timestamp, component_type)

                # Generate second record
                second_item = generate_second_record(state, random_id, second_timestamp, component_type)

                # Try to insert both records, retry if duplicate key error occurs
                try:
                    # insert SEATOOL record first just to avoid package builder issues
                    table.put_item(Item=second_item)

                    # Add a delay of 2 second between inserting the first and second records
                    time.sleep(2)
                    table.put_item(Item=first_item)

                    print(f"Inserted records for {random_id} with component type: {component_type}")
                except ClientError as e:
                    if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                        print(f"Duplicate ID {random_id} detected. Retrying with a new ID.")
                        continue  # Generate a new ID and retry
                    else:
                        raise e  # Raise the exception for non-duplicate errors

# Retrieve state codes, number of records, and component types from environment variables
state_codes = os.getenv('STATE_CODES', 'MD').split(',')  # Example: 'MD,NY,CA'
num_records = int(os.getenv('NUM_RECORDS', '2'))  # Default is 5 if not provided
component_types = os.getenv('COMPONENT_TYPES', 'medicaidspa,chipspa,waivernew,waiverappk').split(',')  # Example: 'medicaidspa,chipspa,waivernew,waiverappk'

# Call the insert function
insert_records(state_codes, num_records, component_types)
