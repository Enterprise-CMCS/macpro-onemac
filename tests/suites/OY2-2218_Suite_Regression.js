
const login = require('../cases/OY2-1494_Test_SPA_Login');
let generatedSPAID;
let generatedWaiverID;

module.exports = {

    "@tags": ["regression", "regressionTX"],

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

    "Submit a SPA Report": function (browser) {
        // Submit a SPA Report 
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        newSPA["Click on 'Start a new SPA'"](browser);
        //newSPA["Enter SPA State/Territory Information"](browser);
        generatedSPAID = newSPA["Enter SPA ID"](browser);
        newSPA["Upload Documents"](browser);
        newSPA["Enter Comments"](browser);
        newSPA["Submit SPA"](browser);
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath().verify.containsText(submitted, generatedSPAID);
        browser.useCss();
    },

    "Submit a SPA RAI Response'": function (browser) {
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
        let submitted = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        browser.useXpath().verify.containsText(submitted, "SPA RAI");
        browser.useCss();
    },

    "Submit a SPA Waiver ": function (browser) {
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
        let submitted = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        browser.useXpath().verify.containsText(submitted, generatedWaiverID);
        browser.useCss();
    },

    "Submit a Respond to 1915b Waiver RAI": function (browser) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        waiverRAI["Click on Respond to 1915(b) Waiver RAI"](browser);
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        waiverRAI["Upload Documents"](browser);
        waiverRAI["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        browser.useXpath();
        browser.useXpath().verify.containsText(submitted, "Waiver RAI");
        browser.useCss();
    },

    "Submit a Temporary Request Extension": function (browser) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        tempExt["Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'"](browser);
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        tempExt["Upload Documents"](browser);
        tempExt["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted content 
        let submitted = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        browser.useXpath();
        browser.useXpath().verify.containsText(submitted, "Temporary Extension Request");
        browser.useCss();
    },
};