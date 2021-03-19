const fs = require('fs');
const path = require('path');
const commands = {

    // SS-YY-NNNN-xxxx or SS-YY-NNNN
    getTransmitNumber: function (optional = true, state = "VA") {
        let rand = (min = 0, max = 10000) => this.props.getRandomNumber(min, max);
        let group = [state, rand(0, 100), rand()];
        if (optional) {
            group.push(rand());
        }
        let id = group.join("-");
        const spaFile = path.join(__dirname, "spa.txt");
        fs.writeFileSync(spaFile, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    // 1915(b) ID based on waiverAction
    // new - SS.#### or SS.#####
    // amendment - SS.####.R##.M## or SS.#####.R##.M##
    // renewal - SS.####.R## or SS.#####.R##
    getWaiverNumber: function (waiverAction = 'new',state = 'VA', option = false) {
        let rand = (min = 0, max = 100000) => this.props.getRandomNumber(min, max);
        let group = (waiverAction === 'new' && option === true) ? [state, rand()] : [state, rand(0, 10000)];

        if(waiverAction === 'renewal' || waiverAction === 'amendment') {
            group.push(`R${rand(0, 100)}`);
        }
        if (waiverAction === 'amendment') {
            group.push(`M${rand(0, 100)}`);
        }

        let id = group.join(".");
        const waiverFile = path.join(__dirname, "waiver.txt");
        fs.writeFileSync(waiverFile, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    getID: function (file = 'spa.txt') {
        return fs.readFileSync(path.join(__dirname, file),'utf8');
    },

    enterComments: function (selector, text) {
        this.api.setValue('css selector', selector, text);
    },

    onDashBoard: function (loginBtn = this.elements.loginBtn) {
        this.api.click(loginBtn).waitForElementPresent('body');
        this.api.pause(3000);
    },


    login: function (testData) {
        this.onDashBoard();
        this.api.setValue(this.elements.userField, testData.username).pause(100);
        this.api.setValue(this.elements.passField, testData.password).pause(100);
        this.api.click(this.elements.tandc).pause(100);
        this.api.click(this.elements.submitBtn).waitForElementNotPresent(this.elements.submitBtn);

    },

    devLogin: function (testData) {
        this.onDashBoard(this.elements.devLoginButton);
        this.api.setValue(this.elements.devUserField, testData.username).pause(100);
        this.api.setValue(this.elements.devPassField, testData.password).pause(100);
        this.api.click(this.elements.devSubmitBtn).waitForElementNotPresent(this.elements.devSubmitBtn);
    },

    logout: function () {
        this.api.click(this.elements.myAccountLink).pause(100);
        this.api.click(this.elements.logout);
    },

    uploadDocs: function (type = '.pdf',required = 0, validateUpload) {
        const dir = path.join(__dirname, 'files');
        const testFile = fs.readdirSync(dir).find(file => {
            const regEx = `^.*(${type})$`;
            return file.match(new RegExp(regEx));
        });

        const setValueTo = (selector, filePath) => this.api.setValue(selector, filePath);
        const uploadElement = (webElementID) => this.api.elementIdAttribute(webElementID, 'id', function (result) {
            let selector = `[id=${result.value}]`, filePath = path.resolve(dir, testFile);
            setValueTo(selector, filePath);
            validateUpload(selector, testFile);
        });

        let eachElement = function (result) {
            let elements = Array.from(result.value);

            elements.forEach((obj, index) => {
                if(index < required && index < elements.length) {
                    let webElementId = obj["ELEMENT"];
                    uploadElement(webElementId);
                }
            });
        }

        this.api.elements('css selector', this.elements.uploadFields, eachElement);

    },

    /*
    uploadFiles: function (total) {
        const fs = require('fs');
        const path = require('path');
        let dir = path.join(__dirname, 'files');
        let files = fs.readdirSync(dir, 'utf8');

        for (let i = 0; i < total; i++) {
            let selector = 'input[id="uploader-input-' + i + '"]';
            this.api.assert.elementPresent(selector);
            let file = require('path').resolve(dir, files[i]);
            this.api.setValue(selector, file);
        }
        return this.api;
    }
    */
}

module.exports = {
    elements: {
        alert_banner: "[id*=alert_]",
        alert_text: "p[class=ds-c-alert__text]",
        actionType: '#actionType',
        waiverAuthority: '[id=waiverAuthority]',
        devLoginButton : '[id=devloginBtn]',
        devPassField : '[id=password]',
        devSubmitBtn : 'input[type=submit]',
        devUserField : '[id=email]',
        userField : '[id=okta-signin-username]',
        loginBtn: 'div.nav-right > button',
        loginTitle : 'div[id=title_bar]',
        myAccountLink : '[id=myAccountLink]',
        manageAccountLink: "[id=manageAccountLink]",
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
        uploadFields: '[id*=uploader-input]'
    },

    commands : [commands],

    props : {
        pauseAction: 1000,
        getRandomNumber(inclusive, exclusive) {
            let range = { min: Math.ceil(inclusive), max: Math.floor(exclusive) };
            let randomNum = Math.floor(Math.random() * (range.max - range.min) + range.min).toString();
            let size = range.max.toString().length;
            while (randomNum.length < size - 1) {
                randomNum = "0".concat(randomNum);
            }
            return randomNum;
        },
    }
};

