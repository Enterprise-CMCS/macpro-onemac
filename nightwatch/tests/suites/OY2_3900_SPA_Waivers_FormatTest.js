// Updated by: Guli 
// Date      : 06/15/2021

const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
       login.beforeEach(browser);
       login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    'Verify the SPA ID format check on Submit New SPA': function (browser) {
        let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let spa_id_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        //browser.click("button#spaSubmitBtn");  // clicking the "Submit new SPA" link
        let valid_id_1 = "MD-20-1234";
        browser.useCss().setValue(spa_id_input, valid_id_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue(spa_id_input);

        // Enter valid SPA ID 2
        let valid_id_2 = "MD-20-1234-xxxx";
        browser.useCss().setValue(spa_id_input, valid_id_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue(spa_id_input);
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        //browser.back();  // go back to previous page
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        //browser.click("button#spaSubmitBtn");  // clicking the "Submit new SPA" link

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_id = "20-MD-1234";
        browser.useCss().setValue(spa_id_input, invalid_id);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;
        browser.useCss().clearValue(spa_id_input);

        //browser.back();  // go back to previous page
        browser.useXpath().click(dashboard_link);
    },

    'Verify the SPA ID format check on Respond to SPA RAI': function (browser) {
        //browser.click("button#spaRaiBtn");  // clicking the "Respond to SPA RAI" link
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");

        let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let spa_id_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_id_1 = "VA-20-1234 ";
        browser.useCss().setValue(spa_id_input, valid_id_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter valid SPA ID 2
        let valid_id_2 = "VA-20-1234-xxxx";
        browser.useCss().setValue(spa_id_input, valid_id_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_id = "20-VA-1234 ";
        browser.useCss().setValue(spa_id_input, invalid_id).pause(2000);
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.visible;
        browser.useCss().clearValue(spa_id_input);

        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
    },

    'Verify the Waiver Number format on Submit New Waiver Action': function (browser) {
        //browser.click("button#waiverBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();

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

        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
    },

    'Verify the Waiver Number format on Respond to 1915(c) Waiver RAI': function (browser) {
        //browser.click("button#waiverRaiBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.useCss();

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

        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
    },

    'Verify the Waiver Number format on Reuqest Temporary Extension form - 1915(b) and 1915(c)': function (browser) {
        //browser.click("button#waiverExtBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[3]");
        browser.useCss();

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

        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
    },

}
