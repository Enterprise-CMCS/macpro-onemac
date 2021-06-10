let spa;
const timeout = 1000;
module.exports = {
  before: function (browser) {
    console.log("Setting up...");
    console.log("url is: ", browser.launch_url);
    spa = browser.page.spaBasePage();
    browser
      .maximizeWindow()
      .url(browser.launch_url)
      .waitForElementPresent("body");
  },

  after: function (browser) {
    console.log("Closing down...");
    browser.end();
  },

  "Login to SPA and Waiver Dashboard": function (
    browser,
    testData = {
      username: browser.globals.devuser,
      password: browser.globals.devpass,
      spaPageTitle: "Submission List",
    }
  ) {
    spa = browser.page.spaBasePage();
    console.log("Login as: ", testData.username);
    spa.devLogin(testData);
    spa.verify.visible("@titleBar");
    browser.verify.elementPresent("h1");
    browser.verify.containsText("h1", testData.spaPageTitle);
  },

  "Login to SPA and Waiver Dashboard via Okta": function (
    browser,
    testData = {
      // username: browser.globals.user,
      // password: browser.globals.pass,
      // spaPageTitle: "Submission List",
      username: process.env.TEST_STATE_USERS,
      password: process.env.TEST_STATE_USER_PASSWORD,
      spaPageTitle: "SPA and Waiver Dashboard",
    }
  ) {
    spa = browser.page.spaBasePage();
    spa.login(testData);
    // spa.verify.visible("@titleBar");
    // browser.verify.containsText("h1", testData.spaPageTitle);
    browser.useCss();
  },


  //Use development login in dev environment 6/8/2021
  "Login to SPA and Waiver Dashboard via development login": function (
    browser,
    testData = {
      username: process.env.TEST_STATE_USERS,
      password: process.env.TEST_STATE_USER_PASSWORD,
      spaPageTitle: "SPA and Waiver Dashboard",
    }
  ) {
    spa = browser.page.spaBasePage();
    spa.devLogin(testData);
    browser.useCss();
  },

  // from Guli's PR 177
  // 1st: Logins to the test site
  "Login to Medicaid as Regular User": function (browser) {
    // Test Data
    const username = browser.globals.user;
    const password = browser.globals.pass;
    let spaPageTitle = "Submission List";

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

  "Logout of SPA and Waiver Dashboard": function (browser) {
    spa.logout();
    browser.pause(timeout*3);
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
    browser.waitForElementPresent(".home-header-text").pause(1000);

    // Verify the successful logout
    browser.verify.containsText(".home-header-text", logout_banner_text);

  },
};
