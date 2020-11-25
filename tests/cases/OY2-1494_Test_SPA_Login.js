
module.exports = {
    tags : ['login', 'smoke'],

    before : function(browser) {
        console.log('Setting up...');
        const loginPage = browser.page.spaLoginPage();
        loginPage.navigate().waitForElementVisible('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Verify SPA and Waiver Dashboard' : function (browser) {
        let title = "Developer Login";
        let urlSubDir = '/devlogin';

        const loginPage = browser.page.spaLoginPage();
        loginPage.click('@loginButton')
            .expect.url().to.contain(urlSubDir).after(500);

        loginPage
            .assert.visible('@loginTitle')
            .assert.containsText('h1', title)
            .assert.elementPresent('@submitBtn');

    },

    'Enter Login Credentials' : function(browser) {
        let username = 'automatedtester090@gmail.com';
        let password = 'id~p)$6XB:9t';

        const loginPage = browser.page.spaLoginPage();
        loginPage.setValue('@userField', username).pause(10);
        loginPage.setValue('@passField', password).pause(10);
        loginPage.click('@submitBtn').waitForElementNotPresent('@submitBtn');
    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'CMS State Plan Amendment and Waiver Submission Platform'
        const loginPage = browser.page.spaLoginPage();
        loginPage.click('@logout');
        loginPage.assert.containsText('h1', title);
    }
};