// Updated by: Guli 
// Date      : 03/04/2021

module.exports = {
    "@tags": ["abbrVerify", "test1", "smoke"],

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

    'Verify that there are no state abbribiation option' : function(browser) {
        browser.click('button#spaSubmitBtn');
        let state_territory = "//*[contains(text(), 'State/Territory')]";
        browser.useXpath().expect.element(state_territory).to.be.not.present;
        browser.useCss();
        
        // Enter illegal State abbribiation 
        let abbr = 'QA';
        browser.setValue('input#transmittalNumber', abbr);
        let expectedErroMsg = "The SPA ID must contain valid Territory/State Code";
        browser.verify.containsText('div#transmittalNumberErrorMsg', expectedErroMsg);
    }
}