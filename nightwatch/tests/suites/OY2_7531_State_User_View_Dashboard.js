let generatedSPAID;
let generatedWaiverID;
const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        const testData = {
            username: process.env.TEST_STATE_USERS,
            password: process.env.TEST_STATE_USER_PASSWORD,
          }
          login.before(browser);
          //click on button
          //browser.useCss().click("#loginBtn");
        login["Login to SPA and Waiver Dashboard via Okta"](browser,testData);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.info("Stopping test executions...")
        console.info('Closing down the browser instance...');
        browser.end();
    },

    'User can see their state access management': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';

        // Click on button My Account and get access to account management 
        browser.click(my_account_button); 
        browser.click(manage_account_link); 
        browser.pause(2000);
        //check on state access management for state user 
        let state_access_management = "(//h3)[4]";
        let virginia = "(//div[@class='state-access-card']/dt)[1]";
        let virginia_access_granted = "(//div[@class='state-access-card']/dd/em)[1]";
        let michigan = "(//div[@class='state-access-card']/dt)[2]";
        let michigan_access_granted = "(//div[@class='state-access-card']/dd/em)[2]";
        //check if each element is visible 
        browser.useXpath().expect.element(state_access_management).to.be.visible;
        browser.useXpath().expect.element(virginia).to.be.visible;
        browser.useXpath().expect.element(virginia_access_granted).to.be.visible;
        browser.useXpath().expect.element(michigan).to.be.visible;
        browser.useXpath().expect.element(michigan_access_granted).to.be.visible;
        browser.useCss();
        let dashboard = "(//div[@class ='nav-left']/a)[2]";
        browser.pause(2000);
        browser.useXpath().click(dashboard);
        browser.useCss();
        browser.pause(2000);
    },

    'Submit new SPA with state name and verify if it shows under submission list': function (browser) {
        // Submit a SPA Report 
        const newSPA = require('../suites/OY2-3636_Suite_Smoke.js');
        generatedSPAID = newSPA['Verify user can submit new SPA'](browser);
        // Verify the submitted Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
        // SPA ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.pause(1000);
        browser.useXpath().assert.containsText(submittedType, "SPA").pause(1000);
        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useXpath().assert.containsText("(//tbody/tr/td)[3]","MD");
        browser.useCss();
    },
}