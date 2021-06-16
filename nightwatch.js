#!/usr/bin/env node
require('dotenv').config();
let msg = `Running in ${process.env.TESTING_ENV} environment`;
switch (process.env.TESTING_ENV) {
    case 'dev':
        require('dotenv').config({path: '.env.dev'});
        break;
    case 'uat':
        require('dotenv').config({path: '.env.uat'});
        break;
    case 'test':
    default:
        require('dotenv').config({path: '.env.test'});
        break;
}
console.info(msg);
require('nightwatch/bin/runner');