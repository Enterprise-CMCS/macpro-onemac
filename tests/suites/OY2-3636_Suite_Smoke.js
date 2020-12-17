const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["guli"],

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
        let username = 'nkrishna@collabralink.com';
        let password = 'Macbis123!';
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

    'Verify error message > Submit new SPA': function(browser){
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


    'Verify error message > Respond to SPA RAI': function(browser){
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
    
    'Verify error message > Respond to 1915(c) Waiver RAI': function(browser){
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

    'Verify error message > Request Temporary Extension form - 1915(b) and 1915(c)': function(browser){
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
    }

};