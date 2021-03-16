const login = require('./OY2-1494_Test_SPA_Login_Dev');
let spa;

module.exports = {
    before : function(browser) {
        login.before(browser);
    },

    after : function(browser) {
        login.after(browser);
    },

    'Login to SPA and Waiver Dashboard via Okta' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {
        spa = browser.page.spaBasePage();
        spa.login(testData);
        spa.verify.visible('@loginTitle');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
    },
};