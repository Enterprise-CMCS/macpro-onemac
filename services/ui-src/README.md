This folder contains the SPA Form React JS application.

## Development

### Running the Application Locally

1. Set your AWS credentials in the terminal you are using to run the application. The AWS credentials are used to configure the UI to connect to the necessary AWS resources.
1. Run the configureLocal.sh script to configure the UI to connect to the AWS resources. The resulting configuration is written to _public/env-config.js_.
1. Run the app-api service locally. See [APP API README](../app-api/README.md) for more information.
1. Install all the UI dependencies by running `npm install`.
1. Run the application by running `npm run start` and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Logging in to the Application

The application provides a set of test users for the DEV environment that you can use for all feature branches and the develop branch, including when running the application locally.

**Note that these users are not present in the master or production branches.**

The following are the available static test users:

```
statesubmitterpending@cms.hhs.local
statesubmitteractive@cms.hhs.local
statesubmitterdenied@cms.hhs.local
statesubmitterrevoked@cms.hhs.local
statesubmitterunregistered@cms.hhs.local
statesystemadminpending@cms.hhs.local
statesystemadminactive@cms.hhs.local
statesystemadmindenied@cms.hhs.local
statesystemadminrevoked@cms.hhs.local
statesystemadminunregistered@cms.hhs.local
cmsroleapproverpending@cms.hhs.local
cmsroleapproveractive@cms.hhs.local
cmsroleapproverdenied@cms.hhs.local
cmsroleapproverrevoked@cms.hhs.local
cmsroleapproverunregistered@cms.hhs.local
```

For every build, a dynamic list of developer emails is also added to the test user list, so developers can receive the generated emails sent from the application. Developers need to setup their correct email in the Git configuration and have already committed changes to the repo. To see the list of emails added run the following command in the Git repository.

`git log --pretty=format:'%ae' | grep -v github.com | sort -u`

The password for all test users is `Passw0rd!`

Here are the ways you can log in to the application:

- Feature and hotfix branches - static test users and dynamic developer emails
- [develop](https://github.com/CMSgov/onemac/tree/develop) branch - OKTA authentication, static test users and dynamic developer emails
- [master](https://github.com/CMSgov/onemac/tree/master) branch - OKTA authentication only
- [production](https://github.com/CMSgov/onemac/tree/production) branch - OKTA authentication only

### Building

Building is done by the CI system, but if you need to generate a build you can do so by running

`npm run build`
