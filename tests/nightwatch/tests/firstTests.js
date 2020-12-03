module.exports = {
  'My first test case' (browser){
      browser
        .url (`${process.env.APPLICATION_ENDPOINT}`)
        .waitForElementVisible('.usa-bar')
        .assert.containsText(".usa-bar" , "An offical website of the United States government")
        .saveScreenshot('tests_output/My_first_test_case_screenshot.png')
  }
}
