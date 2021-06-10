require('dotenv').config();
require('nightwatch/bin/runner');


if(`${process.env.NODE_ENV}` === 'dev') {
    require('dotenv').config({path: '.env.dev'});
}

if(`${process.env.NODE_ENV}` === 'val') {
    require('dotenv').config({path: '.env.val'});
}

console.log('Setting up the browser instance...');
console.log('Opening the browser...')
console.log('Maximizing the browser window size...');
console.log(`${process.env.APPLICATION_ENDPOINT}`);