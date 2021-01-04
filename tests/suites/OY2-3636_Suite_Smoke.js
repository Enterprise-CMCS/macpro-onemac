const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["smokeTest"],

    before : function(browser) {
        console.log('Setting up...');
        let env = 'https://d2dr7dgo9g0124.cloudfront.net/devlogin';
        browser.windowMaximize().url(env);
        browser.waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to Medicaid as Developer' : function(browser) {
        // Verifying that Login page is dispalyed
        let title = 'Developer Login';
        browser.waitForElementPresent('h1');
        browser.verify.containsText('h1', title);

        // Login to the site
        let spaPageTitle = 'SPA and Waiver Dashboard';
        let username = browser.globals.user;
        let password = browser.globals.pass;
        browser.setValue('input#email', username);
        browser.setValue('input#password', password);
        browser.click('button#loginDevUserBtn');
        browser.waitForElementPresent('body');
        browser.verify.containsText('h1', spaPageTitle);

    },

    'Verify SPA and Waiver Dashboard > Response to RAI for SPA Submission':function(browser) {
        browser.click('a:nth-of-type(1) > .list-group-item-heading');
        browser.waitForElementPresent('form > h3:nth-of-type(1)');
        browser.verify.containsText('form > h3:nth-of-type(1)', ' RAI Details');

        // Verify the SPA-ID
        let input_spaId = 'input#transmittalNumber';
        browser.assert.attributeEquals(input_spaId, 'value', "I-2-1111-1");

        // Verify Submission data
        let input_submissionDate = 'input#submittedAt';
        browser.assert.attributeContains(input_submissionDate, 'value', 'Thu, Nov 12 2020, 4:29:12 PM');

        // checking for all the diabled elements
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // checking for attachement
        let attachmenetLink = "form a[target='_blank']";
        browser.expect.element(attachmenetLink).to.be.visible;
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard > SPA Submission: DC-20-1111-EFG':function(browser) {
        browser.click('a:nth-of-type(2) > .list-group-item-heading');
        browser.waitForElementPresent('form > h3:nth-of-type(1)');
        browser.verify.containsText('form > h3:nth-of-type(1)', 'SPA Details');

        // Verify State / Territory
        let input_state = 'input#territory';
        browser.assert.attributeContains(input_state, 'value', 'DC');

        // Verify spa ID
        let spa_id = 'input#transmittalNumber';
        browser.assert.attributeContains(spa_id, 'value', 'DC-20-1111-EFG');

        let submit_date = 'input#submittedAt';
        browser.assert.attributeContains(submit_date, 'value', 'Thu, Nov 5 2020, 1:19:09 PM');

        // checking for all the diabled elements
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // check for attachements
        let attachement_cmsForm179 = "div:nth-of-type(1) > a[target='_blank']";
        let attachement_spaPages = "form div:nth-child(5) div:nth-of-type(2) [target]";
        browser.expect.element(attachement_cmsForm179).to.be.visible;
        browser.expect.element(attachement_spaPages).to.be.visible;
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard > SPA Submission: IL-20-1111-ABC':function(browser) {
        browser.click('a:nth-of-type(3) > .list-group-item-heading');
        browser.waitForElementPresent('form > h3:nth-of-type(1)');
        browser.verify.containsText('form > h3:nth-of-type(1)', 'SPA Details');

        // Verifying state and territory
        let stateInput = 'input#territory';
        browser.assert.attributeContains(stateInput, 'value', 'IL');
        browser.assert.attributeContains('input#transmittalNumber', 'value', 'IL-20-1111-ABC');

        // checking for all the diabled elements
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // check for attachements
        let attachement_cmsForm179 = "div:nth-of-type(1) > a[target='_blank']";
        let attachement_spaPages = "form div:nth-child(5) div:nth-of-type(2) [target]";
        browser.expect.element(attachement_cmsForm179).to.be.visible;
        browser.expect.element(attachement_spaPages).to.be.visible;
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard > Waiver Submission: WI-20-1221-abcd': function(browser) {
        browser.click('a:nth-of-type(4) > .list-group-item-heading');
        browser.waitForElementPresent('form > h3:nth-of-type(1)');
        browser.verify.containsText('form > h3:nth-of-type(1)', 'Waiver Action Details');

        // Verifying inputs text value
        browser.assert.attributeContains('input#territory', 'value', 'AR');
        browser.assert.attributeContains('input#actionType', 'value', 'renewal');
        browser.assert.attributeContains('input#waiverAuthority', 'value', '1915(b)(4)');
        browser.assert.attributeContains('input#transmittalNumber', 'value', 'WI-20-1221-abcd');
        browser.assert.attributeContains('input#submittedAt', 'value', 'Thu, Nov 12 2020, 11:19:11 AM');

        // checking for all the diabled elements
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // check for attachements
        let attachement_requiredUpload = "form a[target='_blank']";
        browser.expect.element(attachement_requiredUpload).to.be.visible;
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard > Response to RAI for SPA Submission: IL-20-1111-ABC': function(browser) {
        browser.click('a:nth-of-type(5) > .list-group-item-heading');
        browser.waitForElementPresent('form > h3:nth-of-type(1)');
        browser.verify.containsText('form > h3:nth-of-type(1)', 'RAI Details');

        // Verifying the input text values
        browser.assert.attributeContains('input#transmittalNumber', 'value', 'IL-20-1111-ABC');
        browser.assert.attributeContains('input#submittedAt', 'value', 'Thu, Nov 12 2020, 11:18:16 AM');

        // checking for all the diabled elements
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // check for attachements
        let attachment_raiResponse = "div:nth-of-type(1) > a[target='_blank']";
        let attachment_cmsForm = "form div:nth-child(5) div:nth-of-type(2) [target]";
        let attachment_spaPages = "div:nth-of-type(3) > a[target='_blank']";
        browser.expect.element(attachment_raiResponse).to.be.visible;
        browser.expect.element(attachment_cmsForm).to.be.visible;
        browser.expect.element(attachment_spaPages).to.be.visible;
        browser.back();  // go back to previous page
    },

    // ------------------- VERIFYING ERROR MESSSAGE ---------------------------------- //

    'Verify error message > Submit new SPA': function(browser) {
        let link_submitNewSPA = 'button#spaSubmitBtn';
        let bttn_submit = "[value='Submit']";

        // Go to New SAP page and click Submit button
        browser.click(link_submitNewSPA);
        browser.click(bttn_submit);

        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

        // Check for each input error message is visible to the user
        let count = 1;
        let locator = "(//div[@class='ds-u-color--error'])";
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.visible(xpath);
                count++;
            })
            browser.useCss();
        });

        browser.back();

    },


    'Verify error message > Respond to SPA RAI': function(browser) {
        let link_respondToSPARAI = 'button#spaRaiBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Respond to SPA RAI page and click Submit button
        browser.click(link_respondToSPARAI);
        browser.click(bttn_submit);

        // Check for page error header after clicking Submit button
        // without any inputs to the required fields
        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

        // Check for each input error message is visible to the user
        let count = 1;
        let locator = "(//div[@class='ds-u-color--error'])";
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.visible(xpath);
                count++;
            })
            browser.useCss();
        });

        browser.back();
    },

    'Verify error message > Submit new Waiver': function(browser) {
        let link_submitNewWaiver = 'button#waiverBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Submit new Waiver page and click Submit button
        browser.click(link_submitNewWaiver);
        browser.click(bttn_submit);

        // Check for page error header after clicking Submit button
        // without any inputs to the required fields
        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

        // Check for each input error message is visible to the user
        let count = 1;
        let locator = "(//div[@class='ds-u-color--error'])";
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.visible(xpath);
                count++;
            })
            browser.useCss();
        });

        browser.back();

    },

    'Verify error message > Respond to 1915(c) Waiver RAI': function(browser) {
        let link_RespondTo1915 = 'button#waiverRaiBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Submit new Waiver page and click Submit button
        browser.click(link_RespondTo1915);
        browser.click(bttn_submit);


        // Check for page error header after clicking Submit button
        // without any inputs to the required fields
        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

        // Check for each input error message is visible to the user
        let count = 1;
        let locator = "(//div[@class='ds-u-color--error'])";
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.visible(xpath);
                count++;
            })
            browser.useCss();
        });

        browser.back();

    },

    'Verify error message > Request Temporary Extension form - 1915(b) and 1915(c)': function(browser) {
        let link_requestTempExtension = 'button#waiverExtBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Submit new Waiver page and click Submit button
        browser.click(link_requestTempExtension);
        browser.click(bttn_submit);

                // Check for page error header after clicking Submit button
        // without any inputs to the required fields
        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

        // Check for each input error message is visible to the user
        let count = 1;
        let locator = "(//div[@class='ds-u-color--error'])";
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function(element){
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.visible(xpath);
                count++;
            })
            browser.useCss();
        });

         browser.back();  // go back to previous page
    },


    'Verify logout from SPA and Wavier Dashboard and login as CSM.gov Regular user': function(browser) {
        let username = "FLSESPA2";
        let password = "Macbis9!1";

        // elements
        let bttn_logout = 'button#logoutBtn';
        let bttn_login = '.nav-right > [type]';

        // logout from SPA and Wavier Dashboard page
        browser.click(bttn_logout);
        browser.waitForElementPresent('h1');

        // Verify the successful logout
        browser.verify.containsText('h1', "CMS State Plan Amendment and Waiver Submission Platform");

        // Log back in as CSM.gov Regular user
        browser.click(bttn_login);
        browser.setValue('#okta-signin-username', username);
        browser.setValue('#okta-signin-password', password);
        browser.click('input#tandc');  // Agree to Terms & Condition checkbox
        browser.click('input#okta-signin-submit');

        // Verify the successful logoin
        browser.waitForElementPresent('body');
        let txt_emptySubmission = '.empty-list';
        browser.verify.containsText(txt_emptySubmission, "You have no submissions yet");
    }

};