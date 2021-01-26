# Nightwatch Automated Testing framework

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
#### Environment File
In order to run tests and specify environment-specific information (url, credentials, etc.), you must have
a `.env` file in the root of the Nightwatch directory or project root folder (whichever is applicable).


##### Instructions
1. Create a file name `.env` (no `.txt` extension)
2. In the file, replace the values in the following key-value pairs (after the "="):

TEST_USERS=username
TEST_USER_PASSWORD=password
APPLICATION_ENDPOINT=https://www.mytestpage.url



### Running Tests 

To run tests:
    
`node nightwatch -c nightwatch/conf/nightwatch.conf.js # runs all tests`

####**New Commands**
To run tests (by browser type):

For Chrome: `npm run chrome <path/to/testfile>`
    
For Firefox: `npm run firefox <path/to/testfile>`

To update packages: `npm run update`

see [Running Tests in Nightwatch](https://nightwatchjs.org/guide/running-tests/nightwatch-runner.html)

####Using the `test.sh` runner(DevOps)

All environments (default): `test.sh`

To run tests for development environment: `test.sh --dev` 

### Automated Test Writing Guides

[Best Practices for writing automated tests](tests/README.md)

### Nightwatch Test Writing Guides

### Other Notes/Bugs

- 13 November 2020: Bug Impact (Low) There is a (possible) bug in chromedriver, when running tests headless(without a browser).
Description: When attempting to perform an action on a clickable element, chromedriver reports an error, 
falsely identifying the element as a non-clickable element`[size of the element is zero]`. Until this is resolved,
avoid running headless tests in chromedriver. 
