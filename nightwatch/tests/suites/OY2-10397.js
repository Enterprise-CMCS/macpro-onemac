const login = require('../suites/OY2_9999_Login');
module.exports = {

    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_helpdesk_users'](browser); 
    },

    after: function (browser) {
        login.afterEach(browser);
    },
    'Verify the sort funtionality on Dashboard': function (browser) {
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[1]/div/h1", "Submission List");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[2]", "Type");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[2]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[3]", "State");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[3]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[4]", "Date Submitted");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[4]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[5]", "State Submitter");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[5]").pause(2000);
       browser.waitForElementPresent('link text', 'User Management').click('link text', 'User Management');
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[1]", "Name");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[1]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[2]", "Email");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[2]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[3]", "State");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[3]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[4]", "Status");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[4]");
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[5]", "Role");
       browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[5]");
       
    },
}