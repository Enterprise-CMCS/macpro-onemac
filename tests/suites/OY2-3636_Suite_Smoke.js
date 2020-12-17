const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["guli"],

    before : function(browser) {
        console.log('Setting up...');
        let env = 'https://d2dr7dgo9g0124.cloudfront.net/devlogin';
        browser.url(env);
        console.log("waiting for guli hoton...")
        browser.waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    }
};