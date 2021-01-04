
let spa;
module.exports = {
    before : function(browser) {
        console.log('Setting up...');
        browser.maximizeWindow().url(browser.launch_url).waitForElementPresent('body');
        spa = browser.page.spaBasePage();
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        let title = "SPA and Waiver Dashboard";
        let urlSubDir = '/dashboard';
        const username = browser.globals.user;
        const password = browser.globals.pass;

        spa.login(username, password);
        browser.waitForElementPresent('body');
        browser.verify.containsText('h1', title);
        browser.expect.url().to.contain(urlSubDir).before(10000);
        spa
            .verify.visible('@loginTitle')
            .verify.containsText('h1', title)

    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        spa.logout();
        spa.verify.not.containsText('h1', title);
        browser.pause(1000);
    }
};