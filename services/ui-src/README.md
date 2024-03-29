# OneMAC User Interface

This folder contains the OneMAC UI: a React single-page application generated from `create-react-app`.

## Before you get started

Be sure to follow the setup instructions for the OneMAC API, found [here](https://github.com/Enterprise-CMCS/macpro-onemac/blob/develop/services/app-api/README.md). Also ensure that the build directory (`public`) has a file named `env-config.js` populated with a list of environment variables. These variables are used in the connection between the UI and API.

## Run the UI locally

1. Run the `app-api` service locally.
2. Install all the UI dependencies by running `npm install` in this directory.
3. Run the application by running `npm run start` from this directory.

Running the start command will open [http://localhost:3000](http://localhost:3000) where UI changes can be viewed in real-time.

## Local testing accounts

### Static test users

We have a suite of [OneMAC test users](https://qmacbis.atlassian.net/wiki/spaces/MACPRO/pages/2446852097/oneMAC+Test+Users) for the DEV and VAL environments. These will work on `master`, `develop`, and feature branches, even when running the application locally. If you are unable to access the Confluence page, see a teammate for help!

> **NOTE:** These users are not available for use in the `master` or `production` branch environments.

### Dynamic developer emails

For every build, a dynamic list of developer emails is also added to the test user list, so developers can receive the generated emails sent from the application. Developers need to setup their correct email in the Git configuration and have already committed changes to the repo. To see the list of emails added run the following command in the Git repository.

```
git log --pretty=format:'%ae' | grep -v github.com | sort -u
```

### Login methods per environment

- Feature branches: static test users, dynamic developer emails
- [develop](https://github.com/Enterprise-CMCS/macpro-onemac/tree/develop) branch: OKTA authentication, static test users, dynamic developer emails
- [master](https://github.com/Enterprise-CMCS/macpro-onemac/tree/master) branch: OKTA authentication, static test users, dynamic developer emails
- [production](https://github.com/Enterprise-CMCS/macpro-onemac/tree/production) branch: OKTA authentication

## Building the application

Building is done by the CI system, but if you need to generate a build you can do so by running `npm run build` from this directory, which outputs a new build to the `public` subdirectory.
