// Updated by: Guli 
// Date      : 03/19/2021

const login = require('../suites/OY2_9999_Login');

module.exports = {

    "@tags": ["smoke", "regression-soon"],

    // Opens the browser, goes to the test site
    before: function (browser) {
        login.beforeEach(browser);
        //login['Login with state submitter user'](browser);
        // User can go to the FAQ without logging into the application
        let fqaLink = "//a[text()='FAQ']";
        browser.useXpath().click(fqaLink).pause(500);
        let pageBanner = "//h1";
        let expectedBannerText = 'Frequently Asked Questions';
        //Switch to new tab
         browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.useXpath().expect.element(pageBanner).to.be.visible;
        browser.verify.containsText(pageBanner, expectedBannerText).pause(500);
        browser.useCss();
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    // 'User can go to the FAQ without logging into the application': function (browser) {
    //     let fqaLink = "//a[text()='FAQ']";
    //     browser.useXpath().click(fqaLink).pause(500);
    //     let pageBanner = "//h1";
    //     let expectedBannerText = 'Frequently Asked Questions';
    //     //Switch to new tab
    //      browser.windowHandles(function (result) {
    //         // 0 == current main window, 1 == new tab
    //         var handle = result.value[1];
    //         browser.switchWindow(handle);
    //     });
    //     // Verify the new window 
    //     browser.useXpath().expect.element(pageBanner).to.be.visible;
    //     browser.verify.containsText(pageBanner, expectedBannerText).pause(500);
    //     browser.useCss();
    //     browser.closeWindow(); // Close tab
    //     // Switch to main window
    //     browser.windowHandles(function (result) {
    //         // 0 == current main window, 1 == new tab
    //         var handle = result.value[0];
    //         browser.switchWindow(handle);
    //     });
    // },

    // 'User logs into Medicaid as State Submitter': function(browser) {
    //     login["Login to Medicaid as State Submitter"](browser);
    // },


    'User can go to the FAQ with logging into the application': function (browser) {
        let fqaLink = "//a[text()='FAQ']";
        browser.useXpath().click(fqaLink).pause(500);
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        let pageBanner = "//h1";
        let expectedBannerText = 'Frequently Asked Questions';
        browser.useXpath().expect.element(pageBanner).to.be.visible;
        browser.verify.containsText(pageBanner, expectedBannerText);
        browser.useCss();
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
    },

    
    'For each section under SPAs, there is a link to open the corresponding question in the FAQ': function (browser) {
        // Submit a New SPA
        // let newSPALink = 'button#spaSubmitBtn';
        // browser.click(newSPALink);
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        //browser.useCss();
        browser.useCss().click('.form-card a').pause(3000);
        //let fqaHeader = 'h4#spa-id-format';
        let fqaHeader = '(//h4[@class="faq-collapsible-trigger"])[2]';
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.useXpath().expect.element(fqaHeader).to.be.visible;
        browser.useCss();
        let expectedText = 'What format is used to enter a SPA ID?';
        browser.useXpath().verify.containsText(fqaHeader, expectedText);
        browser.useCss();
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
            //browser.back().pause(3000);
        });
        //browser.back().pause(3000);
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();

        
        // Respond to SPA RAI
        // let respondToSAPRAI = 'button#spaRaiBtn';
        // browser.click(respondToSAPRAI);
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.useCss();
        browser.click('.form-card a');
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.useXpath().expect.element(fqaHeader).to.be.visible;
        browser.verify.containsText(fqaHeader, expectedText);
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
            //browser.back().pause(3000);
        });
        //browser.back().pause(3000);
        browser.useXpath().click(dashboard_link);
        browser.useCss();
    },

    

    'For each section under Waivers, there is a link to open the corresponding question in the FAQ': function (browser) {
        // Submit a new Waiver 
        // browser.click('button#waiverBtn');
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        //browser.useCss();
        browser.useCss().click('.form-card a');
        let fqaHeader = '(//h4[@class="faq-collapsible-trigger"])[4]';

        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.useXpath().expect.element(fqaHeader).to.be.visible;
        let expectedText = 'What format is used to enter a 1915(b) waiver number?';
        browser.verify.containsText(fqaHeader, expectedText);
        browser.useCss();
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();
        //browser.back().pause(3000);
        
        // Respond to 1915(b) Waiver RAI
        //browser.click('button#waiverRaiBtn');
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.useCss().click('.form-card a');
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.useXpath().expect.element(fqaHeader).to.be.visible;
        browser.verify.containsText(fqaHeader, expectedText);
        browser.useCss();
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });

        //browser.back();
        browser.useXpath().click(dashboard_link);
        browser.useCss();

        // Request Waiver Temporary Extension
        //browser.click('button#waiverExtBtn');
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[3]");
        browser.useCss().click('.form-card a');

        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.useXpath().expect.element(fqaHeader).to.be.visible;
        browser.verify.containsText(fqaHeader, expectedText);
    },

    
    'Clicking the link on the FAQ page will result in a new detailed page': function (browser) {
        browser.useXpath().click("(//h4)[3]");
        browser.pause(300);
        let linkInFAQ = '.form-card [target]';
        browser.useCss().click(linkInFAQ);
        let submittalAmendments = "//h2";
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab, 2 == new link tab from FAQ page
            var handle = result.value[2];
            browser.switchWindow(handle);
        });
        //Verify the new window 
        browser.useXpath().expect.element(submittalAmendments).to.be.visible;
        browser.verify.containsText(submittalAmendments, 'Submittal of State plans and plan amendments.');
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
        browser.useCss();
    },
}