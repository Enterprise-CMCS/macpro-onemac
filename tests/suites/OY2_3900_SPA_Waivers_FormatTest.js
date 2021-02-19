

module.exports = {
    "@tags": ["formatTest1", "test1"],
    
    before : function(browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
    },

    after : function(browser) {
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    }, 

    'Login to Medicaid as Regular User' : function(browser) {
        // Test Data 
        const username = browser.globals.user;
        const password = browser.globals.pass;
        let spaPageTitle = 'SPA and Waiver Dashboard';

        // Test Stesp
        browser.click('.nav-right > [type]');  // click the login button
        browser.setValue('#okta-signin-username', username);
        browser.setValue('#okta-signin-password', password);
        browser.click('#tandc');
        browser.click('#okta-signin-submit');
        browser.waitForElementPresent('body');

        // Test Assertion
        browser.verify.containsText('h1', spaPageTitle);
    }, 

    'Verify the SPA ID format check on Submit New SPA' : function(browser) {
                let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let spa_id_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        browser.click("button#spaSubmitBtn");  // clicking the "Submit new SPA" link
        let valid_id_1 = "VA-20-1234";
        browser.setValue(spa_id_input, valid_id_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter valid SPA ID 2
        let valid_id_2 = "VA-20-1234-xxxx";
        browser.setValue(spa_id_input, valid_id_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);
        browser.back();  // go back to previous page
        browser.click("button#spaSubmitBtn");  // clicking the "Submit new SPA" link

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_id = "20-VA-1234";
        browser.setValue(spa_id_input, invalid_id);
        browser.expect.element('#transmittalNumberErrorMsg').to.be.visible;
        browser.clearValue('css selector', spa_id_input);

        browser.back();  // go back to previous page
    }, 

    'Verify the SPA ID format check on Respond to SPA RAI' : function(browser) {
        browser.click("button#spaRaiBtn");  // clicking the "Respond to SPA RAI" link

        let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let spa_id_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_id_1 = "VA-20-1234";
        browser.setValue(spa_id_input, valid_id_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter valid SPA ID 2
        let valid_id_2 = "VA-20-1234-xxxx";
        browser.setValue(spa_id_input, valid_id_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', spa_id_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_id = "20-VA-1234";
        browser.setValue(spa_id_input, invalid_id);
        browser.expect.element(error_msg_element).to.be.visible;

        browser.back();  // go back to previous page
    }, 

    'Verify the Waiver Number format on Submit New Waiver Action': function(browser) {
        browser.click("button#waiverBtn");

        let error_msg_element = 'div#waiverTransmittalNumberErrorMsg';
        let waiver_num_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_num_1 = "SS.22.R22.M22";
        browser.setValue(waiver_num_input, valid_num_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter valid SPA ID 2
        let valid_num_2 = "SS.2222.R11.33";
        browser.setValue(waiver_num_input, valid_num_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_num = "SS.##.R##.M##";
        browser.setValue(waiver_num_input, invalid_num);
        browser.expect.element(error_msg_element).to.be.visible;

        browser.back();  // go back to previous page
    }, 

    'Verify the Waiver Number format on Respond to 1915(c) Waiver RAI': function(browser) {
        browser.click("button#waiverRaiBtn");

        let error_msg_element = 'div#spaTransmittalNumberErrorMsg';
        let waiver_num_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_num_1 = "SS.22.R22.M22";
        browser.setValue(waiver_num_input, valid_num_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter valid SPA ID 2
        let valid_num_2 = "SS.2222.R11.33";
        browser.setValue(waiver_num_input, valid_num_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_num = "SS.##.R##.M##";
        browser.setValue(waiver_num_input, invalid_num);
        browser.expect.element(error_msg_element).to.be.visible;

        browser.back();  // go back to previous page
    }, 

    'Verify the Waiver Number format on Reuqest Temporary Extension form - 1915(b) and 1915(c)': function(browser) {
        browser.click("button#waiverExtBtn");

        let error_msg_element = 'div#waiverTransmittalNumberErrorMsg';
        let waiver_num_input = "[name='transmittalNumber']";

        // Enter valid SPA ID 1
        let valid_num_1 = "SS.22.R22.M22";
        browser.setValue(waiver_num_input, valid_num_1);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter valid SPA ID 2
        let valid_num_2 = "SS.2222.R11.33";
        browser.setValue(waiver_num_input, valid_num_2);
        browser.expect.element(error_msg_element).to.be.not.present;
        browser.clearValue('css selector', waiver_num_input);

        // Enter invalid SPA ID and make sure error message is displayed 
        let invalid_num = "SS.##.R##.M##";
        browser.setValue(waiver_num_input, invalid_num);
        browser.expect.element(error_msg_element).to.be.visible;

        browser.back();  // go back to previous page
    }
}