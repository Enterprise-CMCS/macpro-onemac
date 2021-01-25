
let spa;
const timeout = 1000;
module.exports = {

    before : function(browser) {
        console.log('Setting up...');
        spa = browser.page.spaBasePage();
        browser.maximizeWindow()
            .url(browser.launch_url)
            .waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        const testData = {
            username: browser.globals.user,
            password: browser.globals.pass,
            userSelector: '//*[@id="email"]'
        };

        spa.devLogin(testData.username, testData.password);
        spa.verify.visible('@loginTitle');
    },

    'Login to SPA and Waiver Dashboard via Okta' : function(browser) {
        const testData = {
            username: browser.globals.user,
            password: browser.globals.pass
        };
        spa.login(testData.username, testData.password);
        spa.verify.visible('@loginTitle');
    },


    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        spa.logout();
        spa.verify.not.containsText('h1', title);
        browser.pause(timeout);
    },
};