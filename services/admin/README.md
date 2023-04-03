### Purpose

The purpose of this set of services is to serve as a mechanism to standardize admin/helpdesk type operations that need to interact with (create/update/delete) data or other aws controlled resources in the onemac project.

### Functions

#### resetData

Run this lambda to delete the components used in the automated testing. Right now, the IDs are hard-coded into the function and the delete is run on the change-request and one tables. Plan is to move the list of IDs into the test area of the repo for QE control.

#### softDeleteComponent

Sets the given component to Inactivated, which will cause the package builder to ignore it.

### resetOneTable

Deletes all items from the one table EXCEPT if there is an '@' character in the pk. Basically all but the user items are deleted.

### convertChangeRequests

Scans the change requests table specified and adds the submit events to the one table. Use processAll to force all events to modify the one table, triggering the package rebuilds.

NOTE! Must add parentType for any raw data waiverrai submissions (10 of them currently)
and pay attention to appkrais, because they are just waiverrai in change request table.

### Setup

From the admin directory run:

- npm install -g serverless
- npm install --save-dev serverless-webpack

### Execution

#### Local Invocation

For resetData:

```
cd /services/admin
serverless invoke local --function resetData --stage dev --env IS_OFFLINE=true
```

#### AWS Console

- Navigate to the lambda you wish to run for example: admin-production-updateChangeRequestId
- Create (or open) a test event with the json format as found in the sample json. For example: admin/handlers/updateChangeRequest.json
- Execute the test event and verify logs in cloudwatch

#### AWS CLI

- Setup aws cli environment variables (from kion)
- setup json event using template found in sample json. For example: admin/handlers/updateChangeRequest.json
- execute (this example is using stage production and the template file)

```
serverless invoke --function updateChangeRequestId --stage production --path ./handlers/updateChangeRequest.json
```

### Deploy to Prod

- if this is the first time deploying a particular lambda (function)

```
serverless deploy --stage production
```

- otherwise: inside the admin folder:

```
serverless deploy --function updateChangeRequestId --stage production
```
