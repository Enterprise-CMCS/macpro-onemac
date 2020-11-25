
const commands = {
    uploadFiles: function (total) {
        let fs = require('fs');
        let dir = process.cwd() + '/files/';
        let files = fs.readdirSync(dir);

        for (let i = 0; i < total; i++) {
            let selector = 'input[id="uploader-input-' + i + '"]';
            this.api.assert.elementPresent(selector);
            let file = require('path').resolve(dir, files[i]);
            this.api.setValue(selector, file);

        }

        return this.api;
    },

    transmitNumber: function () {
        return 'VA-20-1234'
    },

    waiverNumber: function () {
        return 'VA.12.R34.M56'
    }
}

module.exports = {

    elements: {
        actionType: '#actionType',
        waiverAuthority: '#waiverAuthority',
        title: 'div[class=dashboard-title]',

        transmittal: "input[id='transmittalNumber']",

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
        },

        territory : "select[id=territory]"
    },

    commands : [commands],

    props : {
        pauseAction: 1000,

    }

};