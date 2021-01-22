
let spa;
const timeout = 1000;
module.exports = {
    "@tags": ["badtransmittal"],
    before : function(browser) {
        console.log('Setting up...');
        spa = browser.page.spaBasePage();
        browser.maximizeWindow()
            .url(browser.launch_url)
            .waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser) {
        const testData = {
            username: browser.globals.user,
            password: browser.globals.pass
        };
        spa.devLogin(testData.username, testData.password);
        spa.verify.visible('@loginTitle');
    },

    'Login to SPA and Waiver Dashboard via Okta' : function(browser) {
        const testData = {
            username: browser.globals.user,
            password: browser.globals.pass
        };
        spa.login(testData.username, testData.password);
        spa.verify.visible('@loginTitle');
    },

    "Click on 'Dev Backend Test'": function (browser) {
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent('@newSPA');
        spa.click('@newSPA').waitForElementPresent('body');
        browser.expect.url().to.contain('/devbackendtest').before(timeout * 5);
        browser.pause(timeout);
    },

    "Enter Bad SPA ID" : function (browser, spa_id = "badID") {
        let testData = {
            selector: '@transmittal',
            spa_id: spa_id,
        };

        spa.click(testData.selector);
        spa.setValue(testData.selector, testData.spa_id);
        browser.pause(timeout / 2);
        spa.expect.element(testData.selector).value.to.contain(testData.spa_id);

    },

    "Submit Bad SPA" : function (browser) {
        let backend_response = "[id*=backendResponse]";

        let alert_msg = "Submission Completed";
        let msg = "{\"error\":\"Transmittal ID State/Territory Not Valid\"}";

        browser.click('[type="submit"]');
        browser.waitForElementVisible('body');
        browser
            .assert.containsText(backend_response, msg)
            .pause(timeout);
    },

};
