const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["smokeTest"],

    before : function(browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        let env = 'https://d2dr7dgo9g0124.cloudfront.net/devlogin';
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(env);
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

    // ------------------- VERIFYING PACKAGE CONTENT for SPAs ---------------------------------- //
    'Verify SPA and Waiver Dashboard Submission > Submit new SPA':function(browser) {
        // Submit a SPA Report 
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        newSPA["Click on 'Start a new SPA'"](browser);
        newSPA["Enter SPA State/Territory Information"](browser);
        newSPA["Enter SPA ID"](browser);
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
            elements.value.forEach(function(element){
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
            elements.value.forEach(function(element){
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard Submission > Respond to SPA RAI': function(browser) {
        // Submit a SPA RAI 
            const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
            spaRAI["Click on 'Respond to SPA RAI'"](browser);
            spaRAI["Enter SPA ID"](browser);
            spaRAI["Upload Documents"](browser);
            spaRAI["Enter Comments"](browser);
            spaRAI["Submit Response"](browser);

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
               elements.value.forEach(function(element){
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
               elements.value.forEach(function(element){
                   let xpaths = locator1.concat('[' + counts + ']');
                   browser.useXpath().assert.containsText(xpaths, 'file');
                   counts++;
               })
               browser.useCss();
           });
           browser.back();  // go back to previous page
    },

    // ------------------- VERIFYING PACKAGE CONTENT for Waivers ---------------------------------- //
    'Verify SPA and Waiver Dashboard Submission > Submit new Waiver': function(browser) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        spaWaiver["Click on 'Submit new Waiver'"](browser);
        spaWaiver["Enter SPA State/Territory Information"](browser);
        spaWaiver["Enter Waiver Authority"](browser);
        spaWaiver["Enter Waiver Number"](browser);
        spaWaiver["Enter Action Type"](browser);
        spaWaiver["Upload Documents"](browser);
        spaWaiver["Enter Comments"](browser);
        spaWaiver["Submit SPA Waiver"](browser);

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
              elements.value.forEach(function(element){
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
              elements.value.forEach(function(element){
                  let xpaths = locator1.concat('[' + counts + ']');
                  browser.useXpath().assert.containsText(xpaths, 'file');
                  counts++;
              })
              browser.useCss();
          });
          browser.back();  // go back to previous page

    },

    'Verify SPA and Waiver Dashboard Submission > Respond to 1915(b) Waiver RAI': function(browser) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        waiverRAI["Click on Respond to 1915(b) Waiver RAI"](browser);
        waiverRAI["Enter Waiver Number"](browser);
        waiverRAI["Upload Documents"](browser);
        waiverRAI["Enter Comments"](browser);
        waiverRAI["Submit Response"](browser);

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
            elements.value.forEach(function(element){
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
            elements.value.forEach(function(element){
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify SPA and Waiver Dashboard Submission > Respond to 1915(b) Waiver RAI': function(browser) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        tempExt["Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'"](browser);
        tempExt["Enter Waiver Number"](browser);
        tempExt["Upload Documents"](browser);
        tempExt["Enter Comments"](browser);
        tempExt["Submit Response"](browser);
        
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
            elements.value.forEach(function(element){
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
            elements.value.forEach(function(element){
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().assert.containsText(xpaths, 'file');
                counts++;
            })
            browser.useCss();
        });
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


    'Verify logout from SPA and Wavier Dashboard': function(browser) {
    
        // elements 
        let bttn_logout = 'button#logoutBtn';
        let logout_banner_text = "CMS State Plan Amendment and Waiver Submission Platform";

        // logout from SPA and Wavier Dashboard page
        browser.click(bttn_logout);
        browser.waitForElementPresent('h1');

        // Verify the successful logout 
        browser.verify.containsText('h1', logout_banner_text);
    }

};