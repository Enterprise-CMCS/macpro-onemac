

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
    'Verify that there are Dashboard and User Management tabs': function (browser) {
        browser.click("xpath", "/html/body/reference/div/div/div[1]/div[2]/div/div[1]/div/a[3]").pause(4000);
        browser.useXpath().assert.containsText( "//*[@id='title_bar']/div/div/h1", "User Management");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[1]/div/button", "Export to Excel(CSV)");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[1]", "Name");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[2]", "Email");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[3]", "State");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[4]", "Status");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[5]", "Role");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[6]", "Last Modified");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[7]", "Modified By");
        browser.useCss();
        browser.click("xpath", "/html/body/reference/div/div/div[2]/div[1]/div/button");
        browser.click("xpath", "/html/body/reference/div/div/div[1]/div[2]/div/div[1]/div/a[2]");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[1]/div/div/h1", "Submission List");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[1]/div/button", "Export to Excel(CSV)");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[1]", "SPA ID/Waiver Number");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[2]", "Type");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[3]", "State");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[4]", "Date Submitted");
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/table/thead/tr/th[5]", "State Submitter");      
        browser.useCss();
        browser.click("xpath", "/html/body/reference/div/div/div[2]/div[1]/div/button");
        browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/tbody/tr[1]/td[1]/a" );
        browser.useXpath().assert.elementPresent("(//li[@class='choice-list-item']/a)[1]");
        browser.useCss();
        browser.useXpath().click("(//li[@class='choice-list-item']/a)[1]").pause(2000);
        }
}