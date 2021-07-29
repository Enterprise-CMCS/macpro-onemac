

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
        //browser.useXpath().click("/html/body/reference/div/div/div[1]/div[2]/div[1]/div[2]/a[3]").pause(2000);
        browser.click("xpath", "/html/body/reference/div/div/div[1]/div[2]/div/div[1]/div/a[3]").pause(4000);
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[1]/div[2]/div/div[1]/div/a[3]", "User Management");
        browser.useXpath().assert.containsText( "//button[@id='new-submission-button']", "Export to Excel(CSV)");
        browser.useXpath().assert.containsText( "//*[@id='nameColHeader']", "Name");
        browser.useXpath().assert.containsText( "//*[@id='stateColHeader']", "State");
        browser.useXpath().assert.containsText( "//*[@id='statusColHeader']", "Status");
        browser.useXpath().assert.containsText( "//*[@id='roleColHeader']", "Role");
        browser.useXpath().assert.containsText( "//*[@id='lastModifiedColHeader']", "Last Modified");
        browser.useXpath().assert.containsText( "//*[@id='doneByNameColHeader']", "Modified By");
        browser.useCss();
        browser.click("xpath", "//button[@id='new-submission-button']");
        browser.click("xpath", "//a[@id='dashboardLink']");
        browser.useXpath().assert.containsText( "//h1", "Submission List");
        browser.useXpath().assert.containsText( "//button[@id='new-submission-button']", "Export to Excel(CSV)");
        browser.useXpath().assert.containsText( "//*[@id='transmittalNumberColHeader']", "SPA ID/Waiver Number");
        browser.useXpath().assert.containsText( "//*[@id='typeColHeader']", "Type");
        browser.useXpath().assert.containsText( "//*[@id='territoryColHeader']", "State");
        browser.useXpath().assert.containsText( "//*[@id='submittedAtColHeader']", "Date Submitted");
        browser.useXpath().assert.containsText( "//*[@id='submitterColHeader']", "State Submitter");      
        browser.useCss();
        browser.click("xpath", "//button[@id='new-submission-button']");
        browser.click("xpath", "/html/body/reference/div/div/div[2]/div[2]/table/tbody/tr[1]/td[1]/a" );
        browser.useXpath().assert.elementPresent("(//li[@class='choice-list-item']/a)[1]");
        browser.useCss();
        browser.useXpath().click("(//li[@class='choice-list-item']/a)[1]").pause(2000);
        },
}
