## Running Locally
Pre-requisites: You need to have configured Node, npm, serverless globaly.

Install the serverless Dynamo DB offline package by running the following command:

```
npm install
sls dynamodb install
```

Run the software locally by running the following command:

```
sls offline start --httpPort 3001
```

Then change the URL for the API in the UI to the following, replacing <stage> with the stage name (normally the branch name).  You can reference the output from the offline start above to find the URL, but note you only need the first level of the path.
```
 http://localhost:3001/<stage>
```