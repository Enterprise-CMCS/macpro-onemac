module.exports = {
    tags : ['login', 'smoke'],

    before : function(browser) {
        console.log('Setting up...');
        browser.url(browser.launch_url);
        browser.waitForElementVisible('body');

    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        const loginPage = browser.page.spaBasePage();
        let title = "SPA and Waiver Dashboard";
        let urlSubDir = '/dashboard';
        let username = browser.userName;
        let password = browser.passWord;
        console.log(username + "\n" + password);

        loginPage.click("@loginButton");
        browser.waitForElementPresent('body');
        loginPage.login(username, password);
        browser.verify.containsText('h1', title);
        browser.expect.url().to.contain(urlSubDir).after(5000);

        loginPage
            .verify.visible('@loginTitle')
            .verify.containsText('h1', title)

    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        const loginPage = browser.page.spaBasePage();
        loginPage.click('@logout');
        loginPage.verify.not.containsText('h1', title);
    }
};