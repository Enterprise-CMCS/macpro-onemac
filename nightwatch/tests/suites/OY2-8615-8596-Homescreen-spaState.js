const login = require('../suites/OY2_9999_Login');
const timeout = 1000;

module.exports = {

    "@tags": ["FAQ", "smoke", "regression-soon"],

    
    after: function (browser) {
        login.afterEach(browser);
    },

    "Check for the new text on Login screen without login to the application": function(browser){
        const tests_data={
            create:{

                selector: "//*[@id='root']/div/div[3]/div/div[1]/div/div[1]",
            },
            submit:{
                selector: "//*[@id='root']/div/div[3]/div/div[2]/div",
            },
            
        
    };
    browser.maximizeWindow();
    browser.url(browser.launch_url);
    browser.waitForElementPresent("body");

    browser.useXpath().verify.containsText(tests_data.create.selector, "How to create a submission");
    browser.useXpath().verify.containsText(tests_data.submit.selector, "You can submit paper-based submissions, including:");
    browser.useCss();
    login.beforeEach(browser);
    login['Login with state submitter user'](browser);
    
},


"Navigate to the Manage Account page": function (
    browser,
    testData = {
      myAccountLink: "@myAccountLink",
      manageAccountLink: "@manageAccountLink",
      subUrl: "/profile",
      pageTitle: "My Profile"
      
      
    }
  ) {
    pageObjects = browser.page.spaBasePage();

    pageObjects.click(testData.myAccountLink).waitForElementPresent(testData.manageAccountLink);
    pageObjects.click(testData.manageAccountLink).waitForElementPresent("body");
    browser.assert.urlContains(testData.subUrl);
    browser.verify.containsText('h1', testData.pageTitle);
    browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[2]/dl/div/div[2]/dt", "Maryland");
    browser.useCss();
    browser.click("xpath", "//*[@id='dashboardLink']").waitForElementPresent("body");

  },
  'Verify that there are no state abbribiation option': function (browser) {
    browser.useCss().click("#new-submission-button");
    browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(1) > a > div > h4");
    browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(1) > a > div > h4");
    browser.click("[value='Submit']");
    let state_territory = "//*[contains(text(), 'State/Territory')]";
    browser.useXpath().expect.element(state_territory).to.be.not.present;
    browser.useCss();

    // Enter illegal State abbribiation 
    let abbr = 'TX';
    browser.setValue('input#transmittalNumber', abbr);
    let expectedErroMsg = "You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.";
    browser.verify.containsText('div#transmittalNumberStatusMsg', expectedErroMsg);
    browser.clearValue('input#transmittalNumber');
},

    'Verify user can submit new SPA': function (browser) {
    //browser.useXpath().click("//button[text()='Submit New Medicaid SPA']");
    // create random SPA ID
    let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
    let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
    let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
    // SS-YY-NNNN
    spaID = 'MD-' + num1 + '-' + num2 + '' + num3;
    // input the SPA ID number 
    browser.useCss().setValue("input#transmittalNumber", spaID);
    browser.pause(timeout * 5);      
    let fileUploadElem = "[name='uploader-input-0']";
        // Verify upload PDF file 
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.setValue(fileUploadElem, filePath);
        
    // upload the second documents
    
        fileUploadElem = "[name='uploader-input-1']";
        browser.useCss().setValue(fileUploadElem, filePath);
        

    // write the Summary 
    let phrase = "This is a test, test, test";
    browser.setValue('textarea', phrase);

    // Submit the new SPA 
    browser.click("[value='Submit']").pause(4000);
    browser.refresh();
    browser.pause(5000);
    browser.refresh();

    // Verify the SPA on Submission List 
    browser.useXpath().verify.containsText("//*[@id='transmittalNumber-0']/a", spaID).pause(4000);
    browser.useCss();
    return spaID;
},

}
