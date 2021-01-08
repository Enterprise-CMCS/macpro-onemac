
let spa;
module.exports = {

    before : function(browser) {
        console.log('Setting up...');
        browser.maximizeWindow()
            .url(browser.launch_url)
            .waitForElementPresent('body');

    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    "Navigate to SPA and Waiver Dashboard": function (browser) {
        spa = browser.page.spaBasePage();
        spa.toDashBoard();

    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        const testData = {
            okta_url: "https://test.idp.idm.cms.gov/",
            username: browser.globals.user,
            password: browser.globals.pass
        };

        browser.expect.url().to.be.equal(testData.okta_url);
        spa.login(testData.username, testData.password);
        spa.verify.visible('@loginTitle');

    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        spa.logout();
        spa.verify.not.containsText('h1', title);
        browser.pause(1000);
    },


};