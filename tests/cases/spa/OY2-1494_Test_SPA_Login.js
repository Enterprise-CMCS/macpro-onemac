
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

    "Click Login" : function (browser) {
        const loginPage = browser.page.spaLoginPage();
        loginPage.assert.elementPresent('@loginButton');
        let title = "Developer Login"
        loginPage.click('@loginButton').expect.url().to.contain('/devlogin');
        loginPage.expect.element('h1').text.to.contain(title);
    },

    'Login to SPA and Waiver Dashboard' : function (browser) {
        const loginPage = browser.page.spaLoginPage();
        let username = 'automatedtester090@gmail.com';
        let password = 'id~p)$6XB:9t';
//        let title = 'SPA and Waiver Submission Form';
        loginPage.assert.visible('@loginTitle');
        loginPage.setValue('@userField', username);
        loginPage.setValue('@passField', password);
        loginPage.click('@submitBtn')
        loginPage.expect.url().to.contain("/dashboard").after('3000');
        loginPage.waitForElementNotPresent('@submitBtn');

        },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'CMS State Plan Amendment and Waiver Submission Platform'
        const spa = browser.page.spaLoginPage();
        spa.click('@logout');
        spa.assert.containsText('h1', title);
    }

};