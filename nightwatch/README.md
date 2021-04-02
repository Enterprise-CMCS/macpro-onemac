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

####**New Commands**
To run tests (by browser type):
Where "testfile.js" is the file path relative to the project root folder

For Chrome: `npm run chrome <path/to/testfile.js>`

For Firefox: `npm run firefox </path/to/testfile.js>`

To update packages: `npm run update`

To run smoke tests: `npm run smoke`

To run regression (all tests that contain the tag "regression" `@tags`):

For OKTA login: `npm run regression`

For non-OKTA login `npm run regression-dev`

To run integration(tests containing "integration" tag *Future implementation*):
`npm run integration`

To run unit tests(test that contain "unit" tag *Future implementation*):
`npm run unit`

For more details:
see [NightwatchJS Test Tagging](https://nightwatchjs.org/guide/running-tests/test-tags.html)
see [Running Tests in Nightwatch](https://nightwatchjs.org/guide/running-tests/nightwatch-runner.html)

####Using the `test.sh` runner(DevOps)

All environments (default): `test.sh`

To run tests for development environment: `test.sh --dev`

Note: This flag does **not** specify the environment; only which login to perform (OKTA or non-OKTA-based) during
browser-based testing

### Automated Test Writing Guides

[Best Practices for writing automated tests](tests/README.md)

### Nightwatch Test Writing Guides

### Other Notes

- Make sure that the `--headless` flag is un-commented before pushing to a remote branch, as test runs are
  performed "headless" (aka without opening web browser).

- Ensure that in adding to running headless, the `--window-size=` flag is set with a default resolution size.
For example:
  `--window-size=800,600`
  This allows the headless browser to estimate where an element would be located in the DOM window,
  given this set resolution.
