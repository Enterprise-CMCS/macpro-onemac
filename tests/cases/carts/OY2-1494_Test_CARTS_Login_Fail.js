module.exports = {
    'Test Carts Login Fail': function (browser) {
        browser
            .url('https://test.idp.idm.cms.gov/')
            .waitForElementVisible('body')
            .assert.titleContains('CMS - TEST - Sign In')
            .assert.not.titleContains('WMS')
            .assert.visible('h2[data-se=o-form-head')
            .setValue('#okta-signin-username', 'TN_SEMAQM')
            .setValue('#okta-signin-password', 'Macpro@419')
            .click('input[id=tandc]')
            .assert.visible('input[type=submit]')
            .click('input[type=submit]')
            .end();
    }
};