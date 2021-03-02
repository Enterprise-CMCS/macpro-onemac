const fs = require('fs');
const path = require('path');
let spaVar;
const commands = {

    // SS-YY-NNNN-xxxx or SS-YY-NNNN
    getTransmitNumber: function (optional = true, state = "VA") {
        let rand = () => this.props.getRandomNumber(0, 10000);
        let group = [state, this.props.getRandomNumber(), rand()];
        if (optional) {
            group.push(rand());
        }
        let id = group.join("-");
        spaVar = path.join(__dirname, "spa.txt");
        fs.writeFileSync(spaVar, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    // 1915(b) ID based on waiverAction
    // new - SS.#### or SS.#####
    // amendment - SS.####.R##.M## or SS.#####.R##.M## 
    // renewal - SS.####.R## or SS.#####.R## 
    getWaiverNumber: function (waiverAction = 'new') {
        let rand = (min,max) => this.props.getRandomNumber(min,max);
        let group = ['ND', rand(1000,100000)];
        if (waiverAction === 'amendment' && waiverAction=== 'renewal')
            group.push(`R${rand()}`);
        if (waiverAction === 'amendment')
            group.push(`M${rand()}`);
        let id = group.join(".");
        spaVar = path.join(__dirname, "waiver.txt");
        fs.writeFileSync(spaVar, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    getID: function (spa = true) {
        spaVar = (spa) ? path.join(__dirname, 'spa.txt') : path.join(__dirname, 'waiver.txt');
        return fs.readFileSync(spaVar, 'utf8');
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

    uploadDocs: function (type = '.pdf',requiredOnly= true, uploadValidation) {
        const dir = path.join(__dirname, 'files');
        const testFile = fs.readdirSync(dir).find(file => {
            const regEx = `^.*(${type})$`
            return file.match(new RegExp(regEx));
        });
        const eachElement = (result) => {
            let selector = `[id=${result.value}]`;
            let filePath = path.resolve(dir, testFile);
            this.api.setValue(selector, filePath);
            uploadValidation(selector, testFile);
        }

        const uploadElement = (webElementID) => this.api.elementIdAttribute(webElementID, 'id', eachElement);

        this.api.elements('css selector', this.elements.uploadFields, function (result) {
            let elements = Array.from(result.value);
            if (requiredOnly) {
                elements = elements.slice(0, 2);
            }

            elements.forEach(obj => {
                let webElementId = obj["ELEMENT"];
                uploadElement(webElementId);
            });
        });

    },
}

module.exports = {
    elements: {
        alert_banner: "[id*=alert_]",
        alert_text: "p[class=ds-c-alert__text]",
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
        uploadFields: '[id*=uploader-input]'
    },

    commands : [commands],

    props : {
        pauseAction: 1000,
        getRandomNumber(inclusive = 0, exclusive= 100) {
            let min = Math.ceil(inclusive), max = Math.floor(exclusive);
            let randomNum = Math.floor(Math.random() * (max - min) + min);
            let randNumStr = randomNum.toString(), size = max.toString().length;
            while (randNumStr.length < size - 1) {
                randNumStr = "0".concat(randNumStr);
            }
            return randNumStr;
        }
    }
};

