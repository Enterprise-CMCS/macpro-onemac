# macstack-spa-submission-form
#

An official submission system for email-based state plan amendments (SPAs) and section 1915 waivers.

### Application Configuration
The following environment variables can be set to change the configuration of the application (reference [build_vars.sh](./.github/build_vars.sh)):
Lengend: R = Required, O = Optional
* (O) CMS_SPA_FORM_CMS_EMAIL - The CMS email address submissions are sent to.  Defaults to *spa-reply@cms.hhs.gov*
* (O) CMS_SPA_FORM_FROM_EMAIL - The CMS email address used to send emails from (the FROM email address in the emails).  Defaults to *spa-reply@cms.hhs.gov*
* (R) AWS_ACCESS_KEY_ID - AWS Access key with write access for creating AWS resources in the account
* (R) AWS_SECRET_ACCESS_KEY - AWS secret with write access for creating AWS resources in the account
* (R) AWS_DEFAULT_REGION - The AWS region to deploy the application to
* (O) INFRASTRUCTURE_TYPE - Defaults to "development"
* ROUTE_53_HOSTED_ZONE_ID
* ROUTE_53_DOMAIN_NAME
* CLOUDFRONT_CERTIFICATE_ARN
* (O) CLOUDFRONT_DOMAIN_NAME - The custom domain name for the application
* (O) IAM_PATH - Defaults to "/"
* IAM_PERMISSIONS_BOUNDARY_POLICY
* STAGE_PREFIX
* (R) OKTA_METADATA_URL - The OKTA URL to authenticate at
* METRICS_USERS - A comma separated list of emails of the users that are allowed access to the metrics page

Automated Testing Framework using Nightwatch.js
## Table of Contents

1. Overview
1. Installation
1. Configuration
1. Running Tests
    1. Automated Test Writing Guides
    1. Nightwatch Test Writing Guides
1. Other Notes
 
---
### Overview

NightwatchJS is an end-to-end (e2e) automated test framework, written 100% in JavaScript/ECMAScript, designed 
to provide a singe source location for testing, from unit tests to full regression workflows.

### Installation

Pre-requisite: 

- Node.js 12.x or higher


From the root directory folder, use node package manager `npm`:

`npm install`
   
### Configuration

Location of the NightWatch configuration: ``` conf/nightwatch.conf.js```

[Structure and configuration details](conf/README.md)

### Running Tests 

To run tests:
    
`node nightwatch -c conf/nightwatch.conf.js # runs all tests`

\*New Commands\*
To run tests (by browser type):

For Chrome:
    - Windows: `npm run chrome-win`
    - Linux/Mac: `npm run chrome`
    
For Firefox:
    - Windows: `npm run firefox-win`
    - Linux/Mac: `npm run firefox-chrome`

To update packages: 
    `npm run update`

see [Running Tests in Nightwatch](https://nightwatchjs.org/guide/running-tests/nightwatch-runner.html)

A test_runner script will be updated and provided soon.

### Automated Test Writing Guides

[Best Practices for writing automated tests](tests/README.md)

### Nightwatch Test Writing Guides

### Other Notes/Bugs

- 13 November 2020: Bug Impact (Low) There is a (possible) bug in chromedriver, when running tests headless(without a browser).
Description: When attempting to perform an action on a clickable element, chromedriver reports an error, 
falsely identifying the element as a non-clickable element`[size of the element is zero]`. Until this is resolved,
avoid running headless tests in chromedriver. 
