# Nightwatch Automated Testing framework

Automated Testing Framework using Nightwatch.js
## Table of Contents

1. Overview
1. Installation
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


From the root of this project's repo (where nightwatch package is placed), using node package manager `npm`:

`npm update` # checks the package.json, updates for the environment, and then installs the package dependencies

Note: The environment file `.env` provides the username, password and url for nightwatch.
The `nightwatch.conf.js` references this file. A `blank.env` file is provided. Enter credentials and the URL 
to the application and rename to `.env`. This file is not intended to be checked-in to the
repo. 

### Running Tests 

Tests run "headless" (no visible browser) by default. If you want to see the browser run, 

for troubleshooting, comment out the headless argument for the desired browser.

To run tests (by browser type):

** Updated Commands **

Chrome: `npm run chrome`
    
Firefox: `npm run firefox`

Cross-browser(both Firefox and Chrome in parallel): `npm run cross-browser`

To update packages: `npm update`

see [Running Tests in Nightwatch](https://nightwatchjs.org/guide/running-tests/nightwatch-runner.html)

### Automated Test Writing Guides

[Best Practices for writing automated tests](tests/README.md)

### Nightwatch Test Writing Guides

### Other Notes/Bugs

