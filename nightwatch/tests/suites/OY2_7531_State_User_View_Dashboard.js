const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["stateDashb", "smoke", "regression-soon"],

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
    },



/*
        let valid_id_1 = "VA-20-1234";
        browser.setValue(spa_id_input, valid_id_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue(spa_id_input);

        // Enter valid SPA ID 2
        let valid_id_2 = "VA-20-1234-xxxx";
        browser.setValue(spa_id_input, valid_id_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue(spa_id_input);
        browser.back();  // go back to previous page
        browser.click("button#spaSubmitBtn");  // clicking the "Submit new SPA" link

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_id = "20-VA-1234";
        browser.setValue(spa_id_input, invalid_id);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;
        browser.useCss().clearValue(spa_id_input);

        browser.back();  // go back to previous page
    },
    'Verify the SPA ID format check on Respond to SPA RAI': function (browser) {
        browser.click("button#spaRaiBtn");  // clicking the "Respond to SPA RAI" link

        let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let spa_id_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_id_1 = "VA-20-1234 ";
        browser.setValue(spa_id_input, valid_id_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter valid SPA ID 2
        let valid_id_2 = "VA-20-1234-xxxx";
        browser.setValue(spa_id_input, valid_id_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_id = "20-VA-1234 ";
        browser.setValue(spa_id_input, invalid_id).pause(2000);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;
        browser.useCss().clearValue(spa_id_input);

        browser.back();  // go back to previous page
    },

    'Verify the Waiver Number format on Submit New Waiver Action': function (browser) {
        browser.click("button#waiverBtn");

        let error_msg_element = 'div#waiverTransmittalNumberErrorMsg';
        let waiver_num_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_num_1 = "VA.22.R22.M22 ";
        browser.setValue(waiver_num_input, valid_num_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter valid SPA ID 2
        let valid_num_2 = "SS.2222.R11.33 ";
        browser.setValue(waiver_num_input, valid_num_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_num = "SS.##.R##.M## ";
        browser.setValue(waiver_num_input, invalid_num);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;

        browser.back();  // go back to previous page
    },

    'Verify the Waiver Number format on Respond to 1915(c) Waiver RAI': function (browser) {
        browser.click("button#waiverRaiBtn");

        let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let waiver_num_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_num_1 = "SS.22.R22.M22 ";
        browser.setValue(waiver_num_input, valid_num_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter valid SPA ID 2
        let valid_num_2 = "SS.2222.R11.33 ";
        browser.setValue(waiver_num_input, valid_num_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_num = "SS.##.R##.M## ";
        browser.setValue(waiver_num_input, invalid_num);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;

        browser.back();  // go back to previous page
    },

    'Verify the Waiver Number format on Reuqest Temporary Extension form - 1915(b) and 1915(c)': function (browser) {
        browser.click("button#waiverExtBtn");

        let error_msg_element = 'div#waiverTransmittalNumberErrorMsg';
        let waiver_num_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_num_1 = "SS.22.R22.M22 ";
        browser.setValue(waiver_num_input, valid_num_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter valid SPA ID 2
        let valid_num_2 = "SS.2222.R11.33 ";
        browser.setValue(waiver_num_input, valid_num_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_num = "SS.##.R##.M## ";
        browser.setValue(waiver_num_input, invalid_num);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;

        browser.back();  // go back to previous page
    }
*/
}