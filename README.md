# Nightwatch Automated Testing framework

Automated Testing Framework using Nightwatch.js

## Installation

Pre-requisite: 

- Node.js 12.x or higher


From the root directory folder, use node package manager `npm`:

`npm install`
   
## Running Tests 

To run tests:
    
`node nightwatch -c conf/nightwatch.conf.js # runs all tests`

see [Running Tests in Nightwatch](https://nightwatchjs.org/guide/running-tests/nightwatch-runner.html)

A test_runner script will be updated and provided soon.

**NOTE**: There is a bug in chromedriver, when running headless, that causes a failure when attempting to perform
an action on a clickable element. The error reports that the size of the element is zero. Until this is resolved,
avoid running headless tests in chromedriver. 

## Automated Test Writing Guides

[Best Practices for writing automated tests](tests/README.md)


