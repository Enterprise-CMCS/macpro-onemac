let spa;
const timeout = 1000;

module.exports = {
    "@tags": ["regression", "devEnv"],
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
        browser.verify.not.elementPresent(spa.elements.dashboardLink);
        console.log('Login as Dev user: ', testData.username);
        spa.devLogin(testData);
        browser.pause(timeout * 3);
        browser.verify.elementPresent(spa.elements.dashboardLink);
        spa.logout();
        browser.pause(timeout * 3);
    },

    'Check Dashboard link presence via Okta Login' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Home',
    }) {
        spa = browser.page.spaBasePage();
        browser.verify.not.elementPresent(spa.elements.dashboardLink);
        spa.login(testData);
        browser.pause(timeout * 3);
        browser.verify.elementPresent(spa.elements.dashboardLink);
        spa.logout();
        browser.pause(timeout * 3);
    }
}