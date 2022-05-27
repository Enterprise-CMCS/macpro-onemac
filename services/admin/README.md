## Purpose

### The purpose of this set of services is to serve as a mechanism to standardize admin/helpdesk type operations that need to interact with (create/update/delete) data or other aws controlled resources in the onemac project.

### Functions

#### updateChangeRequestId - this function will update a give transactionNumber from the change request table to the specified transactionNumber and append any notes to the Additional Information property of the dynamodb record

### Setup

#### From the admin directore run:

##### npm install --save-dev serverless-bundle

##### npm install -g serverless
