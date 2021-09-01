// const login = require('../suites/OY2_9999_Login');
// module.exports = {

//     "@tags": ["smoke", "regression-soon"],

//     before: function (browser) {
//         login.beforeEach(browser);
//         login['Login with cms_helpdesk_users'](browser); 
//     },

//     after: function (browser) {
//         login.afterEach(browser);
//     },
//     'Verify the sort funtionality on Dashboard': function (browser) {
//         browser.useXpath().assert.containsText( "//h1", "Submission List");
//         browser.useXpath().assert.containsText("//*[@id='transmittalNumberColHeader']", "ID/Number");
//         browser.useXpath().assert.containsText( "//*[@id='typeColHeader']", "Type");
//         browser.click("xpath", "//*[@id='typeColHeader']");
//         browser.useXpath().assert.containsText( "//*[@id='territoryColHeader']", "State");
//         browser.click("xpath", "//*[@id='territoryColHeader']");
//         browser.useXpath().assert.containsText( "//*[@id='submittedAtColHeader']", "Date Submitted");
//         browser.click("xpath", "//*[@id='submittedAtColHeader']");
//         browser.useXpath().assert.containsText(  "//*[@id='submitterColHeader']", "Submitted By");
//         browser.click("xpath",  "//*[@id='submitterColHeader']").pause(2000);
//         browser.waitForElementPresent('link text', 'User Management').click('link text', 'User Management');
//         browser.useXpath().assert.containsText( "//*[@id='nameColHeader']", "Name");
//         browser.click("xpath", "//*[@id='nameColHeader']");
//         browser.useXpath().assert.containsText( "//*[@id='stateColHeader']", "State");
//         browser.click("xpath", "//*[@id='stateColHeader']");
//         browser.useXpath().assert.containsText( "//*[@id='statusColHeader']", "Status");
//         browser.click("xpath", "//*[@id='statusColHeader']");
//         browser.useXpath().assert.containsText( "//*[@id='roleColHeader']", "Role");
//         browser.click("xpath", "//*[@id='roleColHeader']");
       
//     },
// }
