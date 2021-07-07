// let generatedSPAID;
// let generatedWaiverID;
// const login = require('./OY2_9999_Login');

// module.exports = {
//     "@tags": ["smoke", "regression-soon"],

//     before: function (browser) {
//         login.beforeEach(browser);
//         login['Login with state submitter user'](browser);
//     },

//     after: function (browser) {
//         login.afterEach(browser);

//     },

//     'User can see their state access management': function (browser) {
//         let my_account_button = 'button#myAccountLink';
//         let manage_account_link = 'a#manageAccountLink';

//         // Click on button My Account and get access to account management
//         browser.click(my_account_button);
//         browser.click(manage_account_link);
//         browser.pause(2000);
//         //check on state access management for state submitter user 
//         let state_access_management = "(//h3)[5]";
//         let maryland = "(//div[@class='state-access-card']/dt)[1]";
//         let maryland_access_granted = "(//div[@class='state-access-card']/dd/em)[1]";
//         //check if each element is visible
//         browser.useXpath().expect.element(state_access_management).to.be.visible;
//         browser.useXpath().expect.element(maryland_access_granted).to.be.visible;
//         browser.useXpath().expect.element(maryland).to.be.visible;
//         browser.useCss();
//         let dashboard = "(//div[@class ='nav-left-links']/a)[2]";
//         browser.pause(2000);
//         browser.useXpath().waitForElementVisible(dashboard, 1000);
//         browser.useXpath().click(dashboard);
//         browser.useCss();
//         browser.pause(2000);
//     },

//     'Submit new SPA with state name and verify if it shows under submission list': function (browser) {
//         // Submit a SPA Report 
//         const newSPA = require('./OY2-3636_Suite_Smoke.js');
//         generatedSPAID = newSPA['Verify Submitter user can submit new SPA'](browser);
//         // Verify the submitted Content 
//         let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
//         let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
//         let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
//         // SPA ID Verification
//         browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
//         browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
//         // Submitted Type Verification
//         browser.useXpath().expect.element(submittedType).to.be.visible;
//         browser.pause(1000);
//         browser.useXpath().assert.containsText(submittedType, "Medicaid SPA").pause(1000);
//         // Data Submitted Verification
//         browser.useXpath().expect.element(submittedDate).to.be.visible;
//         browser.useXpath().assert.containsText("(//tbody/tr/td)[3]","MD");
//         browser.useCss();
//     },
// }
