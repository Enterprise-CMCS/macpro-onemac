const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["profileOne", "smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        let register_link = "//a[@class='ds-c-button ds-c-button--inverse register-link']";
        browser.useXpath().expect.element(register_link).to.be.visible;
        browser.click(register_link).pause(1000);
        browser.assert.urlContains('/signin/login.html');
        //login['Login with state submitter user'](browser);
    },

    after: function (browser) {
       // login.afterEach(browser);
        browser.end();
    },

    
}