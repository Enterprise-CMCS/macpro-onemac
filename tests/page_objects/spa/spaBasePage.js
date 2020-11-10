
const uploadCMD = {
    uploadFiles : function (total) {
        let fs = require('fs');
        let dir = process.cwd() + '/files/';
        let iterator = fs.readdirSync(dir);
        this.api.useCss();
        for(let i = 0; i < total; i++) { //Performs trivial loop over all upload fields
            let selector = "#uploader-input-" + i;
            let file = dir + iterator[i];
            this.api.assert.elementPresent(selector).setValue(selector, file);
        }
        return this.api;
    }
};

module.exports = {

    elements: {
        actionType: '#actionType',
        waiverAuthority: '#waiverAuthority',
        title: 'div[class=dashboard-title]',


        transmittalNumber: {
            selector: "//input[@id='transmittalNumber']",
            locateStrategy: 'xpath'
        },

        newSPA: {
            selector: "(//button[@class='ds-c-button ds-c-button--transparent'])[1]",
            locateStrategy: 'xpath'
        },

        respondSPA: {
            selector: "(//button[@class='ds-c-button ds-c-button--transparent'])[2]",
            locateStrategy: 'xpath'
        },

        newWaiver: {
            selector: "(//button[@class='ds-c-button ds-c-button--transparent'])[3]",
            locateStrategy: 'xpath'
        },

        respondWaiver: {
            selector: "(//button[@class='ds-c-button ds-c-button--transparent'])[4]",
            locateStrategy: 'xpath'
        },

        requestTemp: {
            selector: "(//button[@class='ds-c-button ds-c-button--transparent'])[5]",
            locateStrategy: 'xpath'
        }
    },

    commands : [uploadCMD],

    props : {
        pauseAction: 1000
    }

};