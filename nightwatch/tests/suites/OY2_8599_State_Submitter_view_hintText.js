const login = require('./OY2_9999_Login');

module.exports = {
    "@tags": ["profileOne", "smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'State Submitter User can view SPA ID and Waiver Number hint text on all submission forms': function (browser) {
        //check on respond to SPA RAI SPA ID hint text
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        let spa_id_hint_text = "//p[@class='field-hint']";
        browser.useXpath().expect.element(spa_id_hint_text).to.be.visible;
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.click(dashboard_link);

        //check on respond to CHIP RAI
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[4]");
        browser.useXpath().expect.element(spa_id_hint_text).to.be.visible;
        browser.click(dashboard_link);

        //check on respond to waiver number hit text
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.useXpath().expect.element(spa_id_hint_text).to.be.visible;
        browser.click(dashboard_link);

        //check on request temporary extension waiver number hint number
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[3]");
        browser.useXpath().expect.element(spa_id_hint_text).to.be.visible;
        browser.click(dashboard_link);

    },
}