# Running Locally

To run the one-stream service locally in order to process update events handled by the dynamodb table stream there are a few things that need to be considered.

1. Your feature branch must be deployed via serverless so that the cloudformation template variables can be found. Alernatively you can manually replace them with the develop branch or some other value if you are not concerned with processing kafka stream records.

2. If you are running app-api from the default stage `dev` in order to take advantage of user auth then you will also need to pass a `--stage` param to the serverless startup

3. Since you will need to also be running app-api locally to fully test, the default ports will already be used and we therefore need to override the http and lambda port that serverless offline uses

4. Default config is assuming app-api is using stage `dev` and therefore pointing at that table name. If you configure your local to use a custom stage then also update in serverless.yml the property custom.dynamodbStream.streams.table

## Command

serverless offline start --httpPort 3005 --lambdaPort 3006 --stage {branch-name}
