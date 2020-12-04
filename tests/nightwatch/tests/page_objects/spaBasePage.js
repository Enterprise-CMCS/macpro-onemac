
const commands = {
    login: function () {
        this.api.setValue(this.elements.userField, this.props.username).pause(100);
        this.api.setValue(this.elements.passField, this.props.password).pause(100);
        this.click(this.elements.submitBtn).waitForElementNotPresent(this.elements.submitBtn);
    },

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

    getTransmitNumber: function () {
        return this.props.transmitNumber;
    },

    getWaiverNumber: function () {
        return this.props.waiverNumber;
    }
}

module.exports = {

    elements: {
        actionType: '#actionType',
        waiverAuthority: '#waiverAuthority',
        title: 'div[class=dashboard-title]',

        transmittal: "input[id='transmittalNumber']",
        url: `${process.env.APPLICATION_ENDPOINT}`,
        userField : '#email',
        loginButton : 'button:nth-child(2)',
        loginTitle : 'div[class=page-title-bar]',
        submitBtn : 'button[type=submit]',

        logout : {
            selector: '(//button)[1]',
            locateStrategy: 'xpath'
        },

        passField : '#password',

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
        username : 'user1@cms.hhs.local',
        password : 'Passw0rd!',
        pauseAction: 1000,
        transmitNumber: 'VA-20-1234',
        waiverNumber: 'VA.12.R34.M56'
    }
};
