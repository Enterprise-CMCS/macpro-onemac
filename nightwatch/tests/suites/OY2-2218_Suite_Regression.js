const login = require('../cases/OY2-1494_Test_SPA_Login');
const timeout = 1000;

module.exports = {
    "@tags": ["regression"],

    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard via Okta"](browser);
    },

    beforeEach: function (browser) {
        browser.pause(timeout);
    },

    after: function (browser) {
        login.after(browser);
    },

    afterEach: function (browser) {
        browser.pause(timeout * 5);
    },

    "Submit New SPA": function (browser, steps = [
        "Click on 'Start a new SPA'",
        "Enter SPA ID",
        "Upload Documents",
        "Enter Comments",
        "Submit SPA"
    ]) {
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        steps.forEach(step => newSPA[step](browser));
    },

    "Submit New Waiver": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit SPA Waiver"
    ]) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        steps.forEach(step => spaWaiver[step](browser));
    },

    "Respond to SPA RAI": function (browser, steps = [
        "Click on 'Respond to SPA RAI'",
        "Enter SPA ID",
        "Upload Documents",
        "Enter Comments",
        "Submit Response"
    ]) {
        const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
        steps.forEach(step => spaRAI[step](browser));
    },

    "Respond to 1915(b) Waiver RAI": function (browser, steps = [
        "Click on Respond to 1915(b) Waiver RAI",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Response"
    ]) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        steps.forEach(step => waiverRAI[step](browser));
    },

    "Request Temporary Extension form - 1915(b) and 1915(c)": function (browser, steps = [
        "Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Response"
    ]) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        steps.forEach(step => tempExt[step](browser));
    },
};
