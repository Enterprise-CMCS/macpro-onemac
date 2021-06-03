let spa;
const timeout = 1000;
module.exports = {
  beforeEach: function (browser) {
    console.log("Setting up...");
    console.log("url is: ", browser.launch_url);
    browser.maximizeWindow();
    browser.url(browser.launch_url);
    browser.waitForElementPresent("body");
  },

  afterEach: function (browser) {
    console.log("Closing down...");
    spa = browser.page.spaBasePage();
    spa.click("@myAccountLink").pause(timeout/2);
    spa.click("@logout").pause(timeout/2);

    browser.end();
  },

  "Login to SPA and Waiver Dashboard": function (
    browser,
    testData = {
      username: browser.globals.devuser,
      password: browser.globals.devpass,
      spaPageTitle: "SPA and Waiver Dashboard",
    }
  ) {
      spa = browser.page.spaBasePage();
    //click on button
    spa.devLogin(testData);
    spa.verify.visible("@titleBar");
    browser.verify.elementPresent("h1");
    browser.verify.containsText("h1", testData.spaPageTitle);
  },

  "Login to SPA and Waiver Dashboard via Okta": function (
    browser,
    testData = {
      username: browser.globals.user.name,
      password: browser.globals.user.pass,
      
      spaPageTitle: "SPA and Waiver Dashboard",
    }
  ) {
    spa = browser.page.spaBasePage();
    spa.login(testData);
    //spa.verify.visible("@titleBar");
    //browser.useXpath().verify.containsText("//h1", testData.spaPageTitle);
    browser.useCss();
  },
  // from Guli's PR 177
  // 1st: Logins to the test site
  "Login to Medicaid as Regular User": function (browser) {
    this["Login to SPA and Waiver Dashboard via Okta"](browser,{
      username:browser.globals.user,password:browser.globals.pass})
    // Test Assertion
    browser.verify.containsText("h1", spaPageTitle);
  },

  // login as state user for val environment
  "Login to Medicaid as State User in val environment": function (browser) {
    this["Login to SPA and Waiver Dashboard via Okta"](browser,{
      username:browser.globals.state_user,password:browser.globals.state_pass})
    // Test Stesp
    browser.useXpath().click("//a[text()='Login']"); // click the login button
    browser.useCss().setValue("#okta-signin-username", username);
    browser.setValue("#okta-signin-password", password);
    browser.click("#tandc");
    browser.click("#okta-signin-submit");
    browser.waitForElementPresent("body");

    // Test Assertion
    browser.verify.containsText("h1", spaPageTitle);
  },

  // login as state admin user for val environment
  "Login to Medicaid as State Admin User in val environment": function (browser) {
    // Test Data
    const username = browser.globals.state_admin_user;
    const password = browser.globals.state_admin_user_pass;
    let spaPageTitle = "SPA and Waiver Dashboard";

    // Test Stesp
    browser.useXpath().click("//a[text()='Login']"); // click the login button
    browser.useCss().setValue("#okta-signin-username", username);
    browser.setValue("#okta-signin-password", password);
    browser.click("#tandc");
    browser.click("#okta-signin-submit");
    browser.waitForElementPresent("body");

    // Test Assertion
    browser.verify.containsText("h1", spaPageTitle);
  },

  // login as cms approver user for val environment
  "Login to Medicaid as CMS Approver User in val environment": function (browser) {
    // Test Data
    const username = browser.globals.cms_approver_user;
    const password = browser.globals.cms_approver_pass;
    let spaPageTitle = "SPA and Waiver Dashboard";

    // Test Stesp
    browser.useXpath().click("//a[text()='Login']"); // click the login button
    browser.useCss().setValue("#okta-signin-username", username);
    browser.setValue("#okta-signin-password", password);
    browser.click("#tandc");
    browser.click("#okta-signin-submit");
    browser.waitForElementPresent("body");

    // Test Assertion
    browser.verify.containsText("h1", spaPageTitle);
  },

 /* "Logout of SPA and Waiver Dashboard": function (browser) {
    let title = "SPA and Waiver Dashboard";
    spa.logout();
    browser.pause(timeout * 3);
    spa.verify.visible("@homeHeader");
    browser.pause(timeout);
  },

  // from Guli's PR 177

  "Verify logout from SPA and Wavier Dashboard as Regular User": function (browser) {
    // elements
    let logout_banner_text = "paper-based state plan amendments (SPAs) and section 1915 waivers.";

    // logout from SPA and Wavier Dashboard page
    browser.click("button#myAccountLink");
    browser.click("a#logoutLink");
   // browser.waitForElementPresent(".home-header-text").pause(1000);

    // Verify the successful logout
    //browser.verify.containsText(".home-header-text", logout_banner_text);
  },*/
};
