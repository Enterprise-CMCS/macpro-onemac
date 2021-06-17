const new_spa = require('./OY2-5835_Submit_New_CHIP_SPA');
let spa;
const timeout = 1000;
module.exports = {

    before : function(browser) {
        new_spa.before(browser);
     },

    beforeEach: function (browser) {
        spa = browser.page.spaBasePage();
    },

    after : function(browser) {
        new_spa.after(browser);
    },

    "Click on 'Respond to CHIP SPA RAI'": function (browser) {
        let link = '[id=chipSpaRaiBtn]'
        let subDir = "/chipsparai";
        browser.assert.elementPresent(link);
        browser.click(link);
        browser.expect.url().to.contain(subDir).before(timeout * 5);
    },

    "Enter SPA ID" : function (browser) {
        new_spa['Enter SPA ID'](browser);
    },

    "Upload Documents" : function (browser) {
        new_spa['Upload Documents'](browser);
    },

    "Enter Comments" : function(browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Response" : function (browser) {
        new_spa["Submit SPA"](browser);
    },
};
