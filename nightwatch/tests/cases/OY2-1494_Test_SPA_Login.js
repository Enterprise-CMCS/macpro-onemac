
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

    'Login to SPA and Waiver Dashboard' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {
        spa = browser.page.spaBasePage();
        console.log('Login as: ', testData.username);
        browser.verify.not.elementPresent(spa.elements.dashboardLink);
        spa.devLogin(testData);
        browser.verify.elementPresent(spa.elements.dashboardLink);
        spa.verify.visible('@titleBar');
        browser.verify.elementPresent('h1');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Login to SPA and Waiver Dashboard via Okta' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {

        spa = browser.page.spaBasePage();
        browser.verify.not.elementPresent(spa.elements.dashboardLink);
        spa.login(testData);
        browser.verify.elementPresent(spa.elements.dashboardLink);
        spa.verify.visible('@titleBar');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        spa.logout();
        spa.verify.not.containsText('h1', title);
        browser.pause(timeout);
    },
};
