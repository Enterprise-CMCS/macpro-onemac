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
      username: browser.globals.user,
      password: browser.globals.pass,
      spaPageTitle: "SPA and Waiver Dashboard",
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
      username: browser.globals.user,
      password: browser.globals.pass,
      spaPageTitle: "SPA and Waiver Dashboard",
    }
  ) {
    spa = browser.page.spaBasePage();
    spa.login(testData);
    spa.verify.visible("@titleBar");
    browser.verify.containsText("h1", testData.spaPageTitle);
  },
  // from Guli's PR 177
  // 1st: Logins to the test site
  "Login to Medicaid as Regular User": function (browser) {
    // Test Data
    const username = browser.globals.user;
    const password = browser.globals.pass;
    let spaPageTitle = "SPA and Waiver Dashboard";

    // Test Stesp
    browser.useXPath().click("//a[text()='Login']"); // click the login button
    browser.useCss().setValue("#okta-signin-username", username);
    browser.setValue("#okta-signin-password", password);
    browser.click("#tandc");
    browser.click("#okta-signin-submit");
    browser.waitForElementPresent("body");

    // Test Assertion
    browser.verify.containsText("h1", spaPageTitle);
  },

  "Logout of SPA and Waiver Dashboard": function (browser) {
    let title = "SPA and Waiver Dashboard";
    spa.logout();
    spa.verify.not.containsText("h1", title);
    browser.pause(timeout);
  },

  // from Guli's PR 177
  "Verify logout from SPA and Wavier Dashboard as Regular User": function (
    browser
  ) {
    // elements
    let logout_banner_text =
      "CMS State Plan Amendment and Waiver Submission Platform";

    // logout from SPA and Wavier Dashboard page
    browser.click("button#myAccountLink");
    browser.click("a#logoutLink");
    browser.waitForElementPresent("h1").pause(1000);

    // Verify the successful logout
    browser.verify.containsText("h1", logout_banner_text);
  },
};
