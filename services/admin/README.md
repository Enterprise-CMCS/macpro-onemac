### Purpose

The purpose of this set of services is to serve as a mechanism to standardize admin/helpdesk type operations that need to interact with (create/update/delete) data or other aws controlled resources in the onemac project.

### Functions

#### resetData

Run this lambda to delete the components used in the automated testing. Right now, the IDs are hard-coded into the function and the delete is run on the change-request and one tables. Plan is to move the list of IDs into the test area of the repo for QE control.

#### updateChangeRequestId

Update a given change request transmittalNumber based on its current transmittalNumber, type, and submittedAt timestamp and prepend a message onto the addtionalInfo

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

- Navigate to the lambda named admin-${stage}-updateChangeRequestId (such as admin-production-updateChangeRequestId)
- Create (or open) a test event with the json format as found in admin/handlers/updateChangeRequest.json
- Execute the test event and verify logs in cloudwatch

#### AWS CLI

- Setup aws cli environment variables (from kion)
- setup json event using template found in admin/handlers/updateChangeRequest.json
- execute (this example is using stage production and the template file)

```
serverless invoke --function updateChangeRequestId --stage production --path ./handlers/updateChangeRequest.json
```
