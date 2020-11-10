
module.exports = {
    tags : ['login', 'smoke'],

    before : function(browser) {
        console.log('Setting up...');
        const spa = browser.page.spaLoginPage();
        spa.navigate()
            .waitForElementVisible('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    "Select Development Login" : function (browser) {
        const loginPage = browser.page.spaLoginPage();
        loginPage.assert.elementPresent('@loginButton');
        loginPage.click('@loginButton')
    },

    'Login to SPA and Waiver Dashboard' : function (browser) {
        let username = 'automatedtester090@gmail.com';
        let password = 'id~p)$6XB:9t';
        const loginPage = browser.page.spaLoginPage();
        loginPage.assert.elementPresent('@loginButton');
        loginPage.click('@loginButton')
            .assert.titleContains('SPA and Waiver Submission Form')
            .assert.not.titleContains('CARTS')
            .assert.visible('div[class=Login]');

        loginPage.setValue('@userField', username);
        loginPage.setValue('@passField', password);
        loginPage.click('@submitBtn').expect.url().to.contain("/dashboard").after('3000');
        loginPage.waitForElementNotPresent('@submitBtn');

        },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        const spa = browser.page.spaLoginPage();
        spa.click('@logout');
        spa.assert.containsText('h1', 'CMS State Plan Amendment and Waiver Submission Platform');
    }

};