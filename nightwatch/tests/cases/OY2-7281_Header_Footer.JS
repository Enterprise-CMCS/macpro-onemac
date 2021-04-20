const login = require('./OY2-1494_Test_SPA_Login');
let spa;
const timeout = 1000;

module.exports = {

    before : function(browser) {
        console.log('Setting up...');
        console.log('url is: ', browser.launch_url);
        spa = browser.page.spaBasePage();
        browser.maximizeWindow()
            .url(browser.launch_url)
            .waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Check Dashboard link presence via Dev Login' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Home',
    }) {
        spa = browser.page.spaBasePage();
        browser.pause(timeout * 3);
        console.log('Log out from Okta login session');
        browser.verify.not.elementPresent(spa.elements.dashboardLink);
        login["Logout of SPA and Waiver Dashboard"](browser);
        console.log('Login as Dev user: ', testData.username);
        spa.devLogin(testData);
        browser.verify.elementPresent(spa.elements.dashboardLink);
    },

    'Check Dashboard link presence via Okta Login' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Home',
    }) {

        spa = browser.page.spaBasePage();
        browser.verify.elementPresent(spa.elements.dashboardLink);
        login["Logout of SPA and Waiver Dashboard"](browser);
        browser.pause(timeout * 3);
        browser.verify.not.elementPresent(spa.elements.dashboardLink);
    }
}