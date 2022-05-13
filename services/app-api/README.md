## Running Locally

### Pre-requisites

1. Install the latest Java JDK distribution
2. Install the latest Node distribution
3. Install NPM globaly
4. Install serverless globally

Install the Serverless Dynamo DB offline package by running the following command:

```
npm install
sls dynamodb install
```

Install the serverless plugin to handle the WAF association without the race condition

```
npm install serverless-associate-waf --save-dev
```

Install the quick-start s3 bucket helper serverless plugin (in project root)

```
npm install serverless-s3-bucket-helper --save-dev
```

Run the software locally by running the following command:

```
sls offline start --httpPort 3001
```

Then change the URL for the API in the UI to the following. You can reference the output from the offline start above to find the URL, but note you only need the first level of the path.

```
 http://localhost:3001/dev
```

### GUI for dynamodb local

#### https://github.com/aaronshaf/dynamodb-admin

npm install -g dynamodb-admin

dynamodb-admin

http://localhost:8001
