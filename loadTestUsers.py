#!/usr/bin/env python3

import argparse
import json
import os
import subprocess
import sys

def get_user_pool_id(stage):
    """
    Retrieve the ID of this stage's Cognito User Pool.
    """
    return subprocess.run(
        f"./services/output.sh services/ui-auth UserPoolId {stage}",
        check=True,
        capture_output=True,
        shell=True,
    ).stdout.strip()


def seed_cognito(test_users, user_pool_id, password):
    """
    Populate test users into Cognito and set their passwords.
    """
    for user in test_users:
        # checking errors so we do not set the password when the first call
        # fails, but the failure itself is not a big problem - in most cases
        # the user already exists
        try:
            subprocess.run(
                [
                    "aws",
                    "cognito-idp",
                    "admin-create-user",
                    "--user-pool-id",
                    user_pool_id,
                    "--message-action",
                    "SUPPRESS",
                    "--username",
                    user["email"],
                    "--user-attributes",
                    f'Name=given_name,Value={user["firstName"]}',
                    f'Name=family_name,Value={user["lastName"]}',
                    f'Name=custom:cms_roles,Value="{user["cms_roles"]}"',
                    f'Name=custom:ismemberof,Value="{user["ismemberof"]}"',
                ],
                check=True,
            )
            # aws cognito-idp admin-set-user-password --user-pool-id {user_pool_id} --username {user["email"]} --password {password} --permanent
            subprocess.run(
                [
                    "aws",
                    "cognito-idp",
                    "admin-set-user-password",
                    "--user-pool-id",
                    user_pool_id,
                    "--username",
                    user["email"],
                    "--password",
                    password,
                    "--permanent",
                ],
                check=True,
            )
        except:
            print(f'Received error:{sys.exc_info()}')
            pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Load test users into Cognito and Dynamo."
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

    f = open("test-users.json")
    seed_users = json.load(f)

    if args.dry_run:
        print("Seed users:")
        print(seed_users)
    else:
        user_pool_id = get_user_pool_id(args.stage)

        if not user_pool_id:
            print(
                "ERROR: There was an error obtaining AWS resource information to create users.",
                file=sys.stderr,
            )
            sys.exit(101)

        seed_cognito(
            seed_users,
            user_pool_id,
            os.environ.get("COGNITO_TEST_USERS_PASSWORD"), 
        )

    f.close()