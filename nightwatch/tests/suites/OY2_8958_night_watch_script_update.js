const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],
    
    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'Verify that State User can enter Waiver number in RAI form with correct format': function (browser) {
       //browser.useCss().click("button#waiverRaiBtn").pause(500);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[1]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[1]");
       browser.useXpath().expect.element("//h1").to.be.visible;
       browser.useXpath().assert.containsText("//h1", "Submit New Medicaid SPA");
       let dashboard_link = "//a[@id='dashboardLink']";
       browser.click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[1]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.useXpath().expect.element("//h1").to.be.visible;
       browser.useXpath().assert.containsText("//h1", "Respond to Medicaid SPA RAI");
       browser.click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[1]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[3]");
       browser.useXpath().expect.element("//h1").to.be.visible;
       browser.useXpath().assert.containsText("//h1", "Submit New CHIP SPA");
       browser.click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[1]");
       browser.pause(500);

       browser.useXpath().click("(//h4)[4]");
       browser.useXpath().expect.element("//h1").to.be.visible;
       browser.useXpath().assert.containsText("//h1", "Respond to CHIP SPA RAI");
       browser.useCss().click("button#back-button").pause(1000);
       browser.acceptAlert();
       browser.useXpath().click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[1]");
       browser.click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[3]");
       browser.click(dashboard_link);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[4]");
       browser.click(dashboard_link);
    }
}