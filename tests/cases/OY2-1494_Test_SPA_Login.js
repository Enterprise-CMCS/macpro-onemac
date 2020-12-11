
let spaPage;
module.exports = {
    tags : ['smoke'],


    before : function(browser) {
        console.log('Setting up...');
        spaPage = browser.page.spaBasePage();
        browser.url(browser.launch_url);
        browser.waitForElementPresent('body');

    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        let title = "SPA and Waiver Dashboard";
        let urlSubDir = '/dashboard';
        const username = browser.globals.userName;
        const password = browser.globals.passWord;

        spaPage.login(username, password);
        browser.waitForElementPresent('body');
        browser.verify.containsText('h1', title);
        browser.expect.url().to.contain(urlSubDir).before(10000);
        spaPage
            .verify.visible('@loginTitle')
            .verify.containsText('h1', title)

    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        const spaPage = browser.page.spaBasePage();
        spaPage.logout();
        spaPage.verify.not.containsText('h1', title);
        browser.pause(1000);
    }
};