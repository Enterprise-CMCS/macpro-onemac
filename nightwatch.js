require('dotenv').config();
const path = require('path');
require('nightwatch/bin/runner');


switch (process.env.TESTING_ENV) {
    case 'dev':
    default:
        require('dotenv').config({path: `${process.cwd}/.env.dev`});
        break;
    case 'val':
        require('dotenv').config({path: path.resolve(process.cwd, './env.val')});
        break;
    case 'test':
        require('dotenv').config({path: path.join(process.cwd, './env.test')});
        break;
}
console.info(process.env.TESTING_ENV);

console.log('Setting up the browser instance...');
console.log('Opening the browser...')
console.log('Maximizing the browser window size...');
