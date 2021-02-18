
module.exports = {
    "@tags": ["attachementTest", "test1"],

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

    'Verify that State User can see the optional attachments on SPA form page': function(browser) {
        // Go to [Submit new SPA] page 
        browser.click('button#spaSubmitBtn');
        
        // Verify for the optional attachment visiblity
        let counts = 1;
           locator1 = "(//td/div)";
           browser.elements('xpath', locator1, function (elements) {
               elements.value.forEach(function(element){
                   let xpaths = locator1.concat('[' + counts + ']');
                   browser.useXpath().expect.element(xpaths).to.be.visible;
                   counts++;
               })
               browser.useCss();
           });
           browser.back();  // go back to previous page
    }, 

    'Verify that State User can see the optional attachments on Respond to SPA RAI page': function(browser) {
        // Go to [Respond to SPA RAI] page 
        browser.click('button#spaRaiBtn');
        
        // Verify for the optional attachment visiblity
        let counts = 1;
           locator1 = "(//td/div)";
           browser.elements('xpath', locator1, function (elements) {
               elements.value.forEach(function(element){
                   let xpaths = locator1.concat('[' + counts + ']');
                   browser.useXpath().expect.element(xpaths).to.be.visible;
                   counts++;
               })
               browser.useCss();
           });
           browser.back();  // go back to previous page
    }, 


    'Verify that State User can see the optional attachments on Submit new Waiver page': function(browser) {
        // Go to [Submit new Waiver] page 
        browser.click('button#waiverBtn');
        
        // Verify for the optional attachment visiblity
        let counts = 1;
           locator1 = "(//td/div)";
           browser.elements('xpath', locator1, function (elements) {
               elements.value.forEach(function(element){
                   let xpaths = locator1.concat('[' + counts + ']');
                   browser.useXpath().expect.element(xpaths).to.be.visible;
                   counts++;
               })
               browser.useCss();
           });
           browser.back();  // go back to previous page
    }, 

    'Verify that State User can see the optional attachments on Respond to 1915(c) Waiver RAI page': function(browser) {
        // Go to [Respond to 1915(c) Waiver RAI] page 
        browser.click('button#waiverRaiBtn');
        
        // Verify for the optional attachment visiblity
        let counts = 1;
           locator1 = "(//td/div)";
           browser.elements('xpath', locator1, function (elements) {
               elements.value.forEach(function(element){
                   let xpaths = locator1.concat('[' + counts + ']');
                   browser.useXpath().expect.element(xpaths).to.be.visible;
                   counts++;
               })
               browser.useCss();
           });
           browser.back();  // go back to previous page
    }, 

    'Verify that State User can see the optional attachments on Request Temporary Extension form page': function(browser) {
        // Go to [Respond to 1915(c) Waiver RAI] page 
        browser.click('button#waiverExtBtn');
        
        // Verify for the optional attachment visiblity
        let counts = 1;
           locator1 = "(//td/div)";
           browser.elements('xpath', locator1, function (elements) {
               elements.value.forEach(function(element){
                   let xpaths = locator1.concat('[' + counts + ']');
                   browser.useXpath().expect.element(xpaths).to.be.visible;
                   counts++;
               })
               browser.useCss();
           });
           browser.back();  // go back to previous page
    }
}