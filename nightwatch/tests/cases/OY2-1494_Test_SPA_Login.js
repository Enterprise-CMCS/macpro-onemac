
let spa;
const timeout = 1000;
module.exports = {

    before : function(browser) {
        console.log('Setting up...');
        console.log('url is: ', browser.launch_url);
        spa = browser.page.spaBasePage();
        browser.maximizeWindow()
            .url(browser.launch_url)
            .waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {
        spa = browser.page.spaBasePage();
        console.log('Login as: ', testData.username);
        spa.devLogin(testData);
        spa.verify.visible('@loginTitle');
        browser.verify.elementPresent('h1');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Login to SPA and Waiver Dashboard via Okta' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {
        spa = browser.page.spaBasePage();
        spa.login(testData);
        spa.verify.visible('@loginTitle');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        spa.logout();
        spa.verify.not.containsText('h1', title);
        browser.pause(timeout);
    },
<<<<<<< HEAD
};
=======
       
    'Verify logout from SPA and Wavier Dashboard as Regular User': function (browser) {
        // elements 
        let logout_banner_text = "CMS State Plan Amendment and Waiver Submission Platform";

        // logout from SPA and Wavier Dashboard page
        browser.click('button#myAccountLink');
        browser.click('a#logoutLink');
        browser.waitForElementPresent('h1').pause(1000);

        // Verify the successful logout 
        browser.verify.containsText('h1', logout_banner_text);
    }
};
>>>>>>> parent of ead3825 (Merge branch 'develop' into oy2-5226-nightwatch-new)
