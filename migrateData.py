#!/usr/bin/env python3

import argparse
import json
import subprocess

"""
Hard code details of the data migration.
"""
STAGES_TO_MIGRATE = ['all']
TABLES_TO_MIGRATE = ['user-profiles', 'one']


def process_items(table_name, item_list):
    """
    Modify this function to perform the data migrations.
    Migrate each table with the if blocks.
    """
    update_items = []
    if table_name.endswith("one"):
        new_status = ""
        for item in item_list['Items']:
            if "currentStatus" not in item:
                pass
            elif item["currentStatus"] == {'S': 'SEATool Status: 1'}:
                new_status = "Package In Review"
            elif item["currentStatus"] == {'S': 'SEATool Status: 2'}:
                new_status = "RAI Issued"
            elif item["currentStatus"] == {'S': 'SEATool Status: 3'}:
                new_status = "Review Paused, Off the Clock"
            elif item["currentStatus"] == {'S': 'SEATool Status: 4'}:
                new_status = "Package Approved"
            elif item["currentStatus"] == {'S': 'SEATool Status: 5'}:
                new_status = "Package Disapproved"
            elif item["currentStatus"] == {'S': 'SEATool Status: 6'}:
                new_status = "Package Withdrawn"
            elif item["currentStatus"] == {'S': 'SEATool Status: 7'}:
                new_status = "Waiver Terminated"
            elif item["currentStatus"] == {'S': 'SEATool Status: 8'}:
                new_status = "Package In Review"
            elif item["currentStatus"] == {'S': 'SEATool Status: 9'}:
                new_status = "Unsubmitted"
            elif item["currentStatus"] == {'S': 'SEATool Status: 10'}:
                new_status = "Package In Review"
            elif item["currentStatus"] == {'S': 'SEATool Status: 11'}:
                new_status = "Package In Review"
            else:
                pass
            update_details = [
            { "pk": item['pk'], "sk": item['sk'] },
            "SET #status=:newStatus",
            { "#status":"currentStatus"},
            { ":newStatus": { "S": new_status}}
            ]
            update_items.append(update_details)

    if table_name.endswith("user-profiles"):
        for item in item_list['Items']:
            if "type" not in item or item["type"] != {'S': 'stateadmin'}:
                pass
            else:
                update_details = [
                { "id": item['id']},
                "SET #type=:newType",
                { "#type":"type"},
                { ":newType": { "S": 'statesystemadmin'}}
                ]
                update_items.append(update_details)
    return update_items


def build_table_name(table, stage):
    """
    Create the full aws table name
    """
    table_prefix = "cms-spa-form"
    if table == 'one':
        table_prefix = "onemac"

    return f"{table_prefix}-{stage}-{table}"


def scan_dynamo(table_name):
    """
    Retrieve a full scan of the table.
    NOTE: the CLI performs multiple scans if needed
    """
    return json.loads(
        subprocess.run(
            [
                "aws",
                "dynamodb",
                "scan",
                "--table-name",
                table_name,
            ],
            check=True,
            capture_output=True,
        ).stdout.decode("utf-8")
    )


def perform_updates(table_name, update_items):
    """
    Run the batch update on the dynamodb table.
    Sample update CLI (reference while building/testing)
    
     aws dynamodb update-item --table-name cms-spa-form-ssa-naming-user-profiles --key '{ "id": {"S": "statesystemadmindenied@cms.hhs.local"}}' --update-expression "SET #type=:newType" --expression-attribute-names '{"#type": "type"}' --expression-attribute-values '{":newType": {"S": "helpdesk"}}' --return-values All_NEW
    """
    for update in update_items:
        print(f"Perform_updates called with {table_name} and {update}")
        subprocess.run(
            [
                "aws",
                "dynamodb",
                "update-item",
                "--table-name",
                table_name,
                "--key",
                json.dumps(update[0]),
                "--update-expression",
                update[1],
                "--expression-attribute-names",
                json.dumps(update[2]),
                "--expression-attribute-values",
                json.dumps(update[3]),
                "--return-values",
                "ALL_NEW"
            ],
            check=True,
            capture_output=True,
        )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Scans dynamodb tables, creating and performing updates based on a migration function."
    )
    parser.add_argument("stage", help="stage (Git branch) being deployed")
    parser.add_argument(
        "-n",
        "--dry-run",
        action="store_const",
        const=True,
        help="print seed data without contacting AWS",
    )
    args = parser.parse_args()

    if STAGES_TO_MIGRATE[0] == 'all' or args.stage in STAGES_TO_MIGRATE:
        for table in TABLES_TO_MIGRATE:
            table_name = build_table_name(table, args.stage)
            all_items = scan_dynamo(table_name)
            update_items = process_items(table_name, all_items)

            if args.dry_run:
                print("migrate table:")
                print(table_name)
                print("sample items:")
                print(all_items)
                print("\nUpdated items:")
                print(update_items)
            else:
                returned = perform_updates(table_name, update_items)
                print(f"Returned: {returned}")

    else:
        print(f"stage {args.stage} not being migrated")
