This service works as the target for a dynamoDB table stream for the one table. Its purpose is to take any INSERT or MODIFY dynamo events and rebuild the Package record to reflect the new state of the package given the new data.

For more detailed information see:
https://qmacbis.atlassian.net/wiki/spaces/DAD/pages/3124264969/Streaming+Management+Topics+OneMAC

# Running Locally

To run the one-stream service locally in order to process update events handled by the dynamodb table stream there are a few things that need to be considered.

1. Your feature branch must be deployed via serverless so that the cloudformation template variables can be found. Alernatively you can manually replace them with the develop branch or some other value if you are not concerned with processing kafka stream records.

2. Since you will need to also be running app-api locally to fully test, the default ports will already be used and we therefore need to override the http and lambda port that serverless offline uses

3. Default config is assuming app-api is using stage `dev` and therefore pointing at that table name of `onemac-dev-one`. If you configure your app-api to use a custom stage then also update serverless.yml `custom.localTableName` with the local table name

## Setup

1. Run `npm install` to pick up any new packages used by this module
2. Create a .env file in onemac/services/one-stream and add the following lines:
   `IS_OFFLINE=true`
   `AWS_REGION=us-east-1`

## Command

serverless offline start --httpPort 3005 --lambdaPort 3006 --stage {branch-name}
