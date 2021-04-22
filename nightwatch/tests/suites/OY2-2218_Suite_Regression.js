const login = require('../cases/OY2-1494_Test_SPA_Login');
const timeout = 1000;

module.exports = {
    "@tags": ["regression","regression2"],

    before: function (browser, loginType = "Login to SPA and Waiver Dashboard via Okta") {
        login.before(browser);
        login[loginType](browser);
        browser.pause(timeout * 5);
    },

    afterEach: function (browser) {
        let spa = browser.page.spaBasePage();
        spa.click('@dashboardLink').waitForElementPresent('body');
    },

    after: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },
    
    "Submit a SPA Report": function (browser, steps = [
        "Click on 'Start a new SPA'",
        "Enter SPA ID",
        "Upload Documents",
        "Enter Comments",
        "Submit SPA"
    ]) {
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        steps.forEach(step => newSPA[step](browser));
    },

    "Submit a SPA RAI Response": function (browser, steps = [
        "Click on 'Respond to SPA RAI'",
        "Enter SPA ID",
        "Upload Documents",
        "Enter Comments",
        "Submit Response",
    ]) {
        const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
        steps.forEach(step => spaRAI[step](browser));
    },

    "Submit a New Waiver Action": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Waiver"
    ]) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        steps.forEach((step) => spaWaiver[step](browser))
    },

    "Submit an Amendment Waiver Action": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Waiver"
    ]) {
        const waiverAmendment = require('../cases/OY2-5866_Submit_Amendment_Waiver');
        steps.forEach(step => waiverAmendment[step](browser));
    },

    "Submit a Renewal Waiver Action": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Waiver"
    ]) {
        const renewWaiver = require('../cases/OY2-5866_Submit_Renewal_Waiver');
        steps.forEach(step => renewWaiver[step](browser));
    },

    "Submit a 'Respond to 1915(b) Waiver RAI'": function (browser, steps = [
        "Click on Respond to 1915(b) Waiver RAI",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Response"
    ]) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        steps.forEach(step => waiverRAI[step](browser));
    },

    "Submit a Temporary Request Extension": function (browser, steps = [
        "Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Response",
    ]) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        steps.forEach(step => tempExt[step](browser));
    },

    "Submit a 1915(c) Appendix K Amendment": function (browser) {
        const appK = require('../cases/OY2-5832_Test_SPA_Submit_Appendix_K_Amendment');
        appK["Click on 'Submit 1915(c) Appendix K Amendment'"](browser);
        appK["Enter Waiver Number"](browser);
        appK["Upload Documents"](browser);
        appK["Enter Comments"](browser);
        appK["Submit Form"](browser);
    },
    "View My Account Page": function (browser) {
        const account = require('../cases/OY2_5196_Test_View_User_Profile');
        account["Navigate to the Manage Account page"](browser);
    }
};
