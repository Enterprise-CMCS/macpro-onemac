const fs = require('fs');
const path = require('path');
const spaID = path.join(__dirname, "spa.txt");
const waiverID = path.join(__dirname, "waiver.txt");

const commands = {

    // SS-YY-NNNN-xxxx
    getTransmitNumber: function (state = "VA", optionNumber = false, year = this.props.getYear()) {
        let rand = () => this.props.getRandomInt(1000, 10000).toString();
        let group = (optionNumber)
            ? [state, year, rand(), rand()]
            : [state, year, rand()], id = group.join("-");
        fs.writeFileSync(spaID, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    // 1915(b) SS.##.R##.M##
    // 1915(c) SS.##.R##.##
    getWaiverNumber: function (isWaiverB = true, state = "VA",
                               year = this.props.getYear()) {
        let rand = () => this.props.getRandomInt().toString();
        let group = (isWaiverB)
            ? [state, year, "R".concat(rand()), "M".concat(rand())]
            : [state, year, "R".concat(rand()), rand()];
        let id = group.join(".");
        fs.writeFileSync(waiverID, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    getSpaID: function () {
        return fs.readFileSync(spaID, 'utf8');
    },

    getWaiverID: function() {
        return fs.readFileSync(waiverID, 'utf8');
    },

    enterComments: function (selector, text) {
        this.api.setValue('css selector', selector, text);
    },

    onDashBoard: function (loginBtn = this.elements.loginBtn) {
        this.api.click(loginBtn).waitForElementPresent('body');
        this.api.pause(3000);
    },

    login: function (user, pass) {
        this.onDashBoard();
        this.api.setValue(this.elements.userField, user).pause(100);
        this.api.setValue(this.elements.passField, pass).pause(100);
        this.api.click(this.elements.tandc).pause(100);
        this.api.click(this.elements.submitBtn).waitForElementNotPresent(this.elements.submitBtn);
    },

    devLogin: function (user, pass) {
        this.onDashBoard(this.elements.devLoginButton);
        this.api.setValue(this.elements.devUserField, user).pause(100);
        this.api.setValue(this.elements.devPassField, pass).pause(100);
        this.api.click(this.elements.devSubmitBtn).waitForElementNotPresent(this.elements.devSubmitBtn);
    },

    logout: function () {
        this.api.click(this.elements.myAccountLink).pause(100);
        this.api.click(this.elements.logout);
    },

    uploadFiles: function (validate, fileType= 'pdf') {
        let dir = path.join(__dirname, 'files');
        let selectFile = fs.readdirSync(dir, 'utf8')
            .map(file => path.resolve(dir, file))
            .find(file => file.match(new RegExp(`^.*${fileType}$`)));
        let browser = this.api;

        let allElementIds = function (result) {
            Array.from(result.value).forEach(function (obj) {
                let webElementId = obj["ELEMENT"];
                browser.elementIdAttribute(webElementId, 'id', function (result) {
                    let selector = `[id=${result.value}]`;
                    browser.setValue(selector, selectFile);
                    validate(selector, path.basename(selectFile));
                });
            });
        };

        browser.elements('css selector', this.elements.uploads, allElementIds);
    }
}

module.exports = {
    elements: {
        alertText: "[id*=alert_]",
        confirmText: "p[class=ds-c-alert__text]",
        actionType: '#actionType',
        waiverAuthority: '#waiverAuthority',
        devLoginButton : '[id=devloginBtn]',
        devPassField : '[id=password]',
        devSubmitBtn : 'input[type=submit]',
        devUserField : '[id=email]',
        userField : '[id=okta-signin-username]',
        loginBtn: 'div.nav-right > button',
        loginTitle : 'div[id=title_bar]',
        myAccountLink : '[id=myAccountLink]',
        logout : '[id=logoutLink]',
        passField : '[id=okta-signin-password]',
        newSPA: "[id=spaSubmitBtn]",
        respondSPA: "[id=spaRaiBtn]",
        newWaiver: "[id=waiverBtn]",
        respondWaiver: "[id=waiverRaiBtn]",
        requestTemp: "[id=waiverExtBtn]",
        submitBtn: "[id=okta-signin-submit]",
        tandc: "[id=tandc]",
        territory : "#territory",
        transmittal: '[id=transmittalNumber]',
        uploads: 'input[id*="uploader-input"]',
    },
    commands : [commands],

    props : {

        pauseAction: 1000,

        //The maximum is exclusive and the minimum is inclusive
        getRandomInt: function (inclusiveMin = 10, exclusiveMax= 100) {
            let min = Math.ceil(inclusiveMin), max = Math.floor(exclusiveMax);
            return Math.floor(Math.random() * (max - min) + min);
        },

        getYear: function () {
            return new Date().getFullYear().toString().slice(2);
        },

    }
};
