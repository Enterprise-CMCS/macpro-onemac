const login = require('../cases/OY2-1494_Test_SPA_Login');

let generatedSPAID;
let generatedWaiverID;

module.exports = {
    "@tags": ["smoke"],

    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
        login["Login to Medicaid as Regular User"](browser);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    },

    // ------------------- VERIFYING PACKAGE CONTENT for SPAs ---------------------------------- //
    
    'Verify SPA and Waiver Dashboard Submission > Submit new SPA': function (browser) {
        // Submit a SPA Report 
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        newSPA["Click on 'Start a new SPA'"](browser);
        //newSPA["Enter SPA State/Territory Information"](browser);
        generatedSPAID = newSPA["Enter SPA ID"](browser);
        newSPA["Upload Documents"](browser);
        newSPA["Enter Comments"](browser);
        newSPA["Submit SPA"](browser);

        // Verify the submitted SPA Report Content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath();
        browser.click(submitted).pause(2000);
        browser.useCss();

        // verify the disabled content 
        // checking for all the diabled elements 
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function (element) {
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // // Checking for attachements 
        let counts = 1;
        locator1 = "(//form//div/a[@target='_blank'])";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard Submission > Respond to SPA RAI': function (browser) {
        // Submit a SPA RAI 
        const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
        spaRAI["Click on 'Respond to SPA RAI'"](browser);

        let selector = '@transmittal';
        const spa = browser.page.spaBasePage();
        spa.click(selector);
        spa.setValue(selector, generatedSPAID);
        browser.pause(1000);
        spaRAI["Upload Documents"](browser);
        spaRAI["Enter Comments"](browser);

        // Click Submit
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath();
        browser.click(submitted).pause(2000);
        browser.useCss();

        // verify the disabled content 
        // checking for all the diabled elements 
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function (element) {
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // // Checking for attachements 
        let counts = 1;
        locator1 = "(//form//div/a[@target='_blank'])";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    // ------------------- VERIFYING PACKAGE CONTENT for Waivers ---------------------------------- //
    'Verify SPA and Waiver Dashboard Submission > Submit new Waiver': function (browser) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        spaWaiver["Click on 'Submit new Waiver'"](browser);

        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='new']");
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");

        generatedWaiverID = spaWaiver["Enter Waiver Number"](browser);
        spaWaiver["Upload Documents"](browser);
        spaWaiver["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath();
        browser.click(submitted).pause(2000);
        browser.useCss();

        // verify the disabled content 
        // checking for all the diabled elements 
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function (element) {
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // // Checking for attachements 
        let counts = 1;
        locator1 = "(//form//div/a[@target='_blank'])";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page

    },

    'Verify SPA and Waiver Dashboard Submission > Respond to 1915(b) Waiver RAI': function (browser) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        waiverRAI["Click on Respond to 1915(b) Waiver RAI"](browser);
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        waiverRAI["Upload Documents"](browser);
        waiverRAI["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath();
        browser.click(submitted).pause(2000);
        browser.useCss();

        // verify the disabled content 
        // checking for all the diabled elements 
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function (element) {
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // // Checking for attachements 
        let counts = 1;
        locator1 = "(//form//div/a[@target='_blank'])";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard Submission > Respond to 1915(b) Waiver RAI': function (browser) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        tempExt["Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'"](browser);
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        tempExt["Upload Documents"](browser);
        tempExt["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath();
        browser.click(submitted).pause(2000);
        browser.useCss();

        // verify the disabled content 
        // checking for all the diabled elements 
        let count = 1;
        let locator = '(//*[@disabled])';
        browser.elements('xpath', locator, function (elements) {
            elements.value.forEach(function (element) {
                let xpath = locator.concat('[' + count + ']');
                browser.useXpath().assert.attributeContains(xpath, 'disabled', true);
                count++;
            })
            browser.useCss();
        });

        // // Checking for attachements 
        let counts = 1;
        locator1 = "(//form//div/a[@target='_blank'])";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    
    

    // ------------------- VERIFYING ERROR MESSSAGE ---------------------------------- //


    'Verify error message > Submit new SPA': function (browser) {
        let link_submitNewSPA = 'button#spaSubmitBtn';
        let bttn_submit = "[value='Submit']";

        // Go to New SAP page and click Submit button 
        browser.click(link_submitNewSPA);
        browser.click(bttn_submit);

        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'Missing Required Attachments');

        // Check for each input error message is visible to the user
        let attachement_error_msg = '.ds-u-color--error div';
        browser.waitForElementPresent(attachement_error_msg);
        browser.verify.containsText(attachement_error_msg, 'Required attachments missing');

        browser.back();
    },
    


    'Verify error message > Respond to SPA RAI': function (browser) {
        let link_respondToSPARAI = 'button#spaRaiBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Respond to SPA RAI page and click Submit button
        browser.click(link_respondToSPARAI);
        browser.click(bttn_submit);

        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'Missing Required Attachments');

        // Check for each input error message is visible to the user
        let attachement_error_msg = '.ds-u-color--error div';
        browser.waitForElementPresent(attachement_error_msg);
        browser.verify.containsText(attachement_error_msg, 'Required attachments missing');

        browser.back();
    },
    
    'Verify error message > Submit new Waiver': function (browser) {
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

        // Verifying Action Type Error
        let action_type_error = "(//div[@class='ds-u-color--error'])[1]";
        browser.useXpath().assert.visible(action_type_error);
        browser.useXpath().assert.containsText(action_type_error, 'Please select the Action Type.');

        // Verifying Waiver Numver Error
        let waiver_num_error = "(//div[@class='ds-u-color--error'])[2]";
        browser.useXpath().assert.visible(waiver_num_error);
        browser.useXpath().assert.containsText(waiver_num_error, 'Waiver Number Required !');
        browser.useCss();

        browser.back();
    },

    
    'Verify error message > Respond to 1915(c) Waiver RAI': function (browser) {
        let link_RespondTo1915 = 'button#waiverRaiBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Submit new Waiver page and click Submit button
        browser.click(link_RespondTo1915);
        browser.click(bttn_submit);


        // Check for page error header after clicking Submit button 
        // without any inputs to the required fields
        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'Missing Required Attachments');

        // Check for each input error message is visible to the user
        // .ds-u-color--error div
        let attachement_error = ".ds-u-color--error div";
        browser.assert.visible(attachement_error);
        browser.assert.containsText(attachement_error, 'Required attachments missing');
        
        browser.back();
    },

    'Verify error message > Request Temporary Extension form - 1915(b) and 1915(c)': function (browser) {
        let link_requestTempExtension = 'button#waiverExtBtn';
        let bttn_submit = "[value='Submit']";

        // Go to Submit new Waiver page and click Submit button
        browser.click(link_requestTempExtension);
        browser.click(bttn_submit);

        // Check for page error header after clicking Submit button 
        // without any inputs to the required fields
        let error_pageAlert = '.ds-c-alert__heading';
        browser.waitForElementPresent(error_pageAlert);
        browser.verify.containsText(error_pageAlert, 'Missing Required Attachments');

        // Check for each input error message is visible to the user
        // .ds-u-color--error div
        let attachement_error = ".ds-u-color--error div";
        browser.assert.visible(attachement_error);
        browser.assert.containsText(attachement_error, 'Required attachments missing');

        browser.back();  // go back to previous page
    },
};