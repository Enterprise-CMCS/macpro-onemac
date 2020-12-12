
module.exports = {


    before : function(browser) {
        console.log('Setting up...');
        let url = browser.launch_url;
        console.log(url)
        browser.url(url);
        browser.waitForElementPresent('body');

    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        let title = "SPA and Waiver Dashboard";
        let urlSubDir = '/dashboard';
        let spaPage = browser.page.spaBasePage();
        const username = browser.globals.user;
        const password = browser.globals.pass;

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