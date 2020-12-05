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
