# MacPRO API

### Pre-requisites

1. Install the latest Java JDK distribution
2. Install the latest Node distribution
3. Run `npm install -g serverless` to install serverless globally
4. Run `npm install` from the root directory of this repository
5. Access to CMS CloudTamer for AWS credentials

### Setup & Run the API

Install the API's dependencies by running the following command in this subdirectory:

```
npm install
```

Install the Serverless Dynamo DB offline package by running the following command:

```
sls dynamodb install
```

> **NOTE:** This command will require you have set up your AWS credentials, which you can access these via CloudTamer. See a teammate for help if you cannot find them.

Run the OneMAC API locally by running the following command:

```
sls offline start --httpPort 3001
```

Then change the URL for the API in the UI to the following. You can reference the output from the offline start above to find the URL, but note you only need the first level of the path.

```
 http://localhost:3001/dev
```

### Setup GUI for Local DynamoDB

To get started using the Admin GUI for DynamoDB, install the package globally:

```
npm install -g dynamodb-admin
```

Then, run the package:

```
dynamodb-admin
```

You will find the GUI by accessing http://localhost:8001 in your browser.

> **NOTE:** For more information on this package, visit https://github.com/aaronshaf/dynamodb-admin
